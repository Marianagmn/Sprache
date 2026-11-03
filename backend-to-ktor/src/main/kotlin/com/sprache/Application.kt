package com.sprache

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.application.install
import io.ktor.server.plugins.BadRequestException
import io.ktor.server.plugins.ContentTransformationException
import io.ktor.server.plugins.NotFoundException
import io.ktor.server.plugins.statuspages.StatusPages
import io.ktor.server.plugins.statuspages.exception
import io.ktor.server.request.header
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import io.ktor.server.routing.route
import io.ktor.server.routing.routing
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.plugins.cors.routing.CORS
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.mindrot.jbcrypt.BCrypt
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.util.Date
import java.util.Locale

val apiJson = Json {
    ignoreUnknownKeys = true
    explicitNulls = false
}

private fun longestStreak(sessions: List<JsonObject>, zone: ZoneId): Int {
    val dates = sessions.mapNotNull { session ->
        runCatching { Instant.parse(session.string("completedAt")).atZone(zone).toLocalDate() }.getOrNull()
    }.distinct().sorted()
    var longest = 0
    var streak = 0
    var previous: LocalDate? = null
    dates.forEach { date ->
        streak = if (previous?.plusDays(1)?.isEqual(date) == true) streak + 1 else 1
        longest = maxOf(longest, streak)
        previous = date
    }
    return longest
}

class ApiException(val statusCode: HttpStatusCode, val code: String, override val message: String) :
    RuntimeException(message)

fun Application.module() {
    val database = UserDatabase(
        System.getProperty("SPRACHE_DB_URL") ?: System.getenv("SPRACHE_DB_URL")
        ?: "jdbc:h2:file:./data/sprache;DB_CLOSE_ON_EXIT=FALSE",
        System.getProperty("SPRACHE_DB_USER") ?: System.getenv("SPRACHE_DB_USER") ?: "sa",
        System.getProperty("SPRACHE_DB_PASSWORD") ?: System.getenv("SPRACHE_DB_PASSWORD") ?: "",
    )
    database.initialize()
    val applicationLog = environment.log

    val configuredSecret = System.getProperty("JWT_SECRET") ?: System.getenv("JWT_SECRET")
    val isProduction = (System.getenv("KTOR_ENV") ?: "development").equals("production", ignoreCase = true)
    if (isProduction && configuredSecret.isNullOrBlank()) {
        throw IllegalStateException("JWT_SECRET must be configured when KTOR_ENV=production.")
    }
    val secret = configuredSecret ?: "development-only-change-this-secret-before-deploying"
    val algorithm = Algorithm.HMAC256(secret)
    val issuer = System.getProperty("JWT_ISSUER") ?: System.getenv("JWT_ISSUER") ?: "sprache-api"
    val tokenLifetimeSeconds = System.getenv("JWT_TTL_SECONDS")?.toLongOrNull() ?: 86_400L

    install(ContentNegotiation) {
        json(apiJson)
    }
    install(CORS) {
        val configuredOrigins = System.getenv("CORS_ORIGINS")
            ?.split(',')
            ?.map(String::trim)
            ?.filter(String::isNotEmpty)
            .orEmpty()
        if (configuredOrigins.isNotEmpty()) {
            configuredOrigins.forEach { allowHost(it, schemes = listOf("http", "https")) }
        }
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Accept)
        allowMethod(io.ktor.http.HttpMethod.Get)
        allowMethod(io.ktor.http.HttpMethod.Post)
        allowMethod(io.ktor.http.HttpMethod.Put)
        allowMethod(io.ktor.http.HttpMethod.Options)
    }
    install(StatusPages) {
        exception<ApiException> { call, cause ->
            call.respond(cause.statusCode, errorBody(cause.code, cause.message))
        }
        exception<ContentTransformationException> { call, _ ->
            call.respond(HttpStatusCode.BadRequest, errorBody("BAD_REQUEST", "El cuerpo JSON no es válido."))
        }
        exception<BadRequestException> { call, cause ->
            call.respond(HttpStatusCode.BadRequest, errorBody("BAD_REQUEST", cause.message ?: "Solicitud no válida."))
        }
        exception<NotFoundException> { call, cause ->
            call.respond(HttpStatusCode.NotFound, errorBody("NOT_FOUND", cause.message ?: "Recurso no encontrado."))
        }
        exception<Throwable> { call, cause ->
            applicationLog.error("Unhandled API error", cause)
            call.respond(HttpStatusCode.InternalServerError, errorBody("INTERNAL_ERROR", "Ocurrió un error interno."))
        }
    }

    val content = ContentCatalog()
    routing {
        route("/api") {
            get("/health") {
                call.respond(buildJsonObject { put("status", JsonPrimitive("ok")) })
            }
            authRoutes(database, algorithm, issuer, tokenLifetimeSeconds)
            catalogRoutes(content)
            lessonRoutes(database, content)
            progressRoutes(database)
            achievementRoutes(database)
            placementRoutes()
            mascotRoutes(database)
        }
    }
}

private fun errorBody(code: String, message: String) = buildJsonObject {
    put("error", JsonPrimitive(code))
    put("message", JsonPrimitive(message))
}

private fun Route.authRoutes(database: UserDatabase, algorithm: Algorithm, issuer: String, ttlSeconds: Long) {
    route("/auth") {
        post("/register") {
            val body = call.receive<JsonObject>()
            val name = body.string("name").trim()
            val email = body.string("email").trim().lowercase(Locale.ROOT)
            val password = body.string("password")
            val level = (body.stringOrNull("initialLevel") ?: body.stringOrNull("level") ?: "A1")
                .removePrefix("Nivel ")
            val goal = body.intOrNull("dailyGoalMinutes") ?: body.intOrNull("dailyGoal") ?: 10
            validateCredentials(name, email, password)
            if (level !in setOf("A1", "A2", "B1", "B2")) {
                throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "El nivel inicial no es válido.")
            }
            if (goal !in 1..240) {
                throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "La meta diaria debe estar entre 1 y 240 minutos.")
            }
            if (database.findByEmail(email) != null) {
                throw ApiException(HttpStatusCode.Conflict, "EMAIL_EXISTS", "Ya existe una cuenta con ese correo.")
            }
            val user = newUser(
                name,
                email,
                level,
                goal,
                body.stringOrNull("motivation"),
                body["placementAssessment"] as? JsonObject,
            )
            database.create(email, BCrypt.hashpw(password, BCrypt.gensalt(12)), user)
            call.respond(HttpStatusCode.Created, authResponse(user, issueToken(email, algorithm, issuer, ttlSeconds)))
        }
        post("/login") {
            val body = call.receive<JsonObject>()
            val email = body.string("email").trim().lowercase(Locale.ROOT)
            val password = body.string("password")
            val record = database.findByEmail(email)
                ?: throw ApiException(HttpStatusCode.Unauthorized, "UNAUTHORIZED", "Correo o contraseña incorrectos.")
            if (!BCrypt.checkpw(password, record.passwordHash)) {
                throw ApiException(HttpStatusCode.Unauthorized, "UNAUTHORIZED", "Correo o contraseña incorrectos.")
            }
            call.respond(authResponse(record.user, issueToken(email, algorithm, issuer, ttlSeconds)))
        }
        get("/me") {
            val user = call.authenticatedUser(database, algorithm, issuer)
            call.respond(buildJsonObject { put("user", user) })
        }
        put("/profile") {
            val email = call.authenticatedEmail(algorithm, issuer)
            val updates = call.receive<JsonObject>()
            val user = database.update(email) { existing ->
                val changedName = updates.stringOrNull("name")?.trim()
                if (changedName != null && changedName.isBlank()) {
                    throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "El nombre no puede estar vacío.")
                }
                val goal = updates.intOrNull("dailyGoalMinutes") ?: updates.intOrNull("dailyGoal")
                if (goal != null && goal !in 1..240) {
                    throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "La meta diaria debe estar entre 1 y 240 minutos.")
                }
                existing.withFields(buildJsonObject {
                    changedName?.let { put("name", JsonPrimitive(it)) }
                    goal?.let {
                        put("dailyGoalMinutes", JsonPrimitive(it))
                        put("dailyGoal", JsonPrimitive(it))
                    }
                    updates["avatar"]?.let { put("avatar", it) }
                    updates["preferences"]?.let { preferences ->
                        put("preferences", mergeObjects(existing["preferences"] as? JsonObject, preferences as? JsonObject))
                    }
                })
            }
            call.respond(buildJsonObject { put("user", user) })
        }
    }
}

private fun Route.catalogRoutes(content: ContentCatalog) {
    get("/activities") {
        val level = call.request.queryParameters["level"]?.uppercase()
        val activities = content.activities.filter { item ->
            level.isNullOrBlank() || level == "TODOS" || item.stringOrNull("levelCode") == level
        }
        call.respond(JsonArray(activities.map { activity ->
            val count = content.lessons.count { it.stringOrNull("activityId") == activity.stringOrNull("id") }
            activity.withFields(buildJsonObject { put("lessonCount", JsonPrimitive(count)) })
        }))
    }
    get("/readings") {
        val level = call.request.queryParameters["level"]?.uppercase()
        call.respond(JsonArray(content.readings.filter { item ->
            level.isNullOrBlank() || item.stringOrNull("level")?.uppercase() == level
        }))
    }
    get("/theory") {
        val level = call.request.queryParameters["level"]?.uppercase()
        call.respond(JsonArray(content.theory.filter { item ->
            level.isNullOrBlank() || item.stringOrNull("level")?.uppercase() == level
        }))
    }
}

private fun Route.lessonRoutes(database: UserDatabase, content: ContentCatalog) {
    route("/lessons") {
        get("/spaced-review") {
            val user = call.authenticatedUser(database)
            val dueTerms = (user["wordProgress"] as? JsonObject).orEmpty().filterValues { progress ->
                val dueAt = (progress as? JsonObject)?.stringOrNull("nextReviewAt")
                dueAt == null || runCatching { Instant.parse(dueAt).isBefore(Instant.now().plusSeconds(1)) }.getOrDefault(false)
            }.keys.take(5)
            val questions = dueTerms.mapNotNull { term ->
                content.questions.firstOrNull { question ->
                    question.stringOrNull("word").equals(term, true)
                        || question.nestedString("vocabulary", "term").equals(term, true)
                }
            }
            call.respond(reviewLesson("spaced-review", "Repaso de palabras", questions))
        }
        get("/failed-words-review") {
            val user = call.authenticatedUser(database)
            val failed = user["failedWords"] as? JsonObject ?: JsonObject(emptyMap())
            val questions = failed.values
                .mapNotNull { (it as? JsonObject)?.get("question") as? JsonObject }
                .take(10)
            call.respond(reviewLesson("failed-words-review", "Repasar palabras", questions))
        }
        get("/by-activity/{activityId}") {
            val activityId = call.parameters["activityId"]
                ?: throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "Falta activityId.")
            val lesson = content.lessons.firstOrNull { it.stringOrNull("activityId") == activityId }
                ?: throw ApiException(HttpStatusCode.NotFound, "NOT_FOUND", "No se encontró una lección para esa actividad.")
            call.respond(lesson)
        }
        post("/{id}/complete") {
            val lessonId = call.parameters["id"] ?: throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "Falta el ID de la lección.")
            val userEmail = call.authenticatedEmail()
            val body = call.receive<JsonObject>()
            val lesson = when (lessonId) {
                "spaced-review", "failed-words-review" -> {
                    val user = database.findByEmail(userEmail)?.user
                        ?: throw ApiException(HttpStatusCode.Unauthorized, "UNAUTHORIZED", "La sesión ya no es válida.")
                    val reviewQuestions = if (lessonId == "spaced-review") {
                        val dueTerms = (user["wordProgress"] as? JsonObject).orEmpty().filterValues { progress ->
                            val dueAt = (progress as? JsonObject)?.stringOrNull("nextReviewAt")
                            dueAt == null || runCatching { Instant.parse(dueAt).isBefore(Instant.now()) }.getOrDefault(false)
                        }.keys.take(5)
                        dueTerms.mapNotNull { term ->
                            content.questions.firstOrNull { question ->
                                question.stringOrNull("word").equals(term, true)
                                    || question.nestedString("vocabulary", "term").equals(term, true)
                            }
                        }
                    } else {
                        (user["failedWords"] as? JsonObject).orEmpty().values.mapNotNull {
                            ((it as? JsonObject)?.get("question") as? JsonObject)
                        }.take(10)
                    }
                    reviewLesson(
                        lessonId,
                        if (lessonId == "spaced-review") "Repaso de palabras" else "Repasar palabras",
                        reviewQuestions,
                    )
                }
                else -> content.lessons.firstOrNull { it.stringOrNull("id") == lessonId }
                    ?: throw ApiException(HttpStatusCode.NotFound, "NOT_FOUND", "No se encontró la lección.")
            }
            val questions = (lesson["questions"] as? JsonArray).orEmpty()
            val answers = (body["answers"] as? JsonArray).orEmpty()
            if (answers.size != questions.size) {
                throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "Debe enviarse una respuesta por cada pregunta.")
            }
            val hints = (body["hintsUsed"] as? JsonArray).orEmpty()
            val results = questions.mapIndexed { index, questionElement ->
                val question = questionElement as? JsonObject ?: JsonObject(emptyMap())
                val answer = (answers.getOrNull(index) as? JsonPrimitive)?.contentOrNull
                val expected = question.stringOrNull("answer")
                    ?: question.nestedString("questions", "correctAnswer")
                val correct = expected != null && answer != null &&
                    if (question.stringOrNull("type") in setOf("dictation", "fill-blanks", "write-response")) {
                        expected.trim().equals(answer.trim(), true)
                    } else expected == answer
                val usedHint = (hints.getOrNull(index) as? JsonPrimitive)?.contentOrNull == "true"
                val term = question.nestedString("vocabulary", "term") ?: question.stringOrNull("word")
                val translation = question.nestedString("vocabulary", "translation").orEmpty()
                buildJsonObject {
                    term?.let { put("term", JsonPrimitive(it)) }
                    put("translation", JsonPrimitive(translation))
                    put("correct", JsonPrimitive(correct))
                    put("hintUsed", JsonPrimitive(usedHint))
                }
            }
            val correctCount = results.count { it["correct"]?.jsonPrimitive?.contentOrNull == "true" }
            val duration = body.intOrNull("durationSeconds") ?: 0
            if (duration !in 0..86_400) {
                throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "La duración de la sesión no es válida.")
            }
            val activityId = body.stringOrNull("activityId") ?: lesson.stringOrNull("activityId") ?: lessonId
            val session = buildJsonObject {
                put("activityId", JsonPrimitive(activityId))
                put("completedAt", JsonPrimitive(Instant.now().toString()))
                put("durationSeconds", JsonPrimitive(duration))
                put("correctAnswers", JsonPrimitive(correctCount))
                put("totalQuestions", JsonPrimitive(questions.size))
                put("scorePercentage", JsonPrimitive(if (questions.isEmpty()) 0 else correctCount * 100 / questions.size))
                put("wordResults", JsonArray(results))
            }
            val updated = database.update(userEmail) { existing ->
                addCompletedSession(existing, session, lesson, results)
            }
            call.respond(buildJsonObject {
                put("session", session)
                put("updatedUser", updated)
                put("xpGained", JsonPrimitive(20 + correctCount * 10 + duration / 60))
                put("unlockedAchievements", JsonArray(emptyList()))
            })
        }
        get("/{id}") {
            val id = call.parameters["id"] ?: throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "Falta el ID de la lección.")
            val lesson = content.lessons.firstOrNull { it.stringOrNull("id") == id }
                ?: throw ApiException(HttpStatusCode.NotFound, "NOT_FOUND", "No se encontró la lección.")
            call.respond(lesson)
        }
    }
}

private fun Route.progressRoutes(database: UserDatabase) {
    route("/progress") {
        get {
            val user = call.authenticatedUser(database)
            val sessions = (user["sessions"] as? JsonArray).orEmpty().mapNotNull { it as? JsonObject }
            val now = LocalDate.now()
            val zone = ZoneId.systemDefault()
            val weekly = (0..6).map { offset ->
                val date = now.with(java.time.temporal.TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY))
                    .plusDays(offset.toLong())
                val minutes = sessions.filter { session ->
                    runCatching {
                        Instant.parse(session.string("completedAt")).atZone(zone).toLocalDate().isEqual(date)
                    }.getOrDefault(false)
                }.sumOf { it.intOrNull("durationSeconds") ?: 0 } / 60
                buildJsonObject {
                    put("date", JsonPrimitive(date.toString()))
                    put("day", JsonPrimitive(listOf("Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom")[offset]))
                    put("minutes", JsonPrimitive(minutes))
                    put("active", JsonPrimitive(minutes > 0))
                }
            }
            val studiedSeconds = sessions.sumOf { it.intOrNull("durationSeconds") ?: 0 }
            val todaySeconds = sessions.filter { session ->
                runCatching { Instant.parse(session.string("completedAt")).atZone(zone).toLocalDate().isEqual(now) }
                    .getOrDefault(false)
            }.sumOf { it.intOrNull("durationSeconds") ?: 0 }
            val goal = user.intOrNull("dailyGoalMinutes") ?: user.intOrNull("dailyGoal") ?: 10
            call.respond(buildJsonObject {
                put("streakDays", JsonPrimitive(currentStreak(sessions, now, zone)))
                put("xp", JsonPrimitive(calculateXp(sessions)))
                put("studiedMinutes", JsonPrimitive(studiedSeconds / 60))
                put("weeklyActivity", JsonArray(weekly))
                put("todayGoalReached", JsonPrimitive(todaySeconds >= goal * 60))
            })
        }
        post("/learning-module") {
            val email = call.authenticatedEmail()
            val body = call.receive<JsonObject>()
            val type = body.string("type")
            val moduleId = body.string("moduleId")
            val payload = body["payload"] as? JsonObject
                ?: throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "payload debe ser un objeto JSON.")
            if (type !in setOf("readings", "theory", "pronunciation") || moduleId.isBlank()) {
                throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "type y moduleId deben ser válidos.")
            }
            val updated = database.update(email) { user ->
                val progress = user["learningProgress"] as? JsonObject ?: emptyJsonObject()
                val section = progress[type] as? JsonObject ?: emptyJsonObject()
                val existing = section[moduleId] as? JsonObject ?: emptyJsonObject()
                val merged = mergeObjects(existing, payload)
                val nextProgress = progress.withFields(buildJsonObject { put(type, section.withFields(buildJsonObject { put(moduleId, merged) })) })
                user.withFields(buildJsonObject { put("learningProgress", nextProgress) })
            }
            call.respond(buildJsonObject {
                put("success", JsonPrimitive(true))
                put("learningProgress", updated["learningProgress"] ?: emptyJsonObject())
            })
        }
        post("/reset") {
            val email = call.authenticatedEmail()
            val updated = database.update(email) { user -> resetUserProgress(user) }
            call.respond(buildJsonObject { put("user", updated) })
        }
    }
}

private fun Route.achievementRoutes(database: UserDatabase) {
    get("/achievements") {
        val user = call.authenticatedUser(database)
        val sessions = (user["sessions"] as? JsonArray).orEmpty().mapNotNull { it as? JsonObject }
        val practicedSeconds = sessions.sumOf { (it.intOrNull("durationSeconds") ?: 0).coerceAtLeast(0) }
        val uniqueWords = sessions.flatMap { session ->
            (session["learnedWords"] as? JsonArray).orEmpty().mapNotNull { word ->
                when (word) {
                    is JsonPrimitive -> word.contentOrNull
                    is JsonObject -> word.stringOrNull("term")
                    else -> null
                }?.lowercase(Locale.ROOT)
            }
        }.toSet()
        val perfectSession = sessions.any {
            (it.intOrNull("totalQuestions") ?: 0) > 0
                && it.intOrNull("correctAnswers") == it.intOrNull("totalQuestions")
        }
        val longestStreak = longestStreak(sessions, ZoneId.systemDefault())
        val earned = listOf(
            Triple("first-session", "Primer paso", sessions.isNotEmpty()),
            Triple("ten-sessions", "Constancia", sessions.size >= 10),
            Triple("practice-hour", "Tiempo bien invertido", practicedSeconds >= 3_600),
            Triple("ten-words", "Colección de palabras", uniqueWords.size >= 10),
            Triple("perfect-session", "Todo correcto", perfectSession),
            Triple("three-day-streak", "Tres días de práctica", longestStreak >= 3),
        )
        val achievements = earned.map { (id, title, unlocked) ->
            buildJsonObject {
                put("id", JsonPrimitive(id))
                put("title", JsonPrimitive(title))
                put("description", JsonPrimitive(achievementDescription(id)))
                put("unlocked", JsonPrimitive(unlocked))
            }
        }
        val weeklySessions = sessions.filter { session ->
            runCatching {
                Instant.parse(session.string("completedAt")).atZone(ZoneId.systemDefault()).toLocalDate()
                    .isAfter(LocalDate.now().with(java.time.temporal.TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY)).minusDays(1))
            }.getOrDefault(false)
        }
        val weekWords = weeklySessions.flatMap { session ->
            (session["learnedWords"] as? JsonArray).orEmpty().mapNotNull { word ->
                (word as? JsonObject)?.stringOrNull("term")?.lowercase(Locale.ROOT)
            }
        }.toSet().size
        val weeklyDays = weeklySessions.mapNotNull { session ->
            runCatching { Instant.parse(session.string("completedAt")).atZone(ZoneId.systemDefault()).toLocalDate() }
                .getOrNull()
        }.distinct().size
        val weeklyMinutes = weeklySessions.sumOf { (it.intOrNull("durationSeconds") ?: 0).coerceAtLeast(0) } / 60
        call.respond(buildJsonObject {
            put("achievements", JsonArray(achievements))
            put("weeklyChallenges", JsonArray(listOf(
                challenge("practice-days", "Ritmo propio", "Practica en 3 días distintos", weeklyDays, 3),
                challenge("completed-sessions", "Pequeños pasos", "Completa 3 prácticas", weeklySessions.size, 3),
                challenge("practice-time", "Tiempo para ti", "Dedica 15 minutos a practicar", weeklyMinutes, 15),
                challenge("new-words", "Nuevas palabras", "Aprende 5 palabras distintas", weekWords, 5),
            )))
        })
    }
}

private fun Route.placementRoutes() {
    post("/placement/evaluate") {
        val body = call.receive<JsonObject>()
        val answers = body["answers"] ?: throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "Faltan las respuestas de evaluación.")
        val answerValues = when (answers) {
            is JsonObject -> answers.values.mapNotNull { (it as? JsonPrimitive)?.contentOrNull }
            is JsonArray -> answers.mapNotNull { (it as? JsonPrimitive)?.contentOrNull }
            else -> throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "answers debe ser un objeto o una lista.")
        }
        val knownAnswers = mapOf(
            "p1" to setOf("Hallo", "Haus", "Casa"),
            "p2" to setOf("Guten Morgen", "Der", "der Tisch"),
            "p3" to setOf("der Tisch", "Ich gehe morgen zur Uni."),
        )
        val score = if (answers is JsonObject) {
            answers.entries.count { (key, value) ->
                val submitted = (value as? JsonPrimitive)?.contentOrNull
                submitted != null && knownAnswers[key]?.any { it.equals(submitted, true) } == true
            }
        } else {
            answerValues.count { it.equals("Casa", true) || it.equals("Der", true) || it.equals("Ich gehe morgen zur Uni.", true) }
        }
        val total = if (answers is JsonObject) answerValues.size else maxOf(answerValues.size, 3)
        call.respond(buildJsonObject {
            put("recommendedLevel", JsonPrimitive(if (score >= 2) "A2" else "A1"))
            put("score", JsonPrimitive(score))
            put("total", JsonPrimitive(total))
            put("analysis", JsonPrimitive(if (score >= 2) "Puedes continuar en A2; ya dominas algunos fundamentos." else "Se recomienda comenzar en el nivel A1 para reforzar las bases."))
        })
    }
}

private fun Route.mascotRoutes(database: UserDatabase) {
    route("/mascot") {
        get {
            val user = call.authenticatedUser(database)
            val mascot = user["mascot"] as? JsonObject ?: emptyJsonObject()
            call.respond(mascot.withFields(buildJsonObject {
                put("availableAccessories", JsonArray(accessoryCatalog))
            }))
        }
        put("/accessories") {
            val email = call.authenticatedEmail()
            val body = call.receive<JsonObject>()
            val slot = body.string("slot")
            val accessory = body["accessoryId"]?.jsonPrimitive?.contentOrNull
            val accessoryData = accessoryCatalog.firstOrNull { it.stringOrNull("id") == accessory }
            if (slot !in setOf("neck", "eyes", "head", "shirt", "back", "charm")
                || (accessory != null && accessoryData?.stringOrNull("slot") != slot)
            ) {
                throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "El accesorio no corresponde a una categoría válida.")
            }
            val updated = database.update(email) { user ->
                val mascot = user["mascot"] as? JsonObject ?: emptyJsonObject()
                val unlocked = (mascot["unlockedAccessoryIds"] as? JsonArray).orEmpty()
                    .mapNotNull { (it as? JsonPrimitive)?.contentOrNull }.toSet()
                if (accessory != null && accessory !in unlocked) {
                    throw ApiException(HttpStatusCode.Forbidden, "ACCESSORY_LOCKED", "Desbloquea el accesorio antes de seleccionarlo.")
                }
                val selected = (mascot["selectedAccessories"] as? JsonObject ?: emptyJsonObject())
                    .withFields(buildJsonObject { put(slot, accessory?.let(::JsonPrimitive) ?: JsonNull) })
                user.withFields(buildJsonObject {
                    put("mascot", mascot.withFields(buildJsonObject { put("selectedAccessories", selected) }))
                })
            }
            call.respond(buildJsonObject { put("mascot", updated["mascot"] ?: emptyJsonObject()) })
        }
        post("/dismiss-reward") {
            val updated = database.update(call.authenticatedEmail()) { user ->
                val mascot = user["mascot"] as? JsonObject ?: emptyJsonObject()
                user.withFields(buildJsonObject {
                    put(
                        "mascot",
                        mascot.withFields(buildJsonObject {
                            put("newlyUnlockedAccessoryIds", JsonArray(emptyList()))
                        }),
                    )
                })
            }
            call.respond(buildJsonObject {
                put("success", JsonPrimitive(true))
                put("mascot", updated["mascot"] ?: emptyJsonObject())
            })
        }
    }
}

private fun validateCredentials(name: String, email: String, password: String) {
    if (name.length !in 1..80) {
        throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "El nombre debe tener entre 1 y 80 caracteres.")
    }
    if (!Regex("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$").matches(email) || email.length > 254) {
        throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "El correo no tiene un formato válido.")
    }
    if (password.length < 8 || password.toByteArray(Charsets.UTF_8).size > 72) {
        throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "La contraseña debe tener al menos 8 caracteres y no superar el límite seguro de BCrypt.")
    }
}

private fun newUser(
    name: String,
    email: String,
    level: String,
    goal: Int,
    motivation: String?,
    placementAssessment: JsonObject?,
): JsonObject {
    val now = Instant.now()
    val day = LocalDate.now().toString()
    return buildJsonObject {
        put("id", JsonPrimitive("usr-${java.util.UUID.randomUUID()}"))
        put("name", JsonPrimitive(name))
        put("email", JsonPrimitive(email))
        put("level", JsonPrimitive(level))
        placementAssessment?.let { put("placementAssessment", it) }
        put("dailyGoal", JsonPrimitive(goal))
        put("dailyGoalMinutes", JsonPrimitive(goal))
        put("motivation", JsonPrimitive(motivation?.takeIf(String::isNotBlank) ?: "Viajar"))
        put("avatar", JsonPrimitive("default"))
        put("studiedSeconds", JsonPrimitive(0))
        put("studiedMinutes", JsonPrimitive(0))
        put("todaySeconds", JsonPrimitive(0))
        put("todayMinutes", JsonPrimitive(0))
        put("totalSessions", JsonPrimitive(0))
        put("totalQuestions", JsonPrimitive(0))
        put("correctAnswers", JsonPrimitive(0))
        put("accuracy", JsonPrimitive(0))
        put("learnedWords", JsonPrimitive(0))
        put("goalDaysReached", JsonPrimitive(0))
        put("goalDaysTracked", JsonPrimitive(0))
        put("streak", JsonPrimitive(0))
        put("streakDays", JsonPrimitive(0))
        put("xp", JsonPrimitive(0))
        put("sessions", JsonArray(emptyList()))
        put("failedWords", emptyJsonObject())
        put("wordProgress", emptyJsonObject())
        put("learningProgress", buildJsonObject {
            put("readings", emptyJsonObject())
            put("theory", emptyJsonObject())
            put("pronunciation", emptyJsonObject())
        })
        put("mascot", buildJsonObject {
            put("unlockedAccessoryIds", JsonArray(emptyList()))
            put("selectedAccessories", emptyJsonObject())
            put("newlyUnlockedAccessoryIds", JsonArray(emptyList()))
        })
        put("learningDayKeys", JsonArray(emptyList()))
        put("totalLearningDays", JsonPrimitive(0))
        put("longestStreak", JsonPrimitive(0))
        put("preferences", buildJsonObject {
            put("notificationsEnabled", JsonPrimitive(false))
            put("hapticsEnabled", JsonPrimitive(false))
        })
        put("createdAt", JsonPrimitive(now.toString()))
        put("lastActiveDate", JsonPrimitive(day))
    }
}

private fun issueToken(email: String, algorithm: Algorithm, issuer: String, ttlSeconds: Long): String {
    if (ttlSeconds !in 60..2_592_000) {
        throw IllegalStateException("JWT_TTL_SECONDS must be between 60 and 2592000.")
    }
    val now = Instant.now()
    return JWT.create()
        .withIssuer(issuer)
        .withSubject(email)
        .withIssuedAt(Date.from(now))
        .withExpiresAt(Date.from(now.plusSeconds(ttlSeconds)))
        .sign(algorithm)
}

private fun authResponse(user: JsonObject, token: String) = buildJsonObject {
    put("token", JsonPrimitive(token))
    put("user", user)
}

private suspend fun io.ktor.server.application.ApplicationCall.authenticatedUser(
    database: UserDatabase,
    algorithm: Algorithm? = null,
    issuer: String? = null,
): JsonObject {
    val email = authenticatedEmail(algorithm, issuer)
    return database.findByEmail(email)?.user
        ?: throw ApiException(HttpStatusCode.Unauthorized, "UNAUTHORIZED", "La sesión ya no es válida.")
}

private fun io.ktor.server.application.ApplicationCall.authenticatedEmail(
    algorithm: Algorithm? = null,
    issuer: String? = null,
): String {
    val secret = System.getProperty("JWT_SECRET") ?: System.getenv("JWT_SECRET")
        ?: "development-only-change-this-secret-before-deploying"
    val verifier = JWT.require(algorithm ?: Algorithm.HMAC256(secret))
        .withIssuer(issuer ?: (System.getProperty("JWT_ISSUER") ?: System.getenv("JWT_ISSUER") ?: "sprache-api"))
        .build()
    val bearer = request.header(HttpHeaders.Authorization)
    val token = bearer?.takeIf { it.startsWith("Bearer ", true) }?.substringAfter(' ')
        ?: throw ApiException(HttpStatusCode.Unauthorized, "UNAUTHORIZED", "Se requiere un token Bearer válido.")
    return try {
        verifier.verify(token).subject
            ?: throw ApiException(HttpStatusCode.Unauthorized, "UNAUTHORIZED", "El token no contiene usuario.")
    } catch (error: ApiException) {
        throw error
    } catch (_: Exception) {
        throw ApiException(HttpStatusCode.Unauthorized, "UNAUTHORIZED", "El token no es válido o ha expirado.")
    }
}

private fun addCompletedSession(
    user: JsonObject,
    session: JsonObject,
    lesson: JsonObject,
    results: List<JsonObject>,
): JsonObject {
    val sessions = (user["sessions"] as? JsonArray).orEmpty()
    val duration = session.intOrNull("durationSeconds") ?: 0
    val completedSession = session.withFields(buildJsonObject {
        put("id", JsonPrimitive("session-${Instant.now().toEpochMilli()}"))
        put("dailyGoalMinutes", user["dailyGoalMinutes"] ?: user["dailyGoal"] ?: JsonPrimitive(10))
        put("durationSource", JsonPrimitive("measured"))
        put("learnedWords", JsonArray(results.filter { it["correct"]?.jsonPrimitive?.contentOrNull == "true" }
            .mapNotNull { result ->
                val term = result.stringOrNull("term") ?: return@mapNotNull null
                buildJsonObject {
                    put("term", JsonPrimitive(term))
                    put("translation", result["translation"] ?: JsonPrimitive(""))
                }
            }))
    })
    val updatedSessions = JsonArray(sessions + completedSession)
    var failedWords = user["failedWords"] as? JsonObject ?: emptyJsonObject()
    var wordProgress = user["wordProgress"] as? JsonObject ?: emptyJsonObject()
    results.forEachIndexed { index, result ->
        val term = result.stringOrNull("term") ?: return@forEachIndexed
        val key = term.lowercase(Locale.ROOT)
        val correct = result["correct"]?.jsonPrimitive?.contentOrNull == "true"
        val hintUsed = result["hintUsed"]?.jsonPrimitive?.contentOrNull == "true"
        val existing = wordProgress[key] as? JsonObject ?: emptyJsonObject()
        val correctCount = (existing.intOrNull("correctAnswers") ?: 0) + if (correct) 1 else 0
        val mistakes = (existing.intOrNull("mistakes") ?: 0) + if (correct) 0 else 1
        val hints = (existing.intOrNull("hints") ?: 0) + if (hintUsed) 1 else 0
        val interval = when {
            !correct || hintUsed -> 10
            correctCount >= 5 -> 10_080
            correctCount >= 3 -> 1_440
            correctCount >= 2 -> 360
            else -> 60
        }
        wordProgress = wordProgress.withFields(buildJsonObject {
            put(key, existing.withFields(buildJsonObject {
                put("term", JsonPrimitive(term))
                put("translation", result["translation"] ?: JsonPrimitive(""))
                put("correctAnswers", JsonPrimitive(correctCount))
                put("mistakes", JsonPrimitive(mistakes))
                put("hints", JsonPrimitive(hints))
                put("lastPracticedAt", JsonPrimitive(Instant.now().toString()))
                put("intervalMinutes", JsonPrimitive(interval))
                put("nextReviewAt", JsonPrimitive(Instant.now().plusSeconds(interval * 60L).toString()))
            }))
        })
        if (correct) {
            failedWords = JsonObject(failedWords - key)
        } else {
            val question = lesson.jsonArrayOf("questions").getOrNull(index) as? JsonObject
            val previous = failedWords[key] as? JsonObject ?: emptyJsonObject()
            failedWords = failedWords.withFields(buildJsonObject {
                put(key, previous.withFields(buildJsonObject {
                    put("term", JsonPrimitive(term))
                    put("translation", result["translation"] ?: JsonPrimitive(""))
                    question?.let { put("question", it) }
                    put("mistakes", JsonPrimitive((previous.intOrNull("mistakes") ?: 0) + 1))
                    put("lastFailedAt", JsonPrimitive(Instant.now().toString()))
                }))
            })
        }
    }
    val allSessions = sessions.mapNotNull { it as? JsonObject } + completedSession
    val totalSeconds = (user.intOrNull("studiedSeconds") ?: 0) + duration
    val today = LocalDate.now()
    val todaySeconds = allSessions.filter { item ->
        runCatching {
            Instant.parse(item.string("completedAt")).atZone(ZoneId.systemDefault()).toLocalDate().isEqual(today)
        }.getOrDefault(false)
    }.sumOf { it.intOrNull("durationSeconds") ?: 0 }
    val totalQuestions = allSessions.sumOf { it.intOrNull("totalQuestions") ?: 0 }
    val correctAnswers = allSessions.sumOf { it.intOrNull("correctAnswers") ?: 0 }
    val learnedWords = allSessions.flatMap { item ->
        (item["learnedWords"] as? JsonArray).orEmpty().mapNotNull { word ->
            when (word) {
                is JsonPrimitive -> word.contentOrNull
                is JsonObject -> word.stringOrNull("term")
                else -> null
            }
        }
    }.map { it.lowercase(Locale.ROOT) }.toSet().size
    val goal = user.intOrNull("dailyGoalMinutes") ?: user.intOrNull("dailyGoal") ?: 10
    val goalDaysReached = allSessions.groupBy { item ->
        runCatching { Instant.parse(item.string("completedAt")).atZone(ZoneId.systemDefault()).toLocalDate() }
            .getOrNull()
    }.filterKeys { it != null }.count { (_, entries) ->
        val daySeconds = entries.sumOf { it.intOrNull("durationSeconds") ?: 0 }
        val dayGoal = entries.lastOrNull()?.intOrNull("dailyGoalMinutes") ?: goal
        daySeconds >= dayGoal * 60
    }
    val xp = calculateXp(sessions.mapNotNull { it as? JsonObject } + completedSession)
    val updated = user.withFields(buildJsonObject {
        put("sessions", updatedSessions)
        put("failedWords", failedWords)
        put("wordProgress", wordProgress)
        put("activeLessonProgress", JsonNull)
        put("studiedSeconds", JsonPrimitive(totalSeconds))
        put("studiedMinutes", JsonPrimitive(totalSeconds / 60))
        put("todaySeconds", JsonPrimitive(todaySeconds))
        put("todayMinutes", JsonPrimitive(todaySeconds / 60))
        put("totalSessions", JsonPrimitive(allSessions.size))
        put("totalQuestions", JsonPrimitive(totalQuestions))
        put("correctAnswers", JsonPrimitive(correctAnswers))
        put("accuracy", JsonPrimitive(if (totalQuestions == 0) 0 else correctAnswers * 100 / totalQuestions))
        put("learnedWords", JsonPrimitive(learnedWords))
        put("goalDaysReached", JsonPrimitive(goalDaysReached))
        put("goalDaysTracked", JsonPrimitive(allSessions.mapNotNull { item ->
            runCatching { Instant.parse(item.string("completedAt")).atZone(ZoneId.systemDefault()).toLocalDate() }.getOrNull()
        }.distinct().size))
        put("xp", JsonPrimitive(xp))
    })
    return updated.withFields(deriveMascot(updated, updatedSessions))
}

private fun resetUserProgress(user: JsonObject): JsonObject = user.withFields(buildJsonObject {
    put("sessions", JsonArray(emptyList()))
    put("wordProgress", emptyJsonObject())
    put("failedWords", emptyJsonObject())
    put("learningProgress", buildJsonObject {
        put("readings", emptyJsonObject())
        put("theory", emptyJsonObject())
        put("pronunciation", emptyJsonObject())
    })
    put("activeLessonProgress", JsonNull)
    put("studiedSeconds", JsonPrimitive(0))
    put("studiedMinutes", JsonPrimitive(0))
    put("todaySeconds", JsonPrimitive(0))
    put("todayMinutes", JsonPrimitive(0))
    put("totalSessions", JsonPrimitive(0))
    put("totalQuestions", JsonPrimitive(0))
    put("correctAnswers", JsonPrimitive(0))
    put("accuracy", JsonPrimitive(0))
    put("learnedWords", JsonPrimitive(0))
    put("goalDaysReached", JsonPrimitive(0))
    put("goalDaysTracked", JsonPrimitive(0))
    put("streak", JsonPrimitive(0))
    put("streakDays", JsonPrimitive(0))
    put("xp", JsonPrimitive(0))
})

private fun calculateXp(sessions: List<JsonObject>): Int {
    val count = sessions.size
    val correct = sessions.sumOf { it.intOrNull("correctAnswers") ?: 0 }
    val minutes = sessions.sumOf { (it.intOrNull("durationSeconds") ?: 0) / 60 }
    return count * 20 + correct * 10 + minutes
}

private fun currentStreak(sessions: List<JsonObject>, now: LocalDate, zone: ZoneId): Int {
    val activeDays = sessions.mapNotNull { session ->
        runCatching { Instant.parse(session.string("completedAt")).atZone(zone).toLocalDate() }.getOrNull()
    }.toSet()
    var day = if (activeDays.contains(now)) now else now.minusDays(1)
    var streak = 0
    while (activeDays.contains(day)) {
        streak += 1
        day = day.minusDays(1)
    }
    return streak
}

private fun deriveMascot(user: JsonObject, sessions: JsonArray): JsonObject {
    val days = sessions.mapNotNull { session ->
        val completed = (session as? JsonObject)?.stringOrNull("completedAt") ?: return@mapNotNull null
        runCatching { Instant.parse(completed).atZone(ZoneId.systemDefault()).toLocalDate() }.getOrNull()
    }.distinct().sorted()
    var streak = 0
    var longest = 0
    var previous: LocalDate? = null
    days.forEach { date ->
        streak = if (previous?.plusDays(1)?.isEqual(date) == true) streak + 1 else 1
        longest = maxOf(longest, streak)
        previous = date
    }
    val mascot = user["mascot"] as? JsonObject ?: emptyJsonObject()
    val old = (mascot["unlockedAccessoryIds"] as? JsonArray).orEmpty().mapNotNull {
        (it as? JsonPrimitive)?.contentOrNull
    }
    val unlocked = accessoryCatalog.filter { item ->
        val required = item.intOrNull("streakDays") ?: Int.MAX_VALUE
        required <= maxOf(longest, user.intOrNull("longestStreak") ?: 0) || item.stringOrNull("id") in old
    }.mapNotNull { it.stringOrNull("id") }
    val newly = unlocked - old.toSet()
    val nextMascot = mascot.withFields(buildJsonObject {
        put("unlockedAccessoryIds", JsonArray(unlocked.map(::JsonPrimitive)))
        put("newlyUnlockedAccessoryIds", JsonArray((old + newly).distinct().map(::JsonPrimitive)))
    })
    return buildJsonObject {
        put("mascot", nextMascot)
        put("longestStreak", JsonPrimitive(maxOf(longest, user.intOrNull("longestStreak") ?: 0)))
        put("streak", JsonPrimitive(currentStreak(sessions.mapNotNull { it as? JsonObject }, LocalDate.now(), ZoneId.systemDefault())))
    }
}

private fun reviewLesson(id: String, title: String, questions: List<JsonObject>): JsonObject = buildJsonObject {
    put("id", JsonPrimitive(id))
    put("title", JsonPrimitive(title))
    put("activityId", JsonPrimitive(id))
    put("durationMinutes", JsonPrimitive(maxOf(1, (questions.size + 1) / 2)))
    put("questions", JsonArray(questions))
}

private fun challenge(id: String, title: String, current: Int, target: Int) = buildJsonObject {
    put("id", JsonPrimitive(id))
    put("title", JsonPrimitive(title))
    put("current", JsonPrimitive(current.coerceAtMost(target)))
    put("target", JsonPrimitive(target))
    put("completed", JsonPrimitive(current >= target))
}

private fun challenge(id: String, title: String, description: String, current: Int, target: Int) =
    challenge(id, title, current, target).withFields(
        buildJsonObject { put("description", JsonPrimitive(description)) },
    )

private fun achievementDescription(id: String): String = when (id) {
    "first-session" -> "Completaste tu primera práctica."
    "ten-sessions" -> "Completaste 10 prácticas."
    "practice-hour" -> "Acumulaste 60 minutos de práctica real."
    "ten-words" -> "Acertaste al menos 10 palabras distintas."
    "perfect-session" -> "Lograste una práctica perfecta."
    else -> "Practicaste tres días seguidos."
}

private val accessoryCatalog = listOf(
    accessory("scarf", "neck", "Pañuelo", "🧣", 1),
    accessory("glasses", "eyes", "Gafas", "🕶️", 3),
    accessory("cap", "head", "Gorro", "🧢", 7),
    accessory("shirt", "shirt", "Camiseta", "👕", 14),
    accessory("backpack", "back", "Mochila", "🎒", 30),
    accessory("star", "charm", "Estrella", "⭐", 60),
)

private fun accessory(id: String, slot: String, label: String, emoji: String, days: Int) = buildJsonObject {
    put("id", JsonPrimitive(id))
    put("slot", JsonPrimitive(slot))
    put("label", JsonPrimitive(label))
    put("emoji", JsonPrimitive(emoji))
    put("streakDays", JsonPrimitive(days))
}

private fun JsonObject.withFields(fields: JsonObject): JsonObject {
    val merged = toMutableMap()
    fields.forEach { (key, value) -> merged[key] = value }
    return JsonObject(merged)
}

private fun mergeObjects(base: JsonObject?, updates: JsonObject?): JsonObject {
    if (updates == null) return base ?: emptyJsonObject()
    return (base ?: emptyJsonObject()).withFields(updates)
}

private fun emptyJsonObject() = JsonObject(emptyMap())
private fun JsonObject.string(key: String) = stringOrNull(key)
    ?: throw ApiException(HttpStatusCode.BadRequest, "BAD_REQUEST", "$key es obligatorio.")
private fun JsonObject.stringOrNull(key: String): String? =
    (this[key] as? JsonPrimitive)?.contentOrNull
private fun JsonObject.intOrNull(key: String): Int? =
    (this[key] as? JsonPrimitive)?.contentOrNull?.toIntOrNull()
private fun JsonObject.nestedString(parent: String, child: String): String? =
    (this[parent] as? JsonObject)?.stringOrNull(child)
private fun JsonObject.jsonArrayOf(key: String): JsonArray = this[key] as? JsonArray ?: JsonArray(emptyList())

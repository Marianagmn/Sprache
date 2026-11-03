package com.sprache

import io.ktor.client.request.get
import io.ktor.client.request.header
import io.ktor.client.request.post
import io.ktor.client.request.put
import io.ktor.client.request.setBody
import io.ktor.client.statement.bodyAsText
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.testApplication
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import java.util.UUID

class ApiIntegrationTest {
    @Test
    fun `public catalog routes return seeded content and filter by level`() = withTestServer {
        val health = client.get("/api/health")
        assertEquals(HttpStatusCode.OK, health.status)

        val activities = client.get("/api/activities?level=A1")
        assertEquals(HttpStatusCode.OK, activities.status)
        val activityItems = Json.parseToJsonElement(activities.bodyAsText()).jsonArray
        assertTrue(activityItems.isNotEmpty())
        assertTrue(activityItems.all { it.jsonObject["levelCode"]?.jsonPrimitive?.content == "A1" })

        val readings = client.get("/api/readings?level=A2")
        assertEquals(HttpStatusCode.OK, readings.status)
        assertTrue(Json.parseToJsonElement(readings.bodyAsText()).jsonArray.isNotEmpty())

        val theory = client.get("/api/theory?level=B1")
        assertEquals(HttpStatusCode.OK, theory.status)
        assertTrue(Json.parseToJsonElement(theory.bodyAsText()).jsonArray.isNotEmpty())

        assertEquals(HttpStatusCode.NotFound, client.get("/api/lessons/not-a-lesson").status)
        assertEquals(HttpStatusCode.NotFound, client.get("/api/lessons/by-activity/not-an-activity").status)
    }

    @Test
    fun `auth protected routes persist user state across requests`() = withTestServer {
        val register = client.post("/api/auth/register") {
            jsonBody("""{"name":"Test User","email":"test-${UUID.randomUUID()}@example.com","password":"SecurePass123","initialLevel":"A1","dailyGoalMinutes":15}""")
        }
        assertEquals(HttpStatusCode.Created, register.status)
        val registerJson = Json.parseToJsonElement(register.bodyAsText()).jsonObject
        val email = registerJson["user"]!!.jsonObject["email"]!!.jsonPrimitive.content
        val token = registerJson["token"]!!.jsonPrimitive.content
        val authHeader = "Bearer $token"

        assertEquals(HttpStatusCode.Unauthorized, client.get("/api/auth/me").status)
        val me = client.get("/api/auth/me") { header(HttpHeaders.Authorization, authHeader) }
        assertEquals(HttpStatusCode.OK, me.status)

        val profile = client.put("/api/auth/profile") {
            header(HttpHeaders.Authorization, authHeader)
            jsonBody("""{"name":"Updated User","dailyGoalMinutes":20}""")
        }
        assertEquals(HttpStatusCode.OK, profile.status)
        assertTrue(profile.bodyAsText().contains("Updated User"))

        val learning = client.post("/api/progress/learning-module") {
            header(HttpHeaders.Authorization, authHeader)
            jsonBody("""{"type":"readings","moduleId":"reading-city","payload":{"completed":true,"correctQuestionIds":["city-q1"]}}""")
        }
        assertEquals(HttpStatusCode.OK, learning.status)

        val progress = client.get("/api/progress") { header(HttpHeaders.Authorization, authHeader) }
        assertEquals(HttpStatusCode.OK, progress.status)
        assertTrue(progress.bodyAsText().contains("weeklyActivity"))

        val achievements = client.get("/api/achievements") { header(HttpHeaders.Authorization, authHeader) }
        assertEquals(HttpStatusCode.OK, achievements.status)

        val mascot = client.get("/api/mascot") { header(HttpHeaders.Authorization, authHeader) }
        assertEquals(HttpStatusCode.OK, mascot.status)
        assertTrue(mascot.bodyAsText().contains("availableAccessories"))

        val review = client.get("/api/lessons/spaced-review") { header(HttpHeaders.Authorization, authHeader) }
        assertEquals(HttpStatusCode.OK, review.status)

        val failedReview = client.get("/api/lessons/failed-words-review") {
            header(HttpHeaders.Authorization, authHeader)
        }
        assertEquals(HttpStatusCode.OK, failedReview.status)

        val login = client.post("/api/auth/login") {
            jsonBody("""{"email":"$email","password":"SecurePass123"}""")
        }
        assertEquals(HttpStatusCode.OK, login.status)
        assertEquals(HttpStatusCode.Unauthorized, client.post("/api/auth/login") {
            jsonBody("""{"email":"$email","password":"wrong-password"}""")
        }.status)

        val reset = client.post("/api/progress/reset") { header(HttpHeaders.Authorization, authHeader) }
        assertEquals(HttpStatusCode.OK, reset.status)
        assertTrue(reset.bodyAsText().contains("Updated User"))
    }

    @Test
    fun `lesson completion updates progress and validates input`() = withTestServer {
        val register = client.post("/api/auth/register") {
            jsonBody("""{"name":"Learner","email":"learner-${UUID.randomUUID()}@example.com","password":"SecurePass123"}""")
        }
        val token = Json.parseToJsonElement(register.bodyAsText()).jsonObject["token"]!!.jsonPrimitive.content
        val complete = client.post("/api/lessons/vocabulary-basics/complete") {
            header(HttpHeaders.Authorization, "Bearer $token")
            jsonBody(
                """{"activityId":"vocabulary","durationSeconds":93,"answers":["Haus","Libro","Morgen"],"hintsUsed":[false,false,true]}""",
            )
        }
        assertEquals(HttpStatusCode.OK, complete.status)
        assertTrue(complete.bodyAsText().contains("\"correctAnswers\":3"))
        assertTrue(complete.bodyAsText().contains("\"xpGained\":51"))

        val progress = client.get("/api/progress") { header(HttpHeaders.Authorization, "Bearer $token") }
        assertTrue(progress.bodyAsText().contains("\"studiedMinutes\":1"))

        val invalid = client.post("/api/lessons/vocabulary-basics/complete") {
            header(HttpHeaders.Authorization, "Bearer $token")
            jsonBody("""{"answers":["Haus"],"durationSeconds":0}""")
        }
        assertEquals(HttpStatusCode.BadRequest, invalid.status)

        val placement = client.post("/api/placement/evaluate") {
            jsonBody("""{"answers":{"p1":"Hallo","p2":"Guten Morgen","p3":"der Tisch"}}""")
        }
        assertEquals(HttpStatusCode.OK, placement.status)
        assertTrue(placement.bodyAsText().contains("\"recommendedLevel\":\"A2\""))
    }

    @Test
    fun `invalid registration and accessory selection return client errors`() = withTestServer {
        val invalid = client.post("/api/auth/register") {
            jsonBody("""{"name":"","email":"bad","password":"short"}""")
        }
        assertEquals(HttpStatusCode.BadRequest, invalid.status)
        assertTrue(invalid.bodyAsText().contains("\"error\":\"BAD_REQUEST\""))

        val register = client.post("/api/auth/register") {
            jsonBody("""{"name":"Learner","email":"learner-${UUID.randomUUID()}@example.com","password":"SecurePass123"}""")
        }
        val token = Json.parseToJsonElement(register.bodyAsText()).jsonObject["token"]!!.jsonPrimitive.content
        val lockedAccessory = client.put("/api/mascot/accessories") {
            header(HttpHeaders.Authorization, "Bearer $token")
            jsonBody("""{"slot":"neck","accessoryId":"scarf"}""")
        }
        assertEquals(HttpStatusCode.Forbidden, lockedAccessory.status)

        val dismiss = client.post("/api/mascot/dismiss-reward") {
            header(HttpHeaders.Authorization, "Bearer $token")
        }
        assertEquals(HttpStatusCode.OK, dismiss.status)
    }

    private fun withTestServer(block: suspend io.ktor.server.testing.ApplicationTestBuilder.() -> Unit) {
        val previousUrl = System.getProperty("SPRACHE_DB_URL")
        val previousSecret = System.getProperty("JWT_SECRET")
        System.setProperty("SPRACHE_DB_URL", "jdbc:h2:mem:sprache-${UUID.randomUUID()};DB_CLOSE_DELAY=-1")
        System.setProperty("JWT_SECRET", "test-secret-with-more-than-thirty-two-characters")
        try {
            testApplication {
                application { module() }
                block()
            }
        } finally {
            if (previousUrl == null) System.clearProperty("SPRACHE_DB_URL")
            else System.setProperty("SPRACHE_DB_URL", previousUrl)
            if (previousSecret == null) System.clearProperty("JWT_SECRET")
            else System.setProperty("JWT_SECRET", previousSecret)
        }
    }

    private fun io.ktor.client.request.HttpRequestBuilder.jsonBody(body: String) {
        header(HttpHeaders.ContentType, ContentType.Application.Json.toString())
        setBody(body)
    }
}

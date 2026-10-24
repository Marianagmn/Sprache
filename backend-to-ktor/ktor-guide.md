# Guía de Implementación en Ktor (Kotlin)

Esta guía explica paso a paso cómo estructurar y construir el backend de **Sprache** en **Ktor 3.x** con Kotlin, utilizando los datos y algoritmos de referencia incluidos en esta carpeta.

---

## 1. Estructura Recomendada del Proyecto Ktor

```
sprache-backend/
├── build.gradle.kts
├── src/main/
│   ├── kotlin/com/sprache/
│   │   ├── Application.kt              # Entry point y configuración de plugins
│   │   ├── plugins/
│   │   │   ├── Routing.kt             # Configuración general de rutas
│   │   │   ├── Security.kt            # JWT y hashing de contraseñas
│   │   │   ├── Serialization.kt       # JSON con kotlinx.serialization
│   │   │   ├── CORS.kt                # Orígenes permitidos (frontend web / móvil)
│   │   │   └── StatusPages.kt         # Manejo centralizado de excepciones
│   │   ├── routes/
│   │   │   ├── AuthRoutes.kt          # /api/auth
│   │   │   ├── ActivityRoutes.kt      # /api/activities
│   │   │   ├── LessonRoutes.kt        # /api/lessons
│   │   │   ├── ReadingRoutes.kt       # /api/readings
│   │   │   ├── TheoryRoutes.kt        # /api/theory
│   │   │   ├── ProgressRoutes.kt      # /api/progress
│   │   │   └── PlacementRoutes.kt     # /api/placement
│   │   ├── services/
│   │   │   ├── AuthService.kt         # Lógica de login, hash y tokens
│   │   │   ├── LessonService.kt       # Selección de lecciones y repaso
│   │   │   ├── SpacedRepetitionService.kt # Algoritmo Leitner / repetición
│   │   │   ├── ProgressService.kt     # Cálculo de rachas, XP y estadísticas
│   │   │   └── AchievementService.kt  # Sistema de insignias
│   │   ├── models/
│   │   │   ├── User.kt                # DTOs y entidades de usuario
│   │   │   ├── Lesson.kt              # DTOs de lecciones y preguntas
│   │   │   ├── Activity.kt            # DTOs del catálogo
│   │   │   ├── Progress.kt            # DTOs de sesión y estadísticas
│   │   │   └── Achievement.kt         # DTOs de logros
│   │   ├── database/
│   │   │   ├── DatabaseFactory.kt     # Conexión Exposed / HikariCP
│   │   │   ├── Tables.kt              # Definición de tablas SQL (Exposed)
│   │   │   └── DatabaseSeeder.kt      # Carga inicial desde data/json/*.json
│   │   └── security/
│   │       ├── JwtConfig.kt           # Generación y validación de JWT
│   │       └── PasswordHasher.kt      # BCrypt o Argon2
│   └── resources/
│       ├── application.yaml           # Configuración (puerto, JWT secret, DB)
│       └── seeds/                     # Copiar aquí data/json/*.json
```

---

## 2. Dependencias Recomendadas (`build.gradle.kts`)

```kotlin
plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.ktor)
    alias(libs.plugins.kotlin.plugin.serialization)
}

dependencies {
    // Ktor Server Core & Netty
    implementation("io.ktor:ktor-server-core")
    implementation("io.ktor:ktor-server-netty")
    implementation("io.ktor:ktor-server-config-yaml")

    // Plugins Ktor
    implementation("io.ktor:ktor-server-content-negotiation")
    implementation("io.ktor:ktor-serialization-kotlinx-json")
    implementation("io.ktor:ktor-server-auth")
    implementation("io.ktor:ktor-server-auth-jwt")
    implementation("io.ktor:ktor-server-cors")
    implementation("io.ktor:ktor-server-status-pages")

    // Base de Datos (Exposed ORM + PostgreSQL / SQLite)
    implementation("org.jetbrains.exposed:exposed-core:0.56.0")
    implementation("org.jetbrains.exposed:exposed-dao:0.56.0")
    implementation("org.jetbrains.exposed:exposed-jdbc:0.56.0")
    implementation("org.jetbrains.exposed:exposed-kotlin-datetime:0.56.0")
    implementation("com.zaxxer:HikariCP:5.1.0")
    implementation("org.postgresql:postgresql:42.7.3")

    // Seguridad: Hashing de contraseñas (BCrypt)
    implementation("org.mindrot:jbcrypt:0.4")

    // Logging
    implementation("ch.qos.logback:logback-classic:1.5.6")
}
```

---

## 3. Modelos de Datos en Kotlin (`models/`)

A continuación se muestran ejemplos directos basados en los datos del frontend:

```kotlin
package com.sprache.models

import kotlinx.serialization.Serializable

@Serializable
data class Vocabulary(
    val term: String,
    val translation: String,
    val example: String? = null
)

@Serializable
data class Question(
    val id: String,
    val prompt: String,
    val word: String? = null,
    val options: List<String>,
    val answer: String,
    val vocabulary: Vocabulary? = null,
    val hint: String? = null,
    val feedback: String? = null,
    val explanation: String? = null
)

@Serializable
data class Lesson(
    val id: String,
    val title: String,
    val activityId: String,
    val durationMinutes: Int,
    val level: String? = null,
    val objective: String? = null,
    val passage: String? = null,
    val questions: List<Question> = emptyList()
)

@Serializable
data class Activity(
    val id: String,
    val title: String,
    val description: String,
    val levelCode: String,
    val category: String,
    val lessonCount: Int = 1
)

@Serializable
data class WordProgressItem(
    val term: String,
    val translation: String,
    val correctAnswers: Int = 0,
    val mistakes: Int = 0,
    val hints: Int = 0,
    val lastPracticedAt: String,
    val reviewStreak: Int = 0,
    val intervalMinutes: Int = 10,
    val nextReviewAt: String
)

@Serializable
data class MascotAccessory(
    val id: String,
    val slot: String,
    val label: String,
    val emoji: String,
    val streakDays: Int
)

@Serializable
data class MascotState(
    val unlockedAccessoryIds: List<String> = emptyList(),
    val selectedAccessories: Map<String, String> = emptyMap(),
    val newlyUnlockedAccessoryIds: List<String> = emptyList()
)

@Serializable
data class EquipAccessoryRequest(
    val slot: String,
    val accessoryId: String? = null
)
```

---

## 4. Algoritmo de Repetición Espaciada (`SpacedRepetitionService.kt`)

Port directo de la lógica contenida en `services/spacedRepetitionService.js`:

```kotlin
package com.sprache.services

import java.time.Instant
import java.time.temporal.ChronoUnit

data class ReviewSchedule(
    val reviewStreak: Int,
    val intervalMinutes: Int,
    val nextReviewAt: String
)

object SpacedRepetitionService {
    // Intervalos en minutos: 10 min, 4 h, 1 día, 3 días, 7 días, 14 días
    private val INTERVALS = listOf(10, 240, 1440, 4320, 10080, 20160)

    fun calculateNextReview(
        currentStreak: Int,
        isCorrect: Boolean,
        usedHint: Boolean,
        baseTime: Instant = Instant.now()
    ): ReviewSchedule {
        val nextStreak = when {
            !isCorrect -> 0
            usedHint -> maxOf(0, currentStreak - 1)
            else -> currentStreak + 1
        }

        val intervalIndex = nextStreak.coerceIn(0, INTERVALS.lastIndex)
        val intervalMinutes = INTERVALS[intervalIndex]
        val nextReviewInstant = baseTime.plus(intervalMinutes.toLong(), ChronoUnit.MINUTES)

        return ReviewSchedule(
            reviewStreak = nextStreak,
            intervalMinutes = intervalMinutes,
            nextReviewAt = nextReviewInstant.toString()
        )
    }
}
```

---

## 5. Carga de Semillas JSON en la Base de Datos (`DatabaseSeeder.kt`)

Para inicializar la base de datos con todo el contenido, utiliza los archivos JSON generados en `backend-to-ktor/data/json/`:

```kotlin
package com.sprache.database

import com.sprache.models.Activity
import com.sprache.models.Lesson
import kotlinx.serialization.json.Json
import java.io.File

object DatabaseSeeder {
    private val json = Json { ignoreUnknownKeys = true }

    fun seedIfEmpty() {
        // Carga de actividades
        val activitiesFile = File("resources/seeds/activities.json")
        if (activitiesFile.exists()) {
            val activities: List<Activity> = json.decodeFromString(activitiesFile.readText())
            // Insertar en la tabla ActivitiesTable con Exposed
        }

        // Carga de lecciones (más de 3,000 líneas de contenido ya en JSON)
        val lessonsFile = File("resources/seeds/lessons.json")
        if (lessonsFile.exists()) {
            val lessons: List<Lesson> = json.decodeFromString(lessonsFile.readText())
            // Insertar en la tabla LessonsTable
        }
    }
}
```

---

## 6. Configuración de CORS para el Frontend de React Native

En `src/main/kotlin/com/sprache/plugins/CORS.kt`:

```kotlin
package com.sprache.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureCORS() {
    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        allowMethod(HttpMethod.Patch)
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.ContentType)
        anyHost() // En producción, restringir a dominios autorizados
    }
}
```

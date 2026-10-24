# Backend to Ktor Migration Kit

Esta carpeta contiene todo el material necesario para construir el backend de **Sprache** en **Ktor (Kotlin)** y sustituir la lógica local del frontend.

---

## 📁 Estructura del Kit de Migración

```
backend-to-ktor/
├── README.md                  # Este documento
├── api-specification.md       # Especificación completa de rutas, métodos, payloads y respuestas REST
├── ktor-guide.md              # Guía de implementación en Ktor 3.x (Plugins, DTOs, Exposed ORM, Seeder)
│
├── data/                      # Datos para poblar la base de datos
│   ├── json/                  # Archivos JSON listos para importar con kotlinx.serialization
│   │   ├── activities.json    # Catálogo completo de actividades (A1-B2)
│   │   ├── lessons.json       # Lecciones de vocabulario, gramática, retos y práctica
│   │   ├── readingLessons.json# Lecturas graduadas por nivel
│   │   ├── theoryModules.json # Módulos de teoría y gramática
│   │   └── initialUser.json   # Estructura de usuario inicial y defaults
│   ├── Activities.js          # Fuentes originales en JavaScript
│   ├── lessons.js
│   ├── readingLessons.js
│   ├── theoryModules.js
│   └── user.js
│
└── services/                  # Lógica de negocio de referencia (implementación JS a portar a Kotlin)
    ├── achievementService.js  # Sistema de insignias y retos semanales
    ├── activityService.js     # Filtros y recomendación de actividades
    ├── authServiceCore.js     # Validaciones de usuario, login y hashing
    ├── learningPathService.js # Ruta de aprendizaje CEFR (A1-B2) y desbloqueo
    ├── learningProgressService.js # Seguimiento de lecturas, teoría y pronunciación
    ├── lessonProgressService.js   # Cálculo de resultados de lección, fallos y resúmenes
    ├── lessonService.js       # Búsqueda de lecciones y generación de repasos
    ├── placementAssessmentService.js # Test de colocación y asignación de nivel
    ├── profileService.js      # Actualización de perfil y metas
    ├── progressService.js     # Cálculo de rachas, XP y estadísticas semanales
    ├── mascotRewardsService.js # Desbloqueo de accesorios por racha y personalización
    └── spacedRepetitionService.js # Algoritmo Leitner de repetición espaciada
```

---

## 🚀 Pasos para la Migración a Ktor

1. **Crear el proyecto Ktor:**
   - Usa IntelliJ IDEA o [start.ktor.io](https://start.ktor.io) seleccionando Ktor 3.x, Netty, Kotlinx.Serialization y JWT.
2. **Definir modelos y tablas de base de datos:**
   - Consulta `ktor-guide.md` para las clases de datos (`@Serializable data class`) y tablas SQL (Exposed).
3. **Poblar la base de datos:**
   - Importa directamente los archivos de `data/json/*.json` mediante el seeder descrito en `ktor-guide.md`.
4. **Implementar los servicios de negocio:**
   - Convierte los algoritmos de `services/` (repetición espaciada, cálculo de racha, evaluación de test) a Kotlin.
5. **Crear los endpoints REST:**
   - Sigue rigurosamente la especificación en `api-specification.md`.
6. **Conectar el Frontend:**
   - Una vez levantado el servidor Ktor (por ejemplo en `http://localhost:8080`), en el frontend de React Native solo debes configurar la variable de entorno:
     ```env
     EXPO_PUBLIC_API_URL=http://localhost:8080
     ```
   - El cliente HTTP del frontend (`Sprache/services/apiService.js`) se encargará de dirigir las peticiones al backend.

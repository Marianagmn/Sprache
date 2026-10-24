# Especificación de la API REST para Sprache (Backend Ktor)

Esta especificación detalla todos los contratos HTTP (endpoints, métodos, payloads de entrada y respuesta) necesarios para implementar el backend en Ktor y consumirlo desde el frontend de React Native.

---

## Convenciones Generales

- **Base URL:** `http://localhost:8080/api` (en desarrollo)
- **Content-Type:** `application/json`
- **Autenticación:** Cabecera `Authorization: Bearer <jwt_token>` (para rutas protegidas)
- **Formato de Errores Estándar:**
  ```json
  {
    "error": "BAD_REQUEST",
    "message": "Descripción legible del error."
  }
  ```

---

## 1. Autenticación y Perfil (`/api/auth`)

### 1.1 Registro de Usuario
- **Método:** `POST`
- **Ruta:** `/api/auth/register`
- **Público:** Sí
- **Request Body:**
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "Password123",
    "initialLevel": "A1",
    "dailyGoalMinutes": 15
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "usr-1729000000",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "level": "A1",
      "dailyGoalMinutes": 15,
      "studiedSeconds": 0,
      "streakDays": 1,
      "xp": 0,
      "sessions": [],
      "failedWords": [],
      "wordProgress": {},
      "learningProgress": {
        "readings": {},
        "theory": {},
        "pronunciation": {}
      }
    }
  }
  ```

### 1.2 Inicio de Sesión
- **Método:** `POST`
- **Ruta:** `/api/auth/login`
- **Público:** Sí
- **Request Body:**
  ```json
  {
    "email": "juan@example.com",
    "password": "Password123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { ... }
  }
  ```

### 1.3 Obtener Usuario Actual (Validar Sesión)
- **Método:** `GET`
- **Ruta:** `/api/auth/me`
- **Público:** No (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "user": { ... }
  }
  ```

### 1.4 Actualizar Perfil
- **Método:** `PUT`
- **Ruta:** `/api/auth/profile`
- **Público:** No (Bearer Token)
- **Request Body:**
  ```json
  {
    "name": "Juan Actualizado",
    "dailyGoalMinutes": 20,
    "avatar": "default"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "user": { ... }
  }
  ```

---

## 2. Actividades y Lecciones (`/api/activities`, `/api/lessons`)

### 2.1 Listar Actividades
- **Método:** `GET`
- **Ruta:** `/api/activities`
- **Query Params:** `level` (opcional: `A1`, `A2`, `B1`, `B2`, o `Todos`)
- **Response (200 OK):**
  ```json
  [
    {
      "id": "intro-vocabulary",
      "title": "Vocabulario básico",
      "description": "Aprende palabras cotidianas en alemán.",
      "levelCode": "A1",
      "category": "Vocabulario",
      "lessonCount": 1
    }
  ]
  ```

### 2.2 Obtener Lección por ID o Activity ID
- **Método:** `GET`
- **Ruta:** `/api/lessons/{id}`
- **Ruta alternativa:** `/api/lessons/by-activity/{activityId}`
- **Response (200 OK):**
  ```json
  {
    "id": "vocabulary-greetings",
    "title": "Saludos y presentaciones",
    "activityId": "vocabulary-greetings",
    "durationMinutes": 5,
    "questions": [
      {
        "id": "greetings-q1",
        "prompt": "¿Cómo se dice 'hola' en alemán?",
        "word": "hola",
        "options": ["Hallo", "Tschüss", "Danke", "Bitte"],
        "answer": "Hallo",
        "vocabulary": { "term": "Hallo", "translation": "hola" },
        "hint": "Es un saludo informal común."
      }
    ]
  }
  ```

### 2.3 Obtener Lección de Repaso Espaciado
- **Método:** `GET`
- **Ruta:** `/api/lessons/spaced-review`
- **Público:** No (Bearer Token - se basa en `wordProgress` del usuario)
- **Response (200 OK):** Objeto de lección dinámico con las palabras que requieren repaso según el algoritmo de repetición espaciada.

### 2.4 Obtener Lección de Palabras Falladas
- **Método:** `GET`
- **Ruta:** `/api/lessons/failed-words-review`
- **Público:** No (Bearer Token - se basa en `failedWords` del usuario)
- **Response (200 OK):** Objeto de lección generado a partir de las palabras registradas en `failedWords`.

### 2.5 Completar Lección
- **Método:** `POST`
- **Ruta:** `/api/lessons/{id}/complete`
- **Público:** No (Bearer Token)
- **Request Body:**
  ```json
  {
    "activityId": "vocabulary-greetings",
    "durationSeconds": 93,
    "answers": ["Hallo", "Guten Tag", "Auf Wiedersehen"],
    "hintsUsed": [false, false, true],
    "wordResults": [
      {
        "term": "Hallo",
        "translation": "hola",
        "correct": true,
        "hintUsed": false
      }
    ]
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "session": {
      "activityId": "vocabulary-greetings",
      "completedAt": "2026-10-24T12:00:00Z",
      "durationSeconds": 93,
      "correctAnswers": 3,
      "totalQuestions": 3,
      "scorePercentage": 100
    },
    "updatedUser": { ... },
    "xpGained": 50,
    "unlockedAchievements": []
  }
  ```

---

## 3. Módulos de Lectura y Teoría (`/api/readings`, `/api/theory`)

### 3.1 Listar Lecturas
- **Método:** `GET`
- **Ruta:** `/api/readings`
- **Query Params:** `level` (opcional: `A1`, `A2`, `B1`, `B2`)
- **Response (200 OK):** Lista de lecturas con sus pasajes, vocabulario y preguntas de comprensión.

### 3.2 Listar Módulos de Teoría Gramatical
- **Método:** `GET`
- **Ruta:** `/api/theory`
- **Query Params:** `level` (opcional: `A1`, `A2`, `B1`, `B2`)
- **Response (200 OK):** Lista de módulos teóricos con explicaciones, reglas, tablas y ejercicios de repaso.

---

## 4. Progreso, Estadísticas y Gamificación (`/api/progress`)

### 4.1 Resumen de Progreso
- **Método:** `GET`
- **Ruta:** `/api/progress`
- **Público:** No (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "streakDays": 5,
    "xp": 420,
    "studiedMinutes": 45,
    "weeklyActivity": [
      { "day": "Lun", "minutes": 15, "active": true },
      { "day": "Mar", "minutes": 10, "active": true },
      { "day": "Mié", "minutes": 20, "active": true },
      { "day": "Jue", "minutes": 0, "active": false },
      { "day": "Vie", "minutes": 0, "active": false },
      { "day": "Sáb", "minutes": 0, "active": false },
      { "day": "Dom", "minutes": 0, "active": false }
    ],
    "todayGoalReached": true
  }
  ```

### 4.2 Registrar Avance en Lectura / Teoría / Pronunciación
- **Método:** `POST`
- **Ruta:** `/api/progress/learning-module`
- **Público:** No (Bearer Token)
- **Request Body:**
  ```json
  {
    "type": "readings",
    "moduleId": "reading-city",
    "payload": {
      "completed": true,
      "correctQuestionIds": ["city-q1", "city-q2"]
    }
  }
  ```
- **Response (200 OK):**
  ```json
  { "success": true, "learningProgress": { ... } }
  ```

### 4.3 Reiniciar Progreso del Usuario
- **Método:** `POST`
- **Ruta:** `/api/progress/reset`
- **Público:** No (Bearer Token)
- **Response (200 OK):** Usuario con historial de sesiones y palabras reiniciado, preservando credenciales y meta diaria.

### 4.4 Listar Logros y Retos Semanales
- **Método:** `GET`
- **Ruta:** `/api/achievements`
- **Público:** No (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "achievements": [
      { "id": "first-lesson", "title": "Primer paso", "description": "Completa tu primera lección", "unlocked": true },
      { "id": "streak-3", "title": "Constancia", "description": "Mantén una racha de 3 días", "unlocked": true }
    ],
    "weeklyChallenges": [
      { "id": "study-5-days", "title": "5 días de estudio", "current": 3, "target": 5, "completed": false }
    ]
  }
  ```

---

## 5. Evaluación Inicial (`/api/placement`)

### 5.1 Evaluar Nivel Inicial
- **Método:** `POST`
- **Ruta:** `/api/placement/evaluate`
- **Público:** Sí
- **Request Body:**
  ```json
  {
    "answers": {
      "p1": "Hallo",
      "p2": "Guten Morgen",
      "p3": "der Tisch"
    }
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "recommendedLevel": "A1",
    "score": 3,
    "total": 5,
    "analysis": "Se recomienda comenzar en el nivel A1 para reforzar las bases."
  }
  ```

---

## 6. Mascota y Accesorios (`/api/mascot`)

### 6.1 Obtener Estado de la Mascota y Catálogo de Accesorios
- **Método:** `GET`
- **Ruta:** `/api/mascot`
- **Público:** No (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "unlockedAccessoryIds": ["scarf", "glasses"],
    "selectedAccessories": {
      "neck": "scarf",
      "eyes": "glasses"
    },
    "newlyUnlockedAccessoryIds": [],
    "availableAccessories": [
      { "id": "scarf", "slot": "neck", "label": "Pañuelo", "emoji": "🧣", "streakDays": 1 },
      { "id": "glasses", "slot": "eyes", "label": "Gafas", "emoji": "🕶️", "streakDays": 3 },
      { "id": "cap", "slot": "head", "label": "Gorro", "emoji": "🧢", "streakDays": 7 },
      { "id": "shirt", "slot": "shirt", "label": "Camiseta", "emoji": "👕", "streakDays": 14 },
      { "id": "backpack", "slot": "back", "label": "Mochila", "emoji": "🎒", "streakDays": 30 },
      { "id": "star", "slot": "charm", "label": "Estrella", "emoji": "⭐", "streakDays": 60 }
    ]
  }
  ```

### 6.2 Equipar / Desequipar Accesorio
- **Método:** `PUT`
- **Ruta:** `/api/mascot/accessories`
- **Público:** No (Bearer Token)
- **Request Body:**
  ```json
  {
    "slot": "neck",
    "accessoryId": "scarf"
  }
  ```
  *(Para desequipar, enviar `"accessoryId": null`)*
- **Response (200 OK):**
  ```json
  {
    "mascot": {
      "unlockedAccessoryIds": ["scarf", "glasses"],
      "selectedAccessories": {
        "neck": "scarf"
      },
      "newlyUnlockedAccessoryIds": []
    }
  }
  ```

### 6.3 Marcar Notificación de Recompensa como Vista
- **Método:** `POST`
- **Ruta:** `/api/mascot/dismiss-reward`
- **Público:** No (Bearer Token)
- **Response (200 OK):** Limpia `newlyUnlockedAccessoryIds` una vez que el usuario cierra la alerta visual en el frontend.
  ```json
  {
    "success": true
  }
  ```

# Arquitectura del Frontend - Sprache

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     React Native App                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  StartScreen │  │LoginScreen   │  │RegisterScreen│       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   MainTabs (Bottom Navigation)        │   │
│  ├─────────────┬─────────────┬─────────────┬────────────┤   │
│  │ HomeScreen  │Activities  │Progress     │Profile     │   │
│  └─────────────┴─────────────┴─────────────┴────────────┘   │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ LessonScreen │  │ReadingScreen │  │TheoryScreen  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐                                            │
│  │Pronunciation │                                            │
│  │   Screen     │                                            │
│  └──────────────┘                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Context Layer                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              AppProvider (AppContext)                 │   │
│  │  - user state                                         │   │
│  │  - authentication methods                             │   │
│  │  - progress tracking                                  │   │
│  │  - lesson progress                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        MotionPreferencesProvider                      │   │
│  │  - reduce motion preference                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Services Layer (Mock)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │  mockAuthService     │  │ mockProgressService  │        │
│  │  - register          │  │  - deriveProgress    │        │
│  │  - login             │  │  - recordActivity    │        │
│  │  - restoreSession    │  │  - getWeeklyActivity │        │
│  │  - logout            │  │  - resetProgress     │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │  mockLessonService   │  │ mockLearningPathSvc  │        │
│  │  - getLessonBy...    │  │  - getLearningPath   │        │
│  │  - getSpacedReview   │  │  - LEARNING_LEVELS   │        │
│  │  - getFailedReview   │  └──────────────────────┘        │
│  └──────────────────────┘                                 │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │  mockAchievementSvc  │  │ mockSpacedRepetition  │        │
│  │  - getExperience     │  │  - calculateNext...  │        │
│  │  - getAchievements   │  │  - getDueWords       │        │
│  │  - getWeeklyChallenges│ └──────────────────────┘        │
│  └──────────────────────┘                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                 │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Activities.js│  │  lessons.js  │  │readingLessons│       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │theoryModules │  │   user.js    │  │ AsyncStorage │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Flujo de Navegación

### Autenticación
```
StartScreen → RegisterScreen → MainTabs
    ↓                ↓
LoginScreen ────────┘
```

### Navegación Principal
```
MainTabs (Bottom Navigation)
├── HomeScreen
│   └── LessonScreen
├── ActivitiesScreen
│   └── LessonScreen
├── ProgressScreen
│   ├── ReadingScreen
│   ├── TheoryScreen
│   └── PronunciationScreen
└── ProfileScreen
```

### Flujo de Lecciones
```
LessonScreen
├── Multiple Choice
├── Dictation
├── Fill Blanks
├── Word Order
├── Write Response
└── Listening Comprehension
    ↓
SessionSummary → Volver a la pantalla anterior
```

## Componentes Principales

### UI Components
- **AppButton**: Botón reutilizable con estados
- **AnswerOption**: Opción de respuesta en lecciones
- **AudioButton**: Botón para reproducir audio
- **FeedbackMessage**: Mensaje de feedback visual
- **HintButton**: Botón para mostrar pistas
- **LessonHeader**: Cabecera de lección
- **LessonProgress**: Barra de progreso
- **QuestionCard**: Tarjeta de pregunta
- **SessionSummary**: Resumen de sesión completada

### Data Components
- **WelcomeHeader**: Cabecera de bienvenida en Home
- **StreakBadge**: Badge de racha de días
- **DailyGoalCard**: Tarjeta de meta diaria
- **RecommendationCard**: Tarjeta de recomendación
- **LevelProgressCard**: Tarjeta de progreso por nivel
- **WeeklyActivity**: Gráfico de actividad semanal
- **LearningPath**: Visualización de ruta de aprendizaje

## Estado Global

### AppContext
```javascript
{
  user: {
    name, email, level, motivation, dailyGoal,
    todayMinutes, studiedMinutes, learnedWords, streak,
    sessions, wordProgress, failedWords,
    learningProgress, activeLessonProgress,
    preferences
  },
  isLoading: boolean,
  // Métodos
  saveLessonProgress,
  saveWordAttempt,
  saveLearningProgress,
  completeActivity,
  registerUser,
  loginUser,
  editProfile,
  resetUserProgress,
  logoutUser
}
```

## Almacenamiento Local

### AsyncStorage Keys
- `@sprache/demo/accounts-v1`: Cuentas de usuario
- `@sprache/demo/session-v1`: Sesión activa

### Estructura de Usuario
```javascript
{
  name: string,
  email: string,
  level: string,
  motivation: string,
  dailyGoal: number,
  placementAssessment: object | null,
  sessions: Array<{
    activityId, completedAt, durationSeconds,
    correctAnswers, totalQuestions, learnedWords,
    wordResults
  }>,
  wordProgress: {
    [term]: {
      term, translation, correctAnswers, mistakes,
      hints, lastPracticedAt, reviewStreak,
      intervalMinutes, nextReviewAt
    }
  },
  failedWords: {
    [id]: { term, translation, question, mistakes, lastFailedAt }
  },
  learningProgress: {
    readings: { [id]: { correctQuestionIds, completed } },
    theory: { [id]: { completedLessonIds, correctExerciseIds } },
    pronunciation: { [id]: { playCount } }
  },
  activeLessonProgress: {
    activityId, questionIndex, selectedAnswer, answered,
    submittedAnswers, hintUsage, textInputValue, orderedWords,
    elapsedActiveMs
  },
  preferences: {
    notificationsEnabled, hapticsEnabled
  }
}
```

## Integración Futura con Backend Ktor

Cuando el backend en Ktor esté implementado, los servicios mock serán reemplazados por:

1. **apiService.js**: Cliente HTTP para llamadas a la API
2. Endpoints REST a implementar en Ktor:
   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `GET /api/user/profile`
   - `GET /api/activities`
   - `GET /api/lessons/:id`
   - `POST /api/progress/activity`
   - `GET /api/progress/stats`
   - Y más...

La estructura del frontend permanecerá igual, solo cambiará la implementación de los servicios.

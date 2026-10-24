# Sprache - Proyecto de Aprendizaje de Alemán

Proyecto para aprender alemán desde el nivel A1 hasta B2, con arquitectura desacoplada entre **Frontend (React Native / Expo)** y **Backend (Ktor con Kotlin)**.

---

## 📁 Estructura del Repositorio

```
Sprache/
├── Sprache/                  # Frontend en React Native / Expo
│   ├── assets/              # Iconos, fuentes y recursos estáticos
│   ├── components/          # Componentes visuales organizados por dominio
│   ├── context/             # Estado global de React (AppContext, MotionPreferences)
│   ├── data/                # Datos y semillas locales para pruebas offline del frontend
│   │   ├── Activities.js    # Catálogo de actividades
│   │   ├── lessons.js       # Lecciones de vocabulario, gramática y retos
│   │   ├── readingLessons.js# Lecturas graduadas por nivel
│   │   ├── theoryModules.js # Módulos de gramática y teoría
│   │   └── user.js          # Estructura del usuario inicial
│   ├── screens/             # Pantallas de la aplicación (Home, Lesson, Reading, etc.)
│   ├── services/            # Capa de servicios (datos locales + cliente HTTP apiService)
│   ├── tests/               # Suite de tests unitarios (100% pasando)
│   ├── App.js               # Entry point de React Native
│   ├── theme.js             # Sistema de diseño, colores y tipografía
│   └── README.md            # Documentación técnica del frontend
│
└── backend-to-ktor/         # Kit temporal de migración hacia Ktor (Kotlin)
    ├── api-specification.md # Especificación completa de rutas, endpoints y contratos REST
    ├── ktor-guide.md        # Guía de implementación Ktor 3.x, DTOs en Kotlin y Exposed ORM
    ├── data/                # Semillas de base de datos
    │   ├── json/            # Archivos JSON listos para importar con kotlinx.serialization
    │   └── *.js             # Archivos JavaScript originales de referencia
    ├── services/            # Algoritmos de negocio de referencia (a portar a Kotlin)
    └── README.md            # Índice del kit de migración
```

---

## 🚀 Frontend: Ejecución y Pruebas Locales

El frontend está completamente limpio y desacoplado, configurado para funcionar **autónomamente con datos locales y almacenamiento en dispositivo (`AsyncStorage`)** sin necesidad de levantar el servidor Ktor.

### 1. Iniciar la aplicación
```bash
cd Sprache
npm install
npm start
```

Para probar en un entorno específico:
```bash
npm run web      # Navegador web
npm run android  # Emulador o dispositivo Android
npm run ios      # Simulador o dispositivo iOS
```

### 2. Ejecutar los tests
```bash
npm test
```
*La suite completa contiene 30 tests de flujos críticos, cálculos de progreso, sistema de diseño y accesibilidad WCAG.*

---

## 🔌 Conexión con el Backend Ktor

Cuando el backend en Ktor esté desarrollado y en ejecución (por ejemplo en `http://localhost:8080`):
1. Configura la variable de entorno en `Sprache/`:
   ```bash
   export EXPO_PUBLIC_API_URL=http://localhost:8080
   ```
2. El cliente `Sprache/services/apiService.js` enrutará las peticiones HTTP directamente a tu backend en Ktor según los contratos de `backend-to-ktor/api-specification.md`.

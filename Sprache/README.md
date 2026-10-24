# Sprache - App de Aprendizaje de Alemán

Aplicación móvil desarrollada en React Native para aprender alemán desde el nivel A1 hasta B2.

## 📋 Requisitos

- Node.js (v18 o superior)
- npm o yarn
- Expo CLI
- Un dispositivo Android/iOS o emulador

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd Sprache/Sprache
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

4. Para ejecutar en un dispositivo específico:
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📱 Características

- **Niveles de aprendizaje**: A1, A2, B1, B2
- **Lecciones interactivas**: Vocabulario, gramática, lectura, escritura
- **Sistema de repetición espaciada**: Para optimizar el aprendizaje
- **Seguimiento de progreso**: Estadísticas, rachas, logros
- **Lecturas y teoría**: Contenido estructurado por nivel
- **Pronunciación**: Ejercicios de escucha y habla
- **Datos locales**: Funciona completamente offline con AsyncStorage

## 🏗️ Estructura del Proyecto

```
Sprache/
├── assets/              # Imágenes y recursos estáticos
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes genéricos
│   ├── home/           # Componentes de la pantalla principal
│   ├── learning/       # Componentes de lecciones
│   ├── navigation/     # Componentes de navegación
│   └── progress/       # Componentes de progreso
├── context/            # Contextos de React
├── data/               # Datos de la aplicación
│   ├── Activities.js   # Catálogo de actividades
│   ├── lessons.js      # Lecciones y preguntas
│   ├── readingLessons.js
│   ├── theoryModules.js
│   └── user.js         # Estructura de usuario
├── screens/            # Pantallas de la aplicación
├── services/           # Capa de servicios (datos locales + cliente HTTP)
├── tests/              # Tests unitarios
├── App.js              # Componente principal
├── package.json        # Dependencias
└── theme.js            # Configuración de estilos
```

## 🧪 Tests

Para ejecutar los tests:
```bash
npm test
```

## 📝 Arquitectura de Servicios y Pruebas Locales

La aplicación utiliza una capa limpia de servicios en `services/` que actualmente opera de forma 100% autónoma con **datos locales y AsyncStorage**. Esto permite probar la interfaz y flujos sin necesidad de un backend activo.

### Servicios Disponibles:
- `authService.js` - Gestión de sesiones y credenciales locales con AsyncStorage
- `progressService.js` - Cálculo de progreso, racha y estadísticas
- `lessonService.js` - Búsqueda de lecciones y generación de repasos
- `spacedRepetitionService.js` - Algoritmo de repetición espaciada
- `learningPathService.js` - Rutas de aprendizaje por nivel (A1-B2)
- `achievementService.js` - Sistema de logros e insignias
- `germanVoiceService.js` - Síntesis de voz alemana estándar con `expo-speech`
- `hapticFeedback.js` - Retroalimentación táctil con `expo-haptics`
- `apiService.js` - Cliente HTTP preparado para conectar con Ktor (`EXPO_PUBLIC_API_URL`)

### Migración al Backend Ktor
Todo el material de backend (lógica de negocio a portar a Kotlin, semillas en JSON y especificación de endpoints) se encuentra en la carpeta `../backend-to-ktor/`. Una vez que el backend en Ktor esté listo, solo basta con apuntar `EXPO_PUBLIC_API_URL` al servidor.

## 🎨 Tema y Diseño

La aplicación utiliza un sistema de diseño consistente definido en `theme.js` con:
- Colores: Dorado (#D4AF37), blanco, negro, gris
- Tipografía: Sistema nativo
- Espaciado: Definido en variables
- Animaciones: Desactivables para accesibilidad

## 🔒 Datos del Usuario

Todos los datos del usuario se almacenan localmente en AsyncStorage:
- Información de cuenta (email, contraseña hasheada)
- Progreso de lecciones
- Estadísticas de aprendizaje
- Palabras aprendidas
- Configuración de preferencias

## 📄 Licencia

Ver archivo LICENSE para más detalles.

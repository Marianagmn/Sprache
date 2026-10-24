# Diseño UX/UI y Navegación - Sprache

## Principios de Diseño

### 1. Simplicidad y Claridad
- Interfaz minimalista con elementos esenciales
- Tipografía legible con buen contraste
- Iconos intuitivos para acciones comunes
- Feedback visual inmediato para todas las interacciones

### 2. Accesibilidad
- Soporte para reducir animaciones (MotionPreferencesContext)
- Contraste WCAG AA cumplido en todos los textos
- Tamaño de toque mínimo de 44px para elementos interactivos
- Soporte para screen readers con etiquetas accessibilityRole

### 3. Consistencia
- Sistema de diseño unificado (colors, spacing, typography)
- Patrones de navegación predecibles
- Estados visuales consistentes (loading, error, success)
- Terminología uniforme en toda la app

### 4. Gamificación
- Sistema de XP y niveles
- Insignias y logros
- Racha de días (streak)
- Retos semanales
- Celebraciones visuales al completar actividades

## Sistema de Colores

### Paleta Principal
```javascript
colors = {
  gold: '#D4AF37',        // Color primario (dorado)
  goldSoft: '#F5E6C3',    // Fondo dorado suave
  background: '#FFFFFF',  // Fondo principal
  surface: '#F9F9F9',     // Fondo de tarjetas
  text: '#1A1A1A',       // Texto principal
  muted: '#666666',      // Texto secundario
  border: '#E0E0E0',     // Bordes
  black: '#000000',      // Negro puro

  // Estados
  success: '#4CAF50',
  successSoft: '#E8F5E9',
  error: '#F44336',
  errorSoft: '#FFEBEE',
  redText: '#C62828',
  redSoft: '#FFEBEE',
}
```

### Uso de Colores
- **Dorado**: Acciones principales, logros, elementos destacados
- **Blanco**: Fondo principal de pantallas
- **Gris claro**: Fondo de tarjetas y secciones
- **Negro**: Texto principal
- **Gris medio**: Texto secundario y placeholders
- **Verde**: Estados de éxito, confirmaciones
- **Rojo**: Errores, acciones destructivas

## Tipografía

```javascript
typography = {
  title: 28,      // Títulos de pantalla
  subtitle: 20,   // Subtítulos de sección
  body: 16,       // Texto del cuerpo
  small: 14,      // Texto pequeño
  xsmall: 12,     // Texto muy pequeño
  semibold: '600',
}
```

### Uso de Tipografía
- **Title (28px)**: Nombres de pantalla, encabezados principales
- **Subtitle (20px)**: Secciones dentro de pantallas
- **Body (16px)**: Texto de contenido, descripciones
- **Small (14px)**: Información secundaria, metadatos
- **XSmall (12px)**: Notas al pie, timestamps

## Espaciado

```javascript
spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

### Uso de Espaciado
- **xs (4px)**: Separación entre elementos muy cercanos
- **sm (8px)**: Separación entre elementos relacionados
- **md (16px)**: Separación estándar entre elementos
- **lg (24px)**: Separación entre secciones
- **xl (32px)**: Separación entre bloques grandes
- **xxl (48px)**: Separación entre pantallas completas

## Componentes UI

### Botones (AppButton)
- **Estado normal**: Fondo dorado, texto blanco
- **Estado presionado**: Dorado más oscuro
- **Estado deshabilitado**: Gris, opacidad reducida
- **Estado loading**: Spinner animado
- Altura mínima: 48px
- Radio de borde: 12px

### Tarjetas
- Fondo: colors.surface
- Borde: 1px solid colors.border
- Radio de borde: 16px
- Padding: spacing.lg (24px)
- Sombra sutil en plataformas que lo soportan

### Inputs de Texto
- Fondo: colors.background
- Borde: 1px solid colors.border
- Altura: 48px
- Padding horizontal: spacing.md (16px)
- Estado foco: Borde dorado
- Estado error: Borde rojo

### Opciones de Respuesta (AnswerOption)
- **Estado normal**: Fondo gris claro, texto negro
- **Estado seleccionado**: Borde dorado
- **Estado correcto**: Fondo verde suave, borde verde
- **Estado incorrecto**: Fondo rojo suave, borde rojo
- Radio de borde: 8px
- Padding: spacing.md (16px)

## Navegación

### Bottom Navigation (MainTabs)
- 4 pestañas: Home, Actividades, Progreso, Perfil
- Iconos: home-outline, book-open-outline, chart-bar-outline, person-outline
- Altura: 60px
- Color activo: colors.gold
- Color inactivo: colors.muted

### Stack Navigation
- Sin header visible (headerShown: false)
- Animaciones: fade por defecto
- Animación deshabilitada si reduceMotion está activo
- Transiciones suaves de 180ms

### Navegación Entre Pantallas

**Flujo de Autenticación:**
```
StartScreen → RegisterScreen → MainTabs
    ↓
LoginScreen ────────┘
```

**Flujo de Lecciones:**
```
HomeScreen/ActivitiesScreen → LessonScreen
                                ↓
                        SessionSummary
                                ↓
                        Volver a origen
```

**Flujo de Contenido Educativo:**
```
HomeScreen → ReadingScreen → (Lesson de lectura)
            → TheoryScreen → (Lesson de teoría)
            → PronunciationScreen → (Reproductor de audio)
```

## Estados de Interacción

### Loading
- Spinner con texto descriptivo
- No bloquea interacción crítica
- Feedback de progreso cuando es posible

### Error
- Mensaje claro y específico
- Acción de reintentar cuando aplica
- Color rojo suave para no ser alarmante
- Icono de error cuando es apropiado

### Success
- Celebración visual (confetti, animación)
- Mensaje positivo motivador
- Color verde suave
- Icono de checkmark

### Empty States
- Ilustración o icono descriptivo
- Mensaje explicativo
- Acción sugerida cuando aplica
- Tono amigable y motivador

## Formularios y Validación

### Validación Visual
- **Campo requerido vacío**: Borde rojo, mensaje de error
- **Email inválido**: Borde rojo, mensaje específico
- **Contraseña corta**: Borde rojo, requisito mostrado
- **Formulario válido**: Botón habilitado

### Mensajes de Error
- Específicos al tipo de error
- Lenguaje amigable y constructivo
- Sugieren acción correctiva
- No técnicos para el usuario final

## Feedback Háptico

- Opcional según preferencias del usuario
- **Touch ligero**: HapticFeedbackStyle.Light
- **Touch medio**: HapticFeedbackStyle.Medium
- **Éxito**: NotificationFeedbackType.Success
- **Error**: NotificationFeedbackType.Error
- **Advertencia**: NotificationFeedbackType.Warning

## Animaciones

### Principios
- Duración: 180ms por defecto
- Curva: ease-in-out suave
- Respetan preferencia de reducir movimiento
- No bloquean interacción

### Tipos de Animación
- **Fade**: Transiciones entre pantallas
- **Slide**: Elementos que entran/salen
- **Scale**: Feedback de toque
- **Pulse**: Elementos que requieren atención
- **Shimmer**: Skeleton loading

## Accesibilidad

### Soporte de Screen Reader
- accessibilityRole en elementos interactivos
- accessibilityLabel descriptivos
- accessibilityHint cuando es necesario
- accessibilityValue para valores dinámicos

### Reducción de Movimiento
- MotionPreferencesContext detecta preferencia
- Animaciones deshabilitadas cuando reduceMotion = true
- Transiciones instantáneas (animation: 'none')

### Contraste
- WCAG AA (4.5:1) para texto normal
- WCAG AA (3:1) para texto grande
- Verificado en colors.redText sobre colors.redSoft
- Verificado en colors.muted sobre colors.background

## Diagrama de Navegación Completo

```
┌─────────────────────────────────────────────────────────┐
│                    Navigation Graph                     │
└─────────────────────────────────────────────────────────┘

App (SafeAreaProvider)
 │
 └─ NavigationContainer
     │
     └─ Stack.Navigator
         │
         ├─ [Sin usuario]
         │   ├─ StartScreen
         │   │   └─ → RegisterScreen
         │   │   └─ → LoginScreen
         │   │       └─ → MainTabs (si login exitoso)
         │   │
         │   ├─ RegisterScreen
         │   │   └─ → MainTabs (si registro exitoso)
         │   │
         │   └─ LoginScreen
         │       └─ → MainTabs (si login exitoso)
         │
         └─ [Con usuario]
             └─ MainTabs (BottomTabs)
                 │
                 ├─ HomeScreen
                 │   ├─ → LessonScreen
                 │   │   └─ → SessionSummary
                 │   │       └─ → Volver a HomeScreen
                 │   │
                 │   ├─ → ReadingScreen
                 │   │   └─ → Lesson de lectura
                 │   │
                 │   ├─ → TheoryScreen
                 │   │   └─ → Lesson de teoría
                 │   │
                 │   └─ → PronunciationScreen
                 │
                 ├─ ActivitiesScreen
                 │   └─ → LessonScreen
                 │       └─ → SessionSummary
                 │           └─ → Volver a ActivitiesScreen
                 │
                 ├─ ProgressScreen
                 │   ├─ → ReadingScreen
                 │   ├─ → TheoryScreen
                 │   └─ → PronunciationScreen
                 │
                 └─ ProfileScreen
                     └─ → Logout → StartScreen
```

## Puntos de Touch y Interacción

### Elementos Interactivos
- **Botones**: Mínimo 44x44px
- **Iconos**: Mínimo 44x44px (incluyendo padding)
- **Tarjetas**: Touch en toda el área
- **Lista items**: Mínimo 48px de altura

### Gestos Soportados
- Tap: Selección, navegación
- Long press: Menú contextual (donde aplica)
- Swipe: Navegación back (gesture del sistema)

## Consideraciones Multi-plataforma

### iOS
- SafeAreaView para notch
- Navigation del sistema respetada
- Tipografía SF Pro cuando disponible
- Haptics nativos

### Android
- Edge-to-edge con padding del sistema
- Back button del sistema soportado
- Tipografía Roboto cuando disponible
- Ripple effects nativos

### Web
- Responsive layout
- Soporte de mouse y keyboard
- Media queries para tamaño de pantalla
- Fallbacks para features móviles

# Diagnóstico de auditoría del frontend Sprache

**Fecha:** 24 de octubre de 2026
**Alcance:** código fuente, recursos, configuración, pruebas y documentación de `Sprache/`, incluido `Informe_Frontend_Sprache_APA.docx`.
**Propósito:** registrar el estado que se puede demostrar en el código y las pruebas disponibles; no se modificó el comportamiento de la aplicación.

## Resumen ejecutivo

- La raíz exacta del frontend es `Sprache/`. `package.json` declara `index.js` como entrada y este registra `App.js` con Expo.
- La aplicación usa una navegación de pila condicional para acceso/usuario autenticado y cuatro pestañas principales. Hay once archivos de pantalla; el resumen de sesión es un componente dentro de la pantalla de lección, no una ruta separada.
- El frontend cuenta con almacenamiento local, servicios de aprendizaje y progreso, recursos estáticos y dos archivos de pruebas Node. `npm test`, ejecutado desde la raíz del frontend, finalizó con **32 pruebas aprobadas y 0 fallidas**.
- El informe Word contiene cinco tablas, 48 marcadores de posición relacionados con imágenes o evidencias y **ninguna imagen incrustada**. Sus diagramas son caracteres de texto, no imágenes.
- Hay discrepancias importantes entre el informe y la configuración/código real en la paleta, el inventario de pantallas, el diagrama de navegación y las instrucciones de instalación.
- La ejecución visual en dispositivos/emuladores, las capturas reales y la correspondencia de cada flujo con la interfaz siguen pendientes de verificación. Las pruebas automatizadas no son pruebas de interfaz.

## 1. Raíz, punto de entrada y configuración

| Elemento | Evidencia | Resultado |
| --- | --- | --- |
| Raíz frontend | `Sprache/package.json`, `Sprache/App.js` | Confirmada. |
| Entrada declarada | `package.json`: `"main": "index.js"` | Confirmada. |
| Registro Expo | `index.js`: importa `App` y llama `registerRootComponent(App)` | Confirmado. |
| Configuración Expo | `app.json` | Configura nombre/slug, iconos, splash, orientación, plugins y web. |
| Sistema visual | `theme.js` y `DESIGN_SYSTEM.md` | Definen colores, tipografía, espaciado y guía de marca. |
| Gestor y bloqueo de dependencias | `package.json`, `package-lock.json` | npm y archivo de bloqueo presentes. |
| Scripts | `package.json` | `start`, `android`, `ios`, `web`, `test`; no declara scripts `build` ni `lint`. |

Dependencias declaradas directamente: Expo, React, React Native y React Native Web; React Navigation (native, native-stack y bottom-tabs); AsyncStorage; Expo Crypto, Font, Haptics, Speech, Splash Screen y Status Bar; Safe Area Context e Ionicons mediante Expo Vector Icons. Las dependencias de desarrollo declaradas son Jest y Jest Expo. El script de pruebas realmente configurado es `node --test tests/*.test.mjs`; no existe un script Jest en el manifiesto.

`package.json` no declara un campo `engines` para fijar una versión de Node. La versión efectiva de Node/Expo recomendada no se certificó con una instalación limpia ni con el inicio de Expo.

## 2. Inventario técnico

| Área | Inventario observado |
| --- | --- |
| Pantallas (`screens/`) | `StartScreen.js`, `RegisterScreen.js`, `LoginScreen.js`, `HomeScreen.js`, `ActivitiesScreen.js`, `ProgressScreen.js`, `ProfileScreen.js`, `LessonScreen.js`, `ReadingScreen.js`, `TheoryScreen.js`, `PronunciationScreen.js`. |
| Componentes | `components/activities/`, `common/`, `home/`, `learning/`, `navigation/`, `profile/` y `progress/`. Incluyen controles comunes, tarjetas, filtros/listas, ejercicios, navegación, estadísticas y personalización de mascota. |
| Resumen de sesión | `components/learning/SessionSummary.js`; componente visual presentado por `LessonScreen.js` tras completar la lección. |
| Contextos | `context/AppContext.js` para usuario, progreso y operaciones; `context/MotionPreferencesContext.js` para preferencia de movimiento reducido. |
| Servicios | `achievementService.js`, `activityService.js`, `apiService.js`, `authService.js`, `authServiceCore.js`, `germanVoiceService.js`, `hapticFeedback.js`, `learningPathService.js`, `learningProgressService.js`, `lessonProgressService.js`, `lessonService.js`, `mascotRewardsService.js`, `placementAssessmentService.js`, `profileService.js`, `progressService.js`, `spacedRepetitionService.js`. |
| Datos locales | `data/Activities.js`, `lessons.js`, `readingLessons.js`, `theoryModules.js`, `user.js`. |
| Persistencia | `authService.js` configura `authServiceCore.js` con AsyncStorage y Expo Crypto. El estado persistido incluye perfil, sesiones, preferencias y progreso local, según los servicios y las pruebas. |
| Recursos | `assets/` incluye iconos de plataforma, favicon y splash; `imagenes/logo.jpeg` contiene el logo fuente descrito por el sistema visual. |
| Pruebas | `tests/critical-flows.test.mjs` y `tests/progress.test.mjs`. Son pruebas Node de lógica/servicios y datos, no pruebas de renderizado o navegación visual. |
| Documentación del frontend | `DESIGN_SYSTEM.md`, `AGENTS.md`, `CLAUDE.md` y el informe Word. No se encontró un `README.md` dentro de `Sprache/`. |

Los directorios `node_modules/`, `.expo/` y `dist/` son dependencias instaladas, caché o salida generada; se excluyeron del inventario funcional. No deben incluirse como entregables.

## 3. Pantallas y navegación verificadas en el código

### Rutas registradas

`App.js` registra estas rutas de pila, con un grupo distinto según exista usuario:

| Estado | Nombre de ruta | Pantalla |
| --- | --- | --- |
| Sin sesión | `Start` | `StartScreen` |
| Sin sesión | `Register` | `RegisterScreen` |
| Sin sesión | `Login` | `LoginScreen` |
| Con sesión | `MainApp` | `MainTabs` |
| Con sesión | `Lesson` | `LessonScreen` |
| Con sesión | `Lecturas` | `ReadingScreen` |
| Con sesión | `Teoría` | `TheoryScreen` |
| Con sesión | `Pronunciación` | `PronunciationScreen` |

`MainTabs.js` registra las cuatro pestañas: `Home` (etiqueta Inicio), `Actividades`, `Progreso` y `Perfil`.

### Relaciones de navegación comprobables

- `StartScreen` ofrece navegación a `Register` y `Login`; `LoginScreen` ofrece acceso a `Register`.
- `HomeScreen` abre `Lesson` y las rutas `Lecturas`, `Teoría` y `Pronunciación`.
- `ActivitiesScreen` y `ProgressScreen` abren `Lesson`.
- Al finalizar la última pregunta, `LessonScreen` guarda la actividad, cambia a su estado de finalización y renderiza `SessionSummary`. El botón del resumen usa `navigation.goBack()`.
- La reanudación de lección usa los parámetros de `LessonScreen` y el progreso local. La finalización no añade una ruta distinta a la pila.
- `ProfileScreen` y el comportamiento de cierre de sesión están presentes en la interfaz/contexto; no se verificó su ejecución en un dispositivo.

### SessionSummary: respuesta específica

`SessionSummary` **existe** en `components/learning/SessionSummary.js`. **No está registrada como pantalla/ruta** en `App.js`. Se muestra dentro de `LessonScreen` cuando `finished` es verdadero. El código de finalización guarda la sesión mediante `completeActivity`, calcula el resumen y después presenta ese componente. El flujo está respaldado por pruebas de servicio sobre finalización y resumen; no se ejecutó una prueba visual de extremo a extremo en un dispositivo.

## 4. Matriz de estado de funcionalidades

“Implementada” indica código existente. “Verificada” se reserva para el comportamiento cubierto por pruebas automatizadas ejecutadas; no equivale a certificación de UX, accesibilidad o funcionamiento en un dispositivo.

| Funcionalidad | Estado sustentado | Evidencia / límite |
| --- | --- | --- |
| Registro, login, logout y restauración de sesión local | Implementada; lógica automatizada verificada | `authServiceCore.js`, `authService.js`, `AppContext.js`, pruebas de flujos críticos. |
| Persistencia local del perfil, preferencias y avance | Implementada; casos seleccionados verificados | AsyncStorage en el adaptador de autenticación; pruebas con almacenamiento en memoria simulado. No prueban el dispositivo. |
| Catálogo de actividades y lecciones | Implementada; catálogo y relaciones probados | Datos locales y `activityService.js`/`lessonService.js`; las pruebas comprueban IDs y disponibilidad. |
| Preguntas de selección, dictado, completar, ordenar, respuesta escrita y escucha | Implementadas en el renderizado de `LessonScreen` | Hay componentes para cada tipo. La cobertura visual de cada variante queda pendiente. |
| Guardado de resultados, duración, aciertos y progreso por palabra | Implementado; lógica automatizada verificada | `lessonProgressService.js`, `progressService.js` y pruebas de finalización. |
| Resumen de sesión, XP y avisos de logros | Implementado dentro de `LessonScreen`; lógica del resumen probada | `SessionSummary.js`, `achievementService.js`; navegación visual de retorno pendiente de prueba en dispositivo. |
| Rachas, estadísticas, ruta de aprendizaje, retos y logros | Implementados en servicios/componentes; reglas seleccionadas verificadas | Servicios de progreso, ruta, logros y componentes en `progress/`. |
| Repetición espaciada y repaso de palabras falladas | Implementados; reglas principales probadas | `spacedRepetitionService.js`, `lessonService.js`, `lessonProgressService.js`. |
| Lecturas y teoría por nivel | Implementadas; distribución/contenido cubierta por pruebas | Datos locales y pantallas correspondientes. No se verificó el recorrido visual completo. |
| Reproducción de voz alemana | Integración Expo Speech presente; disponibilidad real pendiente | `germanVoiceService.js`, botones y `PronunciationScreen.js`; depende de las voces instaladas en el dispositivo. |
| Retroalimentación háptica | Integración Expo Haptics presente; respuesta en dispositivo pendiente | `hapticFeedback.js`; depende de preferencia y dispositivo. |
| Preferencia de movimiento reducido | Contexto y uso en animación del resumen presentes | No se hizo auditoría completa de todas las animaciones ni prueba con lector de pantalla. |
| Cliente HTTP configurable | Cliente en `apiService.js`; integración con flujos de app no evidenciada | Lee `EXPO_PUBLIC_API_URL` y expone métodos GET/POST/PUT. La búsqueda en el frontend no encontró consumidores fuera del propio servicio. No se probó una API remota. |
| Notificaciones | No verificadas como funcionalidad entregada | Hay un valor de preferencia en el modelo de usuario; no se encontró dependencia Expo Notifications ni un flujo de notificaciones confirmado. |
| Requisitos visuales de accesibilidad y tamaños táctiles | Especificados en el informe, cumplimiento pendiente | Los tests verifican contraste de algunos colores, pero no prueban todos los criterios de accesibilidad del documento. |
| Ejecución nativa/web de las pantallas | Pendiente de verificación | No se inició Expo ni se usó emulador/navegador durante esta auditoría. |

### Verificación automatizada ejecutada

Comando: `npm --prefix Sprache test` (equivalente a ejecutar `npm test` con el directorio de trabajo en `Sprache/`).

Resultado: **32/32 aprobadas**. Las pruebas cubren persistencia con almacenamiento simulado, finalización de sesión, catálogo y lecciones, distribución de contenidos, progreso de lectura/teoría, mascota, contraste de colores, revisión espaciada, ruta, retos, logros y resumen. Node emitió advertencias no bloqueantes de `MODULE_TYPELESS_PACKAGE_JSON` para módulos ES sin `"type": "module"` en `package.json`.

No hay pruebas de interfaz en los dos archivos actuales; el resultado anterior no acredita que Expo arranque ni que las pantallas se vean o naveguen correctamente en plataformas reales.

## 5. Estructura y discrepancias del informe Word

### Apartados y tablas

El documento contiene portada y estos apartados principales:

1. Descripción general del proyecto.
2. Problemática o necesidad identificada.
3. Objetivos: general y específicos.
4. Requerimientos funcionales y no funcionales del frontend.
5. Inventario de pantallas de la aplicación.
6. Wireframes de todas las pantallas.
7. Mockups de todas las pantallas.
8. Diseño UX/UI: principios, paleta, tipografía/espaciado, componentes/estados, accesibilidad/movimiento y navegación.
9. Diagrama de navegación.
10. Diagrama de arquitectura inicial del frontend.
11. Estructura de carpetas del proyecto y servicios.
12. Descripción de la implementación inicial en React Native.
13. Evidencias de ejecución de las pantallas desarrolladas.
14. Instrucciones para instalar y ejecutar el frontend: requisitos, instalación, inicio, pruebas, API futura y solución de problemas.
15. Conclusiones.

Tiene cinco tablas:

1. Requisitos funcionales: RF-01 a RF-28.
2. Requisitos no funcionales: RNF-01 a RNF-18.
3. Inventario propuesto de doce pantallas.
4. Tokens de paleta visual.
5. Servicios y responsabilidades documentadas.

El documento no tiene imágenes incrustadas (`word/media/` está vacío). Los apartados de diagramas contienen esquemas de texto y no figuras gráficas.

### Discrepancias comprobadas

| Afirmación o representación del Word | Código/documentación inspeccionados | Corrección o cautela requerida |
| --- | --- | --- |
| `SessionSummary` aparece como una de las doce pantallas y el diagrama la muestra como destino/ruta. | `SessionSummary.js` es un componente usado por `LessonScreen`; no hay ruta `SessionSummary` en `App.js`. | Describirla como estado/componente de `Lesson` y dibujar la relación dentro de esa pantalla. |
| El diagrama ASCII muestra conexiones simplificadas y nombres de rutas como si fueran pantallas equivalentes. | Hay nombres técnicos diferentes entre ruta (`MainApp`) y componente (`MainTabs`); lectura y teoría son rutas con nombres localizados. | Sustituir por diagrama gráfico contrastado con `App.js`, `MainTabs.js` y llamadas reales a navegación. |
| La tabla de paleta indica `gold #D4AF37`, fondo blanco, `text #1A1A1A`, `muted #666666`, y otros valores. | `theme.js` usa `gold #FFCE00`, `background #F4F4F5`, `text/black #000000`, `muted #52525B`, `border #E4E4E7`, `goldSoft #FFF6CC` y otros tokens definidos ahí. | Alinear tabla y mockups con `theme.js` vigente; no copiar valores anteriores. |
| La guía de espaciado da `md=16`, `lg=24`, `xl=32`, `xxl=48`. | `theme.js` define `md=12`, `lg=16`, `xl=24`, `xxl=32`. | Corregir las escalas según el objeto `spacing` real. Los tamaños tipográficos principales sí corresponden a la escala de `theme.js`. |
| El texto atribuye información de Node, scripts y variable API al README. | No existe `README.md` dentro de `Sprache/`. El README ubicado fuera de la raíz frontend no se inspeccionó por la restricción de alcance. | Citar una fuente realmente revisada o verificar por separado la fuente documental permitida antes de conservar esas atribuciones. |
| La instalación presenta el comando `git clone .../Sprachecd Sprachenpm install` en una sola línea. | `package.json` está dentro de `Sprache/`; existe `package-lock.json`. | Separar los comandos en pasos; `npm ci` es la opción reproducible compatible con el lockfile, pero no se ejecutó durante esta auditoría. |
| El informe sugiere Node 18 o superior y dice que se debe confirmar la compatibilidad. | No hay `engines` en `package.json`; Expo declarado es `^58.0.19`. | Mantener la versión de Node como pendiente hasta validar la matriz de compatibilidad vigente y probar la instalación/inicio. |
| El informe presenta una capa API como preparada para uso futuro. | `apiService.js` implementa configuración por `EXPO_PUBLIC_API_URL`, pero no se encontraron consumidores en los demás archivos fuente del frontend. | Distinguir “cliente presente” de “integración de aplicación conectada”. No afirmar llamadas remotas funcionales. |
| Las descripciones generales presentan varias capacidades como parte de la aplicación. | La implementación existe en varios casos, pero las pruebas actuales son de lógica y servicios. | Mantener la distinción entre diseño, código existente y verificación; no usar una prueba unitaria como evidencia de una pantalla ejecutándose. |

El informe incluye explícitamente una advertencia de que los requisitos no demuestran implementación. Esa cautela es apropiada, pero debe conservarse al actualizar objetivos, conclusiones y pies de evidencia.

## 6. Entregables visuales pendientes en el Word

Se contaron 48 marcadores y cero medios incrustados:

- **12 wireframes** pendientes: inicio/bienvenida, registro, inicio de sesión, inicio, actividades, progreso, perfil, lección, resumen de sesión, lecturas, teoría y pronunciación.
- **12 mockups** pendientes para las mismas pantallas.
- **12 capturas de ejecución** pendientes para las mismas pantallas, cada una con su descripción de validación.
- Los dos diagramas (navegación y arquitectura) deben convertirse de texto ASCII a imágenes/figuras reales.

Las capturas deben ser evidencia de la aplicación ejecutada, no imágenes de diseño presentadas como ejecución. La disponibilidad de voz, el flujo de autenticación y la navegación interactiva requieren una plataforma de prueba identificada antes de capturar.

## 7. Reproducibilidad de instalación y comandos

| Instrucción | Evaluación |
| --- | --- |
| Entrar al directorio `Sprache/` | Necesario: ahí están `package.json` y `package-lock.json`. |
| Instalar con `npm install` | Está soportado por el manifiesto; no se repitió para no alterar dependencias ya instaladas. Para instalación basada en el lockfile, usar `npm ci` en una verificación controlada. |
| `npm test` | Reproducido desde `Sprache/`; 32 pruebas aprobadas. Desde la raíz del repositorio sin `--prefix Sprache` falla porque allí no hay `package.json`. |
| `npm start`, `npm run android`, `npm run ios`, `npm run web` | Los scripts están definidos, pero no se ejecutaron. El arranque, Expo Go, dispositivos, emuladores y web quedan pendientes. |
| `EXPO_PUBLIC_API_URL` | Consumida por el cliente HTTP; sin URL configurada no hace llamadas. No se verificó conectividad ni integración desde pantallas. |
| `git clone` del proyecto | El comando en el informe está mal concatenado. La URL/comando de clonación no se validó en esta auditoría. |

No se modificó ni reinstaló ninguna dependencia. Las carpetas instaladas o generadas no son entregables.

## 8. Plan secuencial para los nueve commits posteriores

El cambio de auditoría corresponde al **commit 1 de 10**: `docs(frontend): auditar proyecto e informe técnico`. El trabajo de los commits siguientes debe ejecutarse por fases, revisar cada diff y prueba antes de pasar al próximo, y limitarse al frontend y al Word.

| N.º | Mensaje propuesto | Alcance único |
| --- | --- | --- |
| 2 | `docs(frontend): alinear inventario y requisitos con código` | Corregir inventario de rutas/componentes, estado verificable, referencias a archivos y atribuciones documentales en el Word. |
| 3 | `docs(frontend): añadir diagramas visuales verificados` | Reemplazar diagramas ASCII por imágenes reales de navegación y arquitectura, con rutas y límites demostrados. |
| 4 | `docs(frontend): crear wireframes de acceso` | Generar e insertar wireframes de bienvenida, registro e inicio de sesión. |
| 5 | `docs(frontend): crear wireframes de navegación principal` | Generar e insertar wireframes de inicio, actividades, progreso y perfil. |
| 6 | `docs(frontend): crear wireframes de aprendizaje` | Generar e insertar wireframes de lección, resumen, lecturas, teoría y pronunciación. |
| 7 | `docs(frontend): añadir mockups de acceso y navegación` | Crear e insertar mockups de acceso y de las cuatro pestañas, conforme a `theme.js` y `DESIGN_SYSTEM.md`. |
| 8 | `docs(frontend): añadir mockups de aprendizaje` | Crear e insertar mockups de las pantallas de aprendizaje restantes, sin representar como ruta independiente el resumen. |
| 9 | `docs(frontend): incorporar evidencias reales de ejecución` | Capturar pantallas ejecutadas en una plataforma identificada, describir prueba/resultado y marcar límites cuando no sea posible verificar. |
| 10 | `docs(frontend): cerrar informe APA y validar anexos` | Corregir instalación, referencias y conclusiones; comprobar que no queden marcadores, que las imágenes estén incrustadas y que el Word abra correctamente. |

El plan no autoriza cambios de comportamiento ni afirma que las capturas o los mockups ya existan. Si la ejecución descubre una discrepancia funcional, documentarla y acordar un alcance separado antes de modificar el código.

## 9. Alcance y limitaciones de esta revisión

- No se inició la aplicación ni se usaron dispositivos, emuladores o navegadores. Las afirmaciones de ejecución quedan pendientes.
- No se hizo una instalación limpia ni se comprobó una versión mínima de Node.
- No se auditaron todos los criterios de accesibilidad ni todas las pantallas visualmente.
- No se inspeccionó el contenido de archivos del backend ni se hicieron cambios en él.
- **Incidente de alcance:** una enumeración inicial ejecutada desde la raíz del repositorio devolvió nombres/rutas bajo `backend-to-ktor/`. No se abrió ni se leyó el contenido de esos archivos y no se realizaron modificaciones allí. El resto de búsquedas e inspecciones se restringió a `Sprache/`.
- El Word existente estaba sin seguimiento en Git al comenzar la auditoría. Se conserva intacto en esta fase; el único archivo creado por la auditoría es este diagnóstico Markdown.

## 10. Estado del cambio preparado

Archivo creado: `DIAGNOSTICO_AUDITORIA_FRONTEND.md`.
No se modificó `App.js`, las pantallas, los servicios, dependencias ni `Informe_Frontend_Sprache_APA.docx`.
Verificación ejecutada: `npm --prefix Sprache test` — **32 aprobadas, 0 fallidas**.
El cambio queda preparado para el mensaje `docs(frontend): auditar proyecto e informe técnico`; no se creó un commit durante la auditoría.

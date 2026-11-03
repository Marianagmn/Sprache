# Auditoría técnica inicial — Backend Sprache

## Alcance y conclusión

Auditoría del estado existente en la rama `feature/backend`, creada desde `develop` (`d66b0a8`). El árbol estaba limpio antes de crear la rama.

El repositorio **no contiene un backend Kotlin/Ktor implementado**. `backend-to-ktor/` es un kit de migración: especificación REST, guía de implementación, datos JSON y servicios de referencia escritos en JavaScript. No hay fuentes `.kt`/`.kts`, wrapper ni configuración Gradle, rutas ejecutables, repositorios ni configuración de base de datos. Por tanto no es posible compilar, iniciar ni probar por HTTP un servidor Ktor existente. Construirlo ahora sería crear un backend desde cero, contrario a la restricción del encargo.

La aplicación Expo tiene un cliente HTTP configurable en `Sprache/services/apiService.js`, pero la búsqueda de consumidores no encontró llamadas fuera de ese módulo. La autenticación y los demás flujos continúan usando lógica local/AsyncStorage y datos de `Sprache/data/`. El material JavaScript en `backend-to-ktor/services/` es referencia de negocio, no una API.

## Inventario de contratos documentados

Todos los contratos siguientes están **especificados, pero no implementados ni probados en un servidor**. La integración con el frontend está pendiente en todos los casos.

| Método | Ruta | Funcionalidad | Implementación / integración / pruebas |
|---|---|---|---|
| POST | `/api/auth/register` | Registro de usuario | Solo especificación; sin integración ni prueba HTTP |
| POST | `/api/auth/login` | Inicio de sesión | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/auth/me` | Validar sesión y obtener usuario actual | Solo especificación; sin integración ni prueba HTTP |
| PUT | `/api/auth/profile` | Actualizar perfil | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/activities` | Listar actividades; filtro opcional `level` | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/lessons/{id}` | Obtener lección por ID | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/lessons/by-activity/{activityId}` | Obtener lección por actividad | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/lessons/spaced-review` | Generar repaso espaciado autenticado | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/lessons/failed-words-review` | Generar repaso de palabras falladas autenticado | Solo especificación; sin integración ni prueba HTTP |
| POST | `/api/lessons/{id}/complete` | Completar lección y actualizar progreso | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/readings` | Listar lecturas; filtro opcional `level` | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/theory` | Listar módulos teóricos; filtro opcional `level` | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/progress` | Consultar resumen de progreso autenticado | Solo especificación; sin integración ni prueba HTTP |
| POST | `/api/progress/learning-module` | Registrar progreso de lectura, teoría o pronunciación autenticado | Solo especificación; sin integración ni prueba HTTP |
| POST | `/api/progress/reset` | Reiniciar progreso autenticado | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/achievements` | Listar logros y retos semanales autenticado | Solo especificación; sin integración ni prueba HTTP |
| POST | `/api/placement/evaluate` | Evaluar nivel inicial | Solo especificación; sin integración ni prueba HTTP |
| GET | `/api/mascot` | Consultar estado y catálogo de accesorios autenticado | Solo especificación; sin integración ni prueba HTTP |
| PUT | `/api/mascot/accessories` | Equipar o retirar accesorio autenticado | Solo especificación; sin integración ni prueba HTTP |
| POST | `/api/mascot/dismiss-reward` | Marcar notificación de recompensa como vista autenticado | Solo especificación; sin integración ni prueba HTTP |

## Hallazgos técnicos

### Bloqueantes

1. **No existe código Ktor ni configuración Gradle.** No se pueden verificar versiones, dependencias, paquetes, compilación, ejecución o cobertura de rutas.
2. **No hay servicio REST ejecutable ni persistencia configurada.** La guía propone Ktor, Exposed, HikariCP y PostgreSQL, pero son recomendaciones, no configuración aplicada.
3. **No hay pruebas de backend ni endpoint que someter a solicitudes HTTP.**
4. **El frontend no está conectado al cliente HTTP.** `apiService.js` expone GET/POST/PUT y lee `EXPO_PUBLIC_API_URL`, pero ningún flujo de aplicación lo importa. La app aún opera con servicios locales.

### Contratos por aclarar antes de implementar

- La especificación marca rutas protegidas con un texto incompleto (`No (******`) y la cabecera de autenticación está enmascarada; el esquema de token no queda definido.
- Hay diferencias potenciales entre contratos y modelos locales: el registro documenta `initialLevel`/`dailyGoalMinutes`, mientras el servicio local recibe `level`/`dailyGoal`; también difieren nombres/estructuras de campos de usuario y progreso. Hace falta acordar un mapeo antes de integrar, sin cambiar el contrato por suposición.
- La especificación no detalla validaciones, códigos y cuerpos de error de todos los endpoints ni los tipos completos de varios DTO. El formato de error general es solo un ejemplo.
- Las rutas estáticas de repaso bajo `/api/lessons` deben resolverse antes de cualquier ruta parametrizada `{id}` en el router para evitar ambigüedad.
- No se ha comprobado una URL remota, configuración para dispositivo/emulador ni persistencia entre usuarios.

## Correspondencia con funcionalidades del frontend

Los flujos actuales de autenticación, perfil, catálogo, lecciones, repaso, progreso, logros, evaluación inicial y mascota tienen lógica local en servicios JavaScript. La especificación contempla rutas para esos dominios, pero no hay adaptadores que las llamen ni estado de carga/error remoto en estos servicios. No se conectó ninguna pantalla porque no hay servidor que respalde las llamadas y los contratos de usuario no están alineados.

## Validación de esta etapa

- Backend: no compilable ni ejecutable; faltan fuentes y proyecto Gradle.
- Pruebas HTTP/integración: no ejecutables sin servidor Ktor.
- Frontend: `npm --prefix Sprache test` — **33 pruebas aprobadas, 0 fallidas**.
- Rama de trabajo: `feature/backend`, basada en `develop` (`d66b0a8`).

## Estado

**PARCIALMENTE COMPLETADO — auditoría inicial solamente.** Para continuar con configuración, correcciones e integración hace falta incorporar al repositorio el proyecto Kotlin/Ktor real o confirmar su ubicación/remoto. Esta etapa no modifica el contrato API, servicios de la app ni ramas de otros colaboradores.

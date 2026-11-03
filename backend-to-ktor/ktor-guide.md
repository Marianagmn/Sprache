# Arquitectura implementada del backend Ktor

El backend de esta carpeta ya es una aplicación Kotlin/Ktor ejecutable. Esta guía describe el código real; para compilar y arrancar el servicio, sigue [README.md](./README.md).

## Estructura

```text
backend-to-ktor/
├── build.gradle.kts
├── settings.gradle.kts
├── gradlew
├── src/
│   ├── main/kotlin/com/sprache/
│   │   ├── Application.kt       # Módulo HTTP, rutas, validaciones y lógica de dominio
│   │   ├── ContentCatalog.kt    # Carga y validación de los JSON versionados
│   │   └── UserDatabase.kt      # Persistencia H2/JDBC y actualizaciones transaccionales
│   ├── main/resources/application.conf
│   └── test/kotlin/com/sprache/ApiIntegrationTest.kt
├── data/json/                   # Catálogo compartido con el frontend
└── services/                    # Implementaciones JS locales conservadas como referencia
```

## Componentes

- **Ktor 3 / Netty:** servidor HTTP, enrutamiento, negociación de contenido JSON, CORS y `StatusPages`.
- **Kotlinx Serialization JSON:** los catálogos y el estado de usuario mantienen la estructura JSON usada por la aplicación React Native.
- **H2 / JDBC:** la tabla `users` guarda el correo normalizado, el hash de contraseña y el documento JSON del usuario. La clave primaria evita cuentas duplicadas. Las modificaciones de perfil y progreso usan transacciones.
- **BCrypt:** contraseña con salt individual; no se almacena ni devuelve la contraseña original.
- **JWT:** token Bearer firmado con emisor y expiración configurables. Registro e inicio de sesión son públicos; el resto de rutas de usuario requiere autenticación.
- **Catálogo:** actividades, lecciones, lecturas y teoría se cargan de `data/json/` en el classpath; no se duplican en tablas ni en fuentes Kotlin.

## Enrutamiento y validación

`Application.kt` instala JSON, CORS y respuestas de error uniformes, y registra las familias descritas en [api-specification.md](./api-specification.md). Se validan campos requeridos, formato de correo, longitudes, nivel, meta diaria, duración, respuestas y autorización antes de persistir.

Las respuestas de errores de API incluyen un código estable y un mensaje legible. Errores inesperados se registran en el log del servidor y no exponen detalles internos al cliente.

El endpoint `POST /api/progress/failed-word` amplía la especificación inicial: permite sincronizar los intentos fallidos de lectura y teoría, flujos que no completan una lección tradicional pero alimentan el repaso de palabras. El frontend lo llama solo desde esos módulos; las lecciones normales registran sus intentos al guardar el resultado completo para evitar duplicados.

## Seguridad y configuración de despliegue

- Usa `JWT_SECRET` aleatorio y confidencial; el proceso se niega a arrancar en `KTOR_ENV=production` si no está configurado.
- Usa HTTPS en el despliegue y establece `CORS_ORIGINS` únicamente para los hosts web necesarios.
- Ajusta `SPRACHE_DB_URL`, `SPRACHE_DB_USER` y `SPRACHE_DB_PASSWORD` para el entorno. H2 en archivo es una configuración local compacta, no una recomendación de alta disponibilidad.
- `JWT_TTL_SECONDS` está limitado de 60 segundos a 30 días.

## Límites deliberados

La persistencia de usuario usa documentos JSON en H2 para mantener compatibilidad con los modelos existentes de la app; el contenido educativo se sirve desde archivos versionados. No se añadieron cuentas demo, usuarios semilla ni datos simulados para ocultar fallos de red.

Para despliegues multiinstancia, alta concurrencia o crecimiento del catálogo, el siguiente paso arquitectónico sería PostgreSQL con tablas/migraciones versionadas, pool de conexiones y ejecución JDBC fuera de los hilos de petición. Esos componentes no son necesarios para compilar, ejecutar y probar la API local actual y no se incorporaron como dependencias no usadas.

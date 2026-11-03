# Backend Sprache — Kotlin y Ktor

Backend REST ejecutable de Sprache, desarrollado con Kotlin, Ktor 3, H2 y JWT. Lee el catálogo existente de `data/json/`, conserva cuentas y progreso en una base H2 local y expone las rutas descritas en [api-specification.md](./api-specification.md).

## Requisitos

- JDK 21
- Gradle Wrapper incluido
- Acceso a Maven Central la primera vez para resolver dependencias

## Compilar, probar y ejecutar

Desde la raíz del repositorio:

```bash
./backend-to-ktor/gradlew -p backend-to-ktor test
./backend-to-ktor/gradlew -p backend-to-ktor build
./backend-to-ktor/gradlew -p backend-to-ktor run
```

El servidor escucha en `http://localhost:8080`. Verifica su disponibilidad:

```bash
curl http://localhost:8080/api/health
```

La aplicación Expo permanece en modo local por defecto. Para habilitar las operaciones remotas, define en `Sprache/.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

En un teléfono físico, reemplaza `localhost` por la dirección IP accesible de la máquina que ejecuta Ktor. Reinicia Expo después de modificar la variable.

## Configuración

| Variable | Predeterminado | Uso |
|---|---|---|
| `PORT` | `8080` | Puerto HTTP |
| `SPRACHE_DB_URL` | `jdbc:h2:file:./data/sprache;DB_CLOSE_ON_EXIT=FALSE` | URL JDBC; H2 mantiene los datos en `backend-to-ktor/data/` al ejecutar desde el proyecto |
| `SPRACHE_DB_USER` | `sa` | Usuario de la base |
| `SPRACHE_DB_PASSWORD` | vacío | Contraseña de la base local |
| `JWT_SECRET` | Secreto solo de desarrollo | Clave de firma JWT; obligatoria en producción |
| `JWT_ISSUER` | `sprache-api` | Emisor JWT |
| `JWT_TTL_SECONDS` | `86400` | Vigencia del token (60–2592000 segundos) |
| `KTOR_ENV` | `development` | Al usar `production`, el servidor exige `JWT_SECRET` |
| `CORS_ORIGINS` | Sin orígenes web permitidos | Lista de hosts permitidos separada por comas |

No uses el secreto predeterminado en producción. Configura TLS y secretos mediante el entorno de despliegue. CORS no reemplaza autenticación ni es un control de acceso para clientes móviles.

## Rutas

Incluye salud, autenticación/perfil, actividades, lecciones (incluidos repasos y completado), lecturas, teoría, progreso, logros/retos semanales, evaluación inicial y personalización de mascota. Las rutas privadas requieren la cabecera `Authorization` con esquema Bearer y JWT.

Las respuestas de error usan JSON `{ "error": "...", "message": "..." }`. Consulta el contrato y sus payloads en [api-specification.md](./api-specification.md).

## Persistencia y pruebas

- Las contraseñas se almacenan con BCrypt; el backend nunca devuelve hashes.
- H2 guarda cuentas, perfil, sesiones, palabras, progreso y estado de mascota en la fila JSON de cada usuario; las actualizaciones de usuario se realizan dentro de una transacción JDBC.
- Los datos de actividades, lecciones, lecturas y teoría se cargan de los JSON versionados en `data/json/`.
- `src/test/kotlin/` incluye pruebas HTTP con una base H2 en memoria.
- `./gradlew clean` elimina solo productos de compilación; no elimina la base H2 guardada en `data/`.

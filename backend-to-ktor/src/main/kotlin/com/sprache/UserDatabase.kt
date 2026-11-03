package com.sprache

import kotlinx.serialization.json.JsonObject
import java.sql.Connection
import java.sql.DriverManager
import java.sql.SQLException

data class UserRecord(val email: String, val passwordHash: String, val user: JsonObject)

class UserDatabase(
    private val jdbcUrl: String,
    private val username: String,
    private val password: String,
) {
    private val lock = Any()

    fun initialize() {
        DriverManager.getConnection(jdbcUrl, username, password).use { connection ->
            connection.createStatement().use { statement ->
                statement.executeUpdate(
                    """
                    CREATE TABLE IF NOT EXISTS users (
                        email VARCHAR(254) PRIMARY KEY,
                        password_hash VARCHAR(100) NOT NULL,
                        user_json CLOB NOT NULL
                    )
                    """.trimIndent(),
                )
            }
        }
    }

    fun findByEmail(email: String): UserRecord? = synchronized(lock) {
        connection().use { connection ->
            connection.prepareStatement(
                "SELECT email, password_hash, user_json FROM users WHERE email = ?",
            ).use { statement ->
                statement.setString(1, email)
                statement.executeQuery().use { result ->
                    if (!result.next()) return@synchronized null
                    UserRecord(
                        result.getString("email"),
                        result.getString("password_hash"),
                        apiJson.decodeFromString(JsonObject.serializer(), result.getString("user_json")),
                    )
                }
            }
        }
    }

    fun create(email: String, passwordHash: String, user: JsonObject) = synchronized(lock) {
        connection().use { connection ->
            connection.prepareStatement(
                "INSERT INTO users (email, password_hash, user_json) VALUES (?, ?, ?)",
            ).use { statement ->
                statement.setString(1, email)
                statement.setString(2, passwordHash)
                statement.setString(3, apiJson.encodeToString(JsonObject.serializer(), user))
                try {
                    statement.executeUpdate()
                } catch (error: SQLException) {
                    if (error.sqlState == "23505") {
                        throw ApiException(
                            io.ktor.http.HttpStatusCode.Conflict,
                            "EMAIL_EXISTS",
                            "Ya existe una cuenta con ese correo.",
                        )
                    }
                    throw error
                }
            }
        }
    }

    fun update(email: String, transform: (JsonObject) -> JsonObject): JsonObject = synchronized(lock) {
        connection().use { connection ->
            connection.autoCommit = false
            try {
                val current = connection.readUser(email)
                    ?: throw ApiException(
                        io.ktor.http.HttpStatusCode.Unauthorized,
                        "UNAUTHORIZED",
                        "La sesión ya no es válida.",
                    )
                val updated = transform(current.user)
                connection.prepareStatement("UPDATE users SET user_json = ? WHERE email = ?").use { statement ->
                    statement.setString(1, apiJson.encodeToString(JsonObject.serializer(), updated))
                    statement.setString(2, email)
                    if (statement.executeUpdate() != 1) {
                        throw IllegalStateException("The user row disappeared while updating it.")
                    }
                }
                connection.commit()
                updated
            } catch (error: Throwable) {
                connection.rollback()
                throw error
            } finally {
                connection.autoCommit = true
            }
        }
    }

    private fun connection(): Connection = DriverManager.getConnection(jdbcUrl, username, password)

    private fun Connection.readUser(email: String): UserRecord? =
        prepareStatement("SELECT email, password_hash, user_json FROM users WHERE email = ?").use { statement ->
            statement.setString(1, email)
            statement.executeQuery().use { result ->
                if (!result.next()) return@use null
                UserRecord(
                    result.getString("email"),
                    result.getString("password_hash"),
                    apiJson.decodeFromString(JsonObject.serializer(), result.getString("user_json")),
                )
            }
        }
}

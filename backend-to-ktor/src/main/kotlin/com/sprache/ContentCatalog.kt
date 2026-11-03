package com.sprache

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray

class ContentCatalog(
    val activities: List<JsonObject> = loadJsonArray("activities.json"),
    val lessons: List<JsonObject> = loadJsonArray("lessons.json"),
    val readings: List<JsonObject> = loadJsonArray("readingLessons.json"),
    val theory: List<JsonObject> = loadJsonArray("theoryModules.json"),
) {
    val questions: List<JsonObject> = lessons.flatMap { lesson ->
        (lesson["questions"] as? JsonArray).orEmpty().mapNotNull { it as? JsonObject }
    }
}

private fun loadJsonArray(resourceName: String): List<JsonObject> {
    val stream = object {}.javaClass.classLoader.getResourceAsStream(resourceName)
        ?: throw IllegalStateException("Missing required seed resource: $resourceName")
    val parsed = stream.bufferedReader().use { reader ->
        apiJson.parseToJsonElement(reader.readText())
    }
    return parsed.jsonArray.mapIndexed { index, item ->
        item as? JsonObject
            ?: throw IllegalStateException("$resourceName item $index must be a JSON object.")
    }
}

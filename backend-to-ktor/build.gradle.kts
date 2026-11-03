plugins {
    kotlin("jvm") version "2.2.0"
    kotlin("plugin.serialization") version "2.2.0"
    application
}

group = "com.sprache"
version = "1.0.0"

repositories {
    mavenCentral()
}

val ktorVersion = "3.2.3"

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-netty-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-status-pages-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-cors-jvm:$ktorVersion")
    implementation("com.auth0:java-jwt:4.5.0")
    implementation("com.h2database:h2:2.3.232")
    implementation("org.mindrot:jbcrypt:0.4")
    implementation("ch.qos.logback:logback-classic:1.5.18")

    testImplementation(kotlin("test"))
    testImplementation("io.ktor:ktor-server-test-host-jvm:$ktorVersion")
}

kotlin {
    jvmToolchain(21)
}

application {
    mainClass.set("io.ktor.server.netty.EngineMain")
}

sourceSets {
    main {
        resources.srcDir("../backend-to-ktor/data/json")
    }
}

tasks.test {
    useJUnitPlatform()
}

tasks.register<JavaExec>("runServer") {
    group = "application"
    description = "Run the Sprache Ktor API server"
    classpath = sourceSets.main.get().runtimeClasspath
    mainClass.set("io.ktor.server.netty.EngineMain")
}

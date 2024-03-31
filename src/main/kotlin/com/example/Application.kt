package com.example

import com.example.plugins.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import org.jetbrains.exposed.sql.Database
import com.example.services.*
import com.example.modules.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*


fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureSerialization();
    val driverClassName = "org.h2.Driver"
    val jdbcURL = "jdbc:h2:file:./build/db"
    val database = Database.connect(jdbcURL, driverClassName)
    configureTemplating()
    configureRouting()
    val service = MaterialService(database)
    configureMaterialRouting(service)
}

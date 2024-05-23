package com.example

import com.example.plugins.*
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import org.jetbrains.exposed.sql.Database
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.http.content.*
import io.ktor.http.*


fun main() {
    /*embeddedServer(Netty, port = 4173, host = "0.0.0.0") {
        routing {
            singlePageApplication {
                react("library-system-web")
                useResources = true
            }
        }
    }.start()*/

    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module).start(wait = true)

}

fun Application.module() {
    configureSerialization()
    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        allowMethod(HttpMethod.Patch)
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowNonSimpleContentTypes = true
        allowCredentials = true
        allowSameOrigin = true
        allowHost("*", listOf("http", "https"))
    }

    val driverClassName = "org.h2.Driver"
    val jdbcURL = "jdbc:h2:file:./build/db"
    val database = Database.connect(jdbcURL, driverClassName)
    configureRouting(database)
}

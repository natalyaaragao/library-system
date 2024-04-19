package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.Database
import com.example.services.*
import com.example.modules.*

fun Application.configureRouting(database: Database) {
    configureMaterialRouting(MaterialService(database))
    configureAutorRouting(AutorService(database))
}

package com.example.modules

import com.example.models.toAutorResponse
import com.example.services.AutorService
import com.example.requests.AutorRequest
import com.example.requests.toAutor
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*

fun Application.configureAutorRouting(
    service: AutorService
) {
    routing {
        get("/autores") {
            val response = service.allAutores().map {
                it.toAutorResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        post("/autores") {
            val autor = call.receive<AutorRequest>().toAutor()
            val response = service.addNewAutor(autor).toAutorResponse()
            call.respond(HttpStatusCode.Created, response)
        }
    }
}
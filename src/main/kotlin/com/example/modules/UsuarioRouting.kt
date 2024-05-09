package com.example.modules

import com.example.models.toUsuarioResponse
import com.example.services.UsuarioService
import com.example.requests.UsuarioRequest
import com.example.requests.toUsuario
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureUsuarioRouting(
    service: UsuarioService
) {
    routing {
        get("/usuarios") {
            val response = service.allUsuarios().map {
                it.toUsuarioResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/usuarios/{id}") {
            val id = call.parameters["idUsuario"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.findUsuario(id)?.let {
                usuario -> val response = usuario.toUsuarioResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        post("/usuarios") {
            val usuario = call.receive<UsuarioRequest>().toUsuario()
            val response = service.addNewUsuario(usuario).toUsuarioResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        delete("/usuarios/{id}") {
            val id = call.parameters["idUsuario"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteUsuario(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
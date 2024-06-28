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
import java.util.*

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
        get("/usuarios/{email}") {
            val email = call.parameters["email"]?.toString() ?: throw IllegalArgumentException("Invalid ID")
            service.findUsuarioByEmail(email)?.let {
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
            val id = UUID.fromString(call.parameters["idUsuario"]) ?: throw IllegalArgumentException("Invalid ID")
            service.deleteUsuario(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
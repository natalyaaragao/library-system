package com.example.modules

import com.example.models.toListaResponse
import com.example.services.ListaService
import com.example.requests.ListaRequest
import com.example.requests.toLista
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*

fun Application.configureListaRouting(
    service: ListaService
) {
    routing {
        get("/listas") {
            val response = service.allListas().map {
                it.toListaResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/lista/{idLista}") {
            val id = call.parameters["idLista"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.findListaById(id)?.let {
                    lista -> val response = lista.toListaResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        get("/listas/{email}") {
            val email = call.parameters["email"]?.toString() ?: throw IllegalArgumentException("Invalid Email")
            val response = service.findListaByEmail(email).map {
                it.toListaResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        post("/listas") {
            val lista = call.receive<ListaRequest>().toLista()
            val response = service.addNewLista(lista).toListaResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        /*delete("/listas/{idLista}") {
            val id = call.parameters["idLista"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteLista(id)
            call.respond(HttpStatusCode.OK)
        }*/
    }
}
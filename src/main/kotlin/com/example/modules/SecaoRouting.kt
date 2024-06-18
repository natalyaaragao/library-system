package com.example.modules

import com.example.models.toSecaoResponse
import com.example.services.SecaoService
import com.example.requests.SecaoRequest
import com.example.requests.toSecao
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureSecaoRouting(
    service: SecaoService
) {
    routing {
        get("/secoes") {
            val response = service.allSecoes().map {
                it.toSecaoResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/secoes/{idSecao}") {
            val id = call.parameters["idSecao"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.findSecao(id)?.let {
                    secao -> val response = secao.toSecaoResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        } 
        get("/secoes/biblioteca/{idBiblioteca}") {
            val id = call.parameters["idBiblioteca"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val response = service.findSecaoByBiblioteca(id).map {
                it.toSecaoResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        post("/secoes") {
            val secao = call.receive<SecaoRequest>().toSecao()
            val response = service.addNewSecao(secao).toSecaoResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        delete("/secoes/{id}") {
            val id = call.parameters["idSecao"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteSecao(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
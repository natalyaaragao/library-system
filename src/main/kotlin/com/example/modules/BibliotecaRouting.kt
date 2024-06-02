package com.example.modules

import com.example.models.toBibliotecaResponse
import com.example.services.BibliotecaService
import com.example.requests.BibliotecaRequest
import com.example.requests.toBiblioteca
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*

fun Application.configureBibliotecaRouting(
    service: BibliotecaService
) {
    routing {
        get("/bibliotecas") {
            val response = service.allBiblioteca().map {
                it.toBibliotecaResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/bibliotecas/{cidade}") {
            val cidade = call.parameters["cidade"]?.toString() ?: throw IllegalArgumentException("Invalid Cidade")
            val response = service.getBibliotecaByCidade(cidade).map {
                it.toBibliotecaResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        post("/bibliotecas") {
            val biblioteca = call.receive<BibliotecaRequest>().toBiblioteca()
            val response = service.addNewBiblioteca(biblioteca).toBibliotecaResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        put("/bibliotecas/{idBiblioteca}") {
            val id = call.parameters["idBiblioteca"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val biblioteca = call.receive<BibliotecaRequest>().toBiblioteca()
            service.editBiblioteca(id, biblioteca)
            call.respond(HttpStatusCode.Created)
        }
        delete("/bibliotecas/{idBiblioteca}") {
            val id = call.parameters["idBiblioteca"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteBiblioteca(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
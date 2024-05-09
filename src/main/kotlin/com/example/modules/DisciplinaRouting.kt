package com.example.modules

import com.example.models.toDisciplinaResponse
import com.example.services.DisciplinaService
import com.example.requests.DisciplinaRequest
import com.example.requests.toDisciplina
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureDisciplinaRouting(
    service: DisciplinaService
) {
    routing {
        get("/disciplinas") {
            val response = service.allDisciplinas().map {
                it.toDisciplinaResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/disciplinas/{id}") {
            val id = call.parameters["idDisciplinas"]?.toString() ?: throw IllegalArgumentException("Invalid ID")
            service.findDisciplina(id)?.let {
                    disciplina -> val response = disciplina.toDisciplinaResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        post("/disciplinas") {
            val disciplina = call.receive<DisciplinaRequest>().toDisciplina()
            val response = service.addNewDisciplina(disciplina).toDisciplinaResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        delete("/disciplinas/{id}") {
            val id = call.parameters["idDisciplina"]?.toString() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteDisciplina(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
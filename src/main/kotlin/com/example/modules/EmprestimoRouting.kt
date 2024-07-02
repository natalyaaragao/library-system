package com.example.modules

import com.example.models.toEmprestimoResponse
import com.example.services.EmprestimoService
import com.example.requests.EmprestimoRequest
import com.example.requests.toEmprestimo
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*

fun Application.configureEmprestimoRouting(
    service: EmprestimoService
) {
    routing {
        get("/emprestimos") {
            val response = service.allEmprestimos().map {
                it.toEmprestimoResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/emprestimos/consulta/{idUsuario}") {
            val id = call.parameters["idUsuario"]?.toString() ?: throw IllegalArgumentException("Invalid ID")
            service.findEmprestimoByUsuario(id)?.let {
                    emprestimo -> val response = emprestimo.toEmprestimoResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        post("/emprestimos") {
            val emprestimo = call.receive<EmprestimoRequest>().toEmprestimo()
            val response = service.addNewEmprestimo(emprestimo).toEmprestimoResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        put("/emprestimos/{idEmprestimo}") {
            val id = call.parameters["idEmprestimo"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val emprestimo = call.receive<EmprestimoRequest>().toEmprestimo()
            service.editEmprestimo(id, emprestimo)
            call.respond(HttpStatusCode.Created)
        }
    }
}
package com.example.modules

import com.example.models.toItemEmprestimoResponse
import com.example.services.ItemEmprestimoService
import com.example.requests.ItemEmprestimoRequest
import com.example.requests.toItemEmprestimo
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*

fun Application.configureItemEmprestimoRouting(
    service: ItemEmprestimoService
) {
    routing {
        get("/itememprestimos") {
            val response = service.allItemEmprestimos().map {
                it.toItemEmprestimoResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/itememprestimos/{idItemEmprestimo}") {
            val id = call.parameters["idItemEmprestimo"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.findItemEmprestimoById(id)?.let {
                    item -> val response = item.toItemEmprestimoResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        get("/itememprestimo/{idEmprestimo}") {
            val id = call.parameters["idEmprestimo"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val response = service.findItemEmprestimoByEmprestimo(id).map {
                it.toItemEmprestimoResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        post("/itememprestimos") {
            val item = call.receive<ItemEmprestimoRequest>().toItemEmprestimo()
            val response = service.addNewItemEmprestimo(item).toItemEmprestimoResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        put("/itememprestimos/{idItemEmprestimo}") {
            val id = call.parameters["idItemEmprestimo"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val item = call.receive<ItemEmprestimoRequest>().toItemEmprestimo()
            service.editItemEmprestimo(id, item)
            call.respond(HttpStatusCode.Created)
        }
        delete("/itememprestimos/{idItemEmprestimo}") {
            val id = call.parameters["iditememprestimosEmprestimo"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteItemEmprestimo(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
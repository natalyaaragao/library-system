package com.example.modules

import com.example.models.toItemListaResponse
import com.example.services.ItemListaService
import com.example.requests.ItemListaRequest
import com.example.requests.toItemLista
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureItemListaRouting(
    service: ItemListaService
) {
    routing {
        get("/itemLista") {
            val response = service.allItemListas().map {
                it.toItemListaResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/itemLista/{idItemLista}") {
            val id = call.parameters["idItemLista"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.findItemListaById(id)?.let {
                    itemLista -> val response = itemLista.toItemListaResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        get("/itemLista/lista/{idLista}") {
            val id = call.parameters["idLista"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val response = service.findItemLista(id).map {
                it.toItemListaResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        post("/itemLista") {
            val item = call.receive<ItemListaRequest>().toItemLista()
            val response = service.addNewItemLista(item).toItemListaResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        delete("/itemLista/{idItemLista}") {
            val id = call.parameters["idItemLista"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteItemLista(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
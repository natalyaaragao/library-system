package com.example.modules

import com.example.models.toItemMaterialResponse
import com.example.services.ItemMaterialService
import com.example.requests.ItemMaterialRequest
import com.example.requests.toItemMaterial
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureExemplarRouting(
    service: ItemMaterialService
) {
    routing {
        get("/exemplares") {
            val response = service.allItemMaterial().map {
                it.toItemMaterialResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/exemplares/{idItemMaterial}") {
            val id = call.parameters["idItemMaterial"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.findItemMaterialById(id)?.let {
                    exemplar -> val response = exemplar.toItemMaterialResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        get("/exemplares/material/{idMaterial}") {
            val id = call.parameters["idMaterial"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val response = service.findItemMaterial(id).map {
                it.toItemMaterialResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        post("/exemplares") {
            val exemplar = call.receive<ItemMaterialRequest>().toItemMaterial()
            val response = service.addNewItemMaterial(exemplar).toItemMaterialResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        delete("/exemplares/{id}") {
            val id = call.parameters["idItemMaterial"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteItemMaterial(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
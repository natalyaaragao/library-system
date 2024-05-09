package com.example.modules

import com.example.models.toMaterialResponse
import com.example.services.MaterialService
import com.example.requests.toMaterial
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureMaterialRouting(
    service: MaterialService
) {
    routing {
        get("/materiais") {
            val response = service.allMateriais().map {
                it.toMaterialResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/materiais/{id}") {
            val id = call.parameters["idMaterial"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.findMaterial(id)?.let {
                    material -> val response = material.toMaterialResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        delete("/materiais/{id}") {
            val id = call.parameters["idMaterial"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            service.deleteMaterial(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
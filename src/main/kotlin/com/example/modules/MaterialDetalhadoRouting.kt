package com.example.modules

import com.example.models.toMaterialDetalhadoResponse
import com.example.services.MaterialDetalhadoService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureMaterialDetalhadoRouting(
    service: MaterialDetalhadoService
) {
    routing {
        get("/materialdetalhado/{idMaterial}") {
            val id = call.parameters["idMaterial"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val response = service.findMaterialDetalhado(id).map {
                it.toMaterialDetalhadoResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
    }
}
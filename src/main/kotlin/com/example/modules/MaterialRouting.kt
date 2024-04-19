package com.example.modules

import com.example.responses.*
import com.example.models.toMaterialResponse
import com.example.requests.toMaterial
import com.example.services.MaterialService
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.freemarker.*
import io.ktor.server.http.content.*
import io.ktor.server.util.*
import io.ktor.server.request.*
import java.io.File

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
    }
}
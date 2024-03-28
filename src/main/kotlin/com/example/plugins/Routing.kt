package com.example.plugins

import com.example.dao.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.http.content.*
import io.ktor.server.freemarker.*
import io.ktor.server.util.*
import io.ktor.server.request.*

fun Application.configureRouting() {
    routing {
        static("/") {
            resources("files")
        }
        get("/") {
            call.respondRedirect("materiais")
        }
        route("materiais") {
            get {
                call.respond(FreeMarkerContent("index.ftl", mapOf("materiais" to dao.allMateriais())))
            }
            get("{idMaterial}") {
                val idMaterial = call.parameters.getOrFail<Int>("idMaterial").toInt()
                call.respond(FreeMarkerContent("show.ftl", mapOf("material" to dao.material(idMaterial))))
            }
            get("{idMaterial}/edit") {
                val idMaterial = call.parameters.getOrFail<Int>("id").toInt()
                call.respond(FreeMarkerContent("edit.ftl", mapOf("material" to dao.material(idMaterial))))
            }
            post {
                val formParameters = call.receiveParameters()
                val titulo = formParameters.getOrFail("titulo")
                val descricao = formParameters.getOrFail("descricao")
                val material = dao.addNewMaterial(titulo, descricao)
                call.respondRedirect("/materiais/${material?.idMaterial}")
            }
            post("{idMaterial}") {
                val idMaterial = call.parameters.getOrFail<Int>("idMaterial").toInt()
                val formParameters = call.receiveParameters()
                when (formParameters.getOrFail("_action")) {
                    "update" -> {
                        val titulo = formParameters.getOrFail("titulo")
                        val descricao = formParameters.getOrFail("descricao")
                        dao.editMaterial(idMaterial, titulo, descricao)
                        call.respondRedirect("/materiais/$idMaterial")
                    }
                    "delete" -> {
                        dao.deleteMaterial(idMaterial)
                        call.respondRedirect("/materiais")
                    }
                }
            }
        }
    }
}

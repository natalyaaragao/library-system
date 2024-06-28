package com.example.modules

import com.example.models.toUserLoginResponse
import com.example.services.UserLoginService
import com.example.requests.UserLoginRequest
import com.example.requests.toUserLogin
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

fun Application.configureUserLoginRouting(
    service: UserLoginService
) {
    routing {
        get("/login") {
            val response = service.allUsersLogin().map {
                it.toUserLoginResponse()
            }
            call.respond(HttpStatusCode.OK, response)
        }
        get("/login/{idUserLogin}") {
            val id = UUID.fromString(call.parameters["idUserLogin"]) ?: throw IllegalArgumentException("Invalid ID")
            service.findUserLoginById(id)?.let {
                user -> val response = user.toUserLoginResponse()
                call.respond(HttpStatusCode.OK, response)
            } ?: call.respond(HttpStatusCode.NotFound)
        }
        get("/logado/{email}") {
            val email = call.parameters["email"]?.toString() ?: throw IllegalArgumentException("Invalid ID")
            val response = service.checkUser(email)
            call.respond(HttpStatusCode.OK, response)
        }
        post("/login") {
            val user = call.receive<UserLoginRequest>().toUserLogin()
            val response = service.addUserLogin(user).toUserLoginResponse()
            call.respond(HttpStatusCode.Created, response)
        }
        delete("/login/{idUserLogin}") {
            val id = UUID.fromString(call.parameters["idUserLogin"]) ?: throw IllegalArgumentException("Invalid ID")
            service.deleteUserLogin(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}
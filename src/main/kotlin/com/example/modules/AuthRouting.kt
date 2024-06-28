package com.example.modules

import com.example.services.JwtService
import com.example.services.UsuarioService
import com.example.requests.UsuarioRequest
import com.example.requests.toUsuario
import com.example.models.toUsuarioResponse
import com.example.response.AuthResponse
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureAuthRouting(
    jwtService: JwtService,
    service: UsuarioService
) {
    routing {
        post("/auth") {
            val loginRequest = call.receive<UsuarioRequest>().toUsuario()
            service.findUsuarioByEmail(loginRequest.email)?.let{
                user -> if(loginRequest.senha == user.senha) {
                            val token: String? = jwtService.createJwtToken(user.email, user.role)
                            token?.let {
                                call.respond(hashMapOf("token" to token))
                                AuthResponse(accessToken = token)
                            } ?: call.respond(
                                message = HttpStatusCode.Unauthorized
                            )
                        }
            } ?: call.respond(HttpStatusCode.NotFound)
        }
    }
}
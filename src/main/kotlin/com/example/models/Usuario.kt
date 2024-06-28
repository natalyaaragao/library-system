package com.example.models

import com.example.responses.UsuarioResponse
import java.util.*

data class Usuario(
    val idUsuario: UUID = UUID.randomUUID(),
    val nome: String,
    val email: String,
    val senha: String,
    val role: String
)

fun Usuario.toUsuarioResponse(): UsuarioResponse {
    return UsuarioResponse(
        idUsuario = idUsuario.toString(),
        nome = nome,
        email = email,
        senha = senha,
        role = role
    )
}

package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Usuario
import java.util.UUID

@Serializable
class UsuarioRequest(
    val nome: String,
    val email: String,
    val senha: String,
    val role: String
)

fun UsuarioRequest.toUsuario(
    idUsuario: UUID = UUID.randomUUID()
): Usuario {
    return Usuario(
        idUsuario = idUsuario,
        nome = nome,
        email = email,
        senha = senha,
        role = "USER"
    )
}

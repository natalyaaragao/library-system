package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class UsuarioResponse(
    val idUsuario: String,
    val nome: String,
    val email: String,
    val senha: String,
    val role: String
)
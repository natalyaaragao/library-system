package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class UsuarioResponse(
    val idUsuario: Int,
    val nome: String,
    val cpf: String,
    val nusp: Int,
    val telefone: String,
    val email: String,
    val idEndereco: Int
)
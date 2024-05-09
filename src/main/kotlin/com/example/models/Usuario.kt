package com.example.models

import com.example.responses.UsuarioResponse

data class Usuario(
    val idUsuario: Int,
    val nome: String,
    val cpf: String,
    val nusp: Int,
    val telefone: String,
    val email: String,
    val idEndereco: Int
)

fun Usuario.toUsuarioResponse(): UsuarioResponse {
    return UsuarioResponse(
        idUsuario = idUsuario,
        nome = nome,
        cpf = cpf,
        nusp = nusp,
        telefone = telefone,
        email = email,
        idEndereco = idEndereco
    )
}

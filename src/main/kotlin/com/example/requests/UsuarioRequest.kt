package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Usuario

@Serializable
class UsuarioRequest(
    val nome: String,
    val cpf: String,
    val nusp: Int,
    val telefone: String,
    val email: String,
    val idEndereco: Int
)

fun UsuarioRequest.toUsuario(idUsuario: Int = 1): Usuario {
    return Usuario(
        idUsuario = idUsuario,
        nome = nome,
        cpf = cpf,
        nusp = nusp,
        telefone = telefone,
        email = email,
        idEndereco = idEndereco
    )
}

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
    val rua: String,
	val numero: Int,
	val bairro: String,
	val cidade: String,
	val estado: String,
	val cep: Int
)

fun UsuarioRequest.toUsuario(idUsuario: Int = 1): Usuario {
    return Usuario(
        idUsuario = idUsuario,
        nome = nome,
        cpf = cpf,
        nusp = nusp,
        telefone = telefone,
        email = email,
        rua = rua,
		numero = numero,
		bairro = bairro,
		cidade = cidade,
		estado = estado,
		cep = cep
    )
}

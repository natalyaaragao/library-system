package com.example.models

import com.example.responses.UsuarioResponse

data class Usuario(
    val idUsuario: Int,
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

fun Usuario.toUsuarioResponse(): UsuarioResponse {
    return UsuarioResponse(
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

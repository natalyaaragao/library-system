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
    val rua: String,
	val numero: Int,
	val bairro: String,
	val cidade: String,
	val estado: String,
	val cep: Int
)
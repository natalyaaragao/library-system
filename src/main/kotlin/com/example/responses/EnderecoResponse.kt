package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class EnderecoResponse(
	val IdEndereco: Int,
	val Rua: String,
	val Numero: Int,
	val Bairro: String,
	val Cidade: String,
	val Estado: String,
	val Cep: Int
)

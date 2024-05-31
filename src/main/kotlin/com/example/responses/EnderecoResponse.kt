package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class EnderecoResponse(
	val idEndereco: Int,
	val rua: String,
	val numero: Int,
	val bairro: String,
	val cidade: String,
	val estado: String,
	val cep: Int
)

package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class BibliotecaResponse(
    val idBiblioteca: Int,
    val nome: String,
    val horarioFuncionamento: String,
    val telefone: String,
    val email: String,
    val site: String,
    val assuntos: String,
    val areaConhecimento: String,
    val recursos: String,
    val rua: String,
	val numero: Int,
	val bairro: String,
	val cidade: String,
	val estado: String,
	val cep: Int
)
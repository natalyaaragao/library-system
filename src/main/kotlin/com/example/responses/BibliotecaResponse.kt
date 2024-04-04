package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class BibliotecaResponse(
    val idBiblioteca: Int,
    val nome: String,
    val idEndereco: Int,
    val horarioFuncionamento: String,
    val telefone: String,
    val email: String,
)
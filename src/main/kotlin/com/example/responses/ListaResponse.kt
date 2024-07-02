package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class ListaResponse(
    val idLista: Int,
    val email: String,
    val nomeLista: String,
    val tipoLista: String
)
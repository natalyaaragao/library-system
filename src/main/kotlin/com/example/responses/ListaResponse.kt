package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class ListaResponse(
    val idLista: Int,
    val idUsuario: Int,
    val nomeLista: String,
    val tipoLista: String
)
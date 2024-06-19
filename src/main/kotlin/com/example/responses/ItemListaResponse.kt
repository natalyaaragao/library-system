package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class ItemListaResponse(
    val idItemLista: Int,
    val idLista: Int,
    val nomeMaterial: String
)
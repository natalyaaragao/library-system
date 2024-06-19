package com.example.models

import com.example.responses.ItemListaResponse

data class ItemLista(
    val idItemLista: Int,
    val idLista: Int,
    val nomeMaterial: String
)

fun ItemLista.toItemListaResponse(): ItemListaResponse {
    return ItemListaResponse(
        idItemLista = idItemLista,
        idLista = idLista,
        nomeMaterial = nomeMaterial
    )
}
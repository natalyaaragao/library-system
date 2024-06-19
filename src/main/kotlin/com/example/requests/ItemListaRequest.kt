package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.ItemLista

@Serializable
class ItemListaRequest(
    val idLista: Int,
    val nomeMaterial: String
)

fun ItemListaRequest.toItemLista(idItemLista: Int = 1): ItemLista {
    return ItemLista(
        idItemLista = idItemLista,
        idLista = idLista,
        nomeMaterial = nomeMaterial
    )
}
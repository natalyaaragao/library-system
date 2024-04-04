package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.ItemMaterial

@Serializable
class ItemMaterialRequest(
    val idLocalizacaoItem: Int,
    val statusItem: Int,
    val colecao: String,
    val paginas: Int,
    val numReservas: Int,
    val codigoDeBarras: String
)

fun ItemMaterialRequest.toItemMaterial(idItemMaterial: Int = 1): ItemMaterial {
    return ItemMaterial(
        idItemMaterial = idItemMaterial,
        idLocalizacaoItem = idLocalizacaoItem,
        statusItem = statusItem,
        colecao = colecao,
        paginas = paginas,
        numReservas = numReservas,
        codigoDeBarras = codigoDeBarras
    )
}
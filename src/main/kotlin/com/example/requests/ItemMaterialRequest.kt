package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.ItemMaterial

@Serializable
class ItemMaterialRequest(
    val localizacaoItem: String,
    val statusItem: Int,
    val idMaterial: Int,
    val colecao: String,
    val paginas: Int,
    val numReservas: Int,
    val codigoDeBarras: String
)

fun ItemMaterialRequest.toItemMaterial(idItemMaterial: Int = 1): ItemMaterial {
    return ItemMaterial(
        idItemMaterial = idItemMaterial,
        localizacaoItem = localizacaoItem,
        idMaterial = idMaterial,
        statusItem = statusItem,
        colecao = colecao,
        paginas = paginas,
        numReservas = numReservas,
        codigoDeBarras = codigoDeBarras
    )
}
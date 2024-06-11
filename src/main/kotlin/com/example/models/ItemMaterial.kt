package com.example.models

import com.example.responses.ItemMaterialResponse
import com.example.responses.MaterialResponse

data class ItemMaterial(
    val idItemMaterial: Int,
    val idMaterial: Int,
    val statusItem: Int,
    val colecao: String,
    val paginas: Int,
    val numReservas: Int,
    val codigoDeBarras: String,
    val localizacaoItem: String
)

fun ItemMaterial.toItemMaterialResponse(): ItemMaterialResponse {
    return ItemMaterialResponse(
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
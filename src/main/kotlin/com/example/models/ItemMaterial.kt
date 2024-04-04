package com.example.models

import com.example.responses.ItemMaterialResponse
import com.example.responses.MaterialResponse

data class ItemMaterial(
    val idItemMaterial: Int,
    val idLocalizacaoItem: Int,
    val statusItem: Int,
    val colecao: String,
    val paginas: Int,
    val numReservas: Int,
    val codigoDeBarras: String
)

fun ItemMaterial.toItemMaterialResponse(): ItemMaterialResponse {
    return ItemMaterialResponse(
        idItemMaterial = idItemMaterial,
        idLocalizacaoItem = idLocalizacaoItem,
        statusItem = statusItem,
        colecao = colecao,
        paginas = paginas,
        numReservas = numReservas,
        codigoDeBarras = codigoDeBarras
    )
}
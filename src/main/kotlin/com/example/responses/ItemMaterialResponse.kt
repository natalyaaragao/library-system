package com.example.responses
import kotlinx.serialization.Serializable

@Serializable
class ItemMaterialResponse(
    val idItemMaterial: Int,
    val localizacaoItem: String,
    val idMaterial: Int,
    val statusItem: Int,
    val colecao: String,
    val paginas: Int,
    val numReservas: Int,
    val codigoDeBarras: String
)
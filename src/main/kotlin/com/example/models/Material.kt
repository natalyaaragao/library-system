package com.example.models

import com.example.responses.MaterialResponse
data class Material(
    val idMaterial: Int,
    val titulo: String,
    val descricao: String
)

fun Material.toMaterialResponse(): MaterialResponse {
    return MaterialResponse(
        idMaterial = idMaterial,
        titulo = titulo,
        descricao = descricao
    )
}
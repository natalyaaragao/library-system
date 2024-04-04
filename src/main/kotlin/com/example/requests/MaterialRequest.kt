package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Material

@Serializable
class MaterialRequest(
    val titulo: String,
    val descricao: String
)

fun MaterialRequest.toMaterial(idMaterial: Int = 1): Material {
    return Material(
        idMaterial = idMaterial,
        titulo = titulo,
        descricao = descricao
    )
}


package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class MaterialResponse(
    val idMaterial: Int,
    val titulo: String,
    val descricao: String
)

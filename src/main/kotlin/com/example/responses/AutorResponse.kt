package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class AutorResponse(
    val idAutor: Int,
    val nome: String
)
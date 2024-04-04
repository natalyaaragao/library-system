package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class SecaoResponse(
    val idSecao: Int,
    val idBiblioteca: Int,
    val nomeSecao: String
)
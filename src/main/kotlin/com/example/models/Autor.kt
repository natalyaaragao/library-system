package com.example.models

import com.example.responses.AutorResponse
import com.example.responses.MaterialResponse

data class Autor(
    val idAutor: Int,
    val nome: String
)

fun Autor.toAutorResponse(): AutorResponse {
    return AutorResponse(
        idAutor = idAutor,
        nome = nome
    )
}
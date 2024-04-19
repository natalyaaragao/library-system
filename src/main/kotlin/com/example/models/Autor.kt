package com.example.models

import com.example.responses.AutorResponse

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
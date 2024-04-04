package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Autor

@Serializable
class AutorRequest(
    val nome: String
)

fun AutorRequest.toAutor(idAutor: Int = 1): Autor {
    return Autor(
        idAutor = idAutor,
        nome = nome
    )
}
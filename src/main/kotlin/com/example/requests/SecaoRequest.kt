package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Secao

@Serializable
class SecaoRequest(
    val idBiblioteca: Int,
    val nomeSecao: String
)

fun SecaoRequest.toSecao(idSecao: Int = 1): Secao {
    return Secao(
        idSecao = idSecao,
        idBiblioteca = idBiblioteca,
        nomeSecao = nomeSecao
    )
}


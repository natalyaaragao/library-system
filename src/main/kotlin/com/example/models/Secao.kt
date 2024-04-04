package com.example.models

import com.example.responses.MaterialResponse
import com.example.responses.SecaoResponse

data class Secao(
    val idSecao: Int,
    val idBiblioteca: Int,
    val nomeSecao: String
)

fun Secao.toSecaoResponse(): SecaoResponse {
    return SecaoResponse(
        idSecao = idSecao,
        idBiblioteca = idBiblioteca,
        nomeSecao = nomeSecao
    )
}
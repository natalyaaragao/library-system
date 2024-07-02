package com.example.models

import com.example.responses.ListaResponse

data class Lista(
    val idLista: Int,
    val email: String,
    val nomeLista: String,
    val tipoLista: String
)

fun Lista.toListaResponse(): ListaResponse {
    return ListaResponse(
        idLista = idLista,
        email = email,
        nomeLista = nomeLista,
        tipoLista = tipoLista
    )
}
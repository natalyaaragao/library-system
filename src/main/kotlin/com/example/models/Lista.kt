package com.example.models

import com.example.responses.ListaResponse

data class Lista(
    val idLista: Int,
    val idUsuario: Int,
    val nomeLista: String,
    val tipoLista: String
)

fun Lista.toListaResponse(): ListaResponse {
    return ListaResponse(
        idLista = idLista,
        idUsuario = idUsuario,
        nomeLista = nomeLista,
        tipoLista = tipoLista
    )
}
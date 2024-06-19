package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Lista

@Serializable
class ListaRequest(
    val idUsuario: Int,
    val nomeLista: String,
    val tipoLista: String
)

fun ListaRequest.toLista(idLista: Int = 1): Lista {
    return Lista(
        idLista = idLista,
        idUsuario = idUsuario,
        nomeLista = nomeLista,
        tipoLista = tipoLista
    )
}
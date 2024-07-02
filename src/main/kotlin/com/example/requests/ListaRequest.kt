package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Lista

@Serializable
class ListaRequest(
    val email: String,
    val nomeLista: String,
    val tipoLista: String
)

fun ListaRequest.toLista(idLista: Int = 1): Lista {
    return Lista(
        idLista = idLista,
        email = email,
        nomeLista = nomeLista,
        tipoLista = tipoLista
    )
}
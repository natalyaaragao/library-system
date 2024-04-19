package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.ItemEmprestimo

@Serializable
class ItemEmprestimoRequest(
    val idItemMaterial: Int,
    val idAdministrador: Int,
    val devolucao: String,
    val status: Int
)

fun ItemEmprestimoRequest.toItemEmprestimo(idItemEmprestimo: Int = 1): ItemEmprestimo {
    return ItemEmprestimo(
        idItemEmprestimo = idItemEmprestimo,
        idItemMaterial = idItemMaterial,
        idAdministrador = idAdministrador,
        devolucao = devolucao,
        status = status
    )
}

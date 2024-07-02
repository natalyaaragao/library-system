package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.ItemEmprestimo

@Serializable
class ItemEmprestimoRequest(
    val idItemMaterial: Int,
    val idEmprestimo: Int,
    val devolucao: String,
    val status: Int,
    val prazo: String
)

fun ItemEmprestimoRequest.toItemEmprestimo(idItemEmprestimo: Int = 1): ItemEmprestimo {
    return ItemEmprestimo(
        idItemEmprestimo = idItemEmprestimo,
        idItemMaterial = idItemMaterial,
        idEmprestimo = idEmprestimo,
        devolucao = devolucao,
        status = status,
        prazo = prazo
    )
}

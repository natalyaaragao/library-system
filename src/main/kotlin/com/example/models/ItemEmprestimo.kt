package com.example.models

import com.example.responses.ItemEmprestimoResponse

data class ItemEmprestimo(
    val idItemEmprestimo: Int,
    val idItemMaterial: Int,
    val idEmprestimo: Int,
    val devolucao: String,
    val status: Int,
    val prazo: String
)

fun ItemEmprestimo.toItemEmprestimoResponse(): ItemEmprestimoResponse {
    return ItemEmprestimoResponse(
        idItemEmprestimo = idItemEmprestimo,
        idItemMaterial = idItemMaterial,
        idEmprestimo = idEmprestimo,
        devolucao = devolucao,
        status = status,
        prazo = prazo
    )
}

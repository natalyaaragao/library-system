package com.example.models

import com.example.responses.ItemEmprestimoResponse

data class ItemEmprestimo(
    val idItemEmprestimo: Int,
    val idItemMaterial: Int,
    val idAdministrador: Int,
    val devolucao: String,
    val status: Int
)

fun ItemEmprestimo.toItemEmprestimoResponse(): ItemEmprestimoResponse {
    return ItemEmprestimoResponse(
        idItemEmprestimo = idItemEmprestimo,
        idItemMaterial = idItemMaterial,
        idAdministrador = idAdministrador,
        devolucao = devolucao,
        status = status
    )
}

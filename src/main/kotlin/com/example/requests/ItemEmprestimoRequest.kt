package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.ItemEmprestimo

@Serializable
class ItemEmprestimoRequest(
    val IdItemMaterial: Int,
    val IdAdministrador: Int,
    val Devolucao: String,
    val Status: Int 
)

fun ItemEmprestimoRequest.toItemEmprestimo(IdItemEmprestimo: Int = 1): ItemEmprestimo {
    return ItemEmprestimo(
        IdItemEmprestimo = IdItemEmprestimo,
        IdItemMaterial = IdItemMaterial,
        IdAdministrador = IdAdministrador,
        Devolucao = Devolucao,
        Status = Status
    )
}

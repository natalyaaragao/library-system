package com.example.models

import com.example.responses.ItemEmprestimoResponse

data class ItemEmprestimo(
    val IdItemEmprestimo: Int,
    val IdItemMaterial: Int,
    val IdAdministrador: Int,
    val Devolucao: String,
    val Status: Int 
)

fun ItemEmprestimo.toItemEmprestimoResponse(): ItemEmprestimoResponse {
    return ItemEmprestimoResponse(
	IdItemEmprestimo = IdItemEmprestimo,
	IdItemMaterial = IdItemMaterial,
	IdAdministrador = IdAdministrador,
	Devolucao = Devolucao,
	Status = Status
    )
}

package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class ItemEmprestimoResponse(
    val IdItemEmprestimo: Int,
    val IdItemMaterial: Int,
    val IdAdministrador: Int,
    val Devolucao: String,
    val Status: Int
)

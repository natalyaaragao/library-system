package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class ItemEmprestimoResponse(
    val idItemEmprestimo: Int,
    val idItemMaterial: Int,
    val idEmprestimo: Int,
    val devolucao: String,
    val status: Int,
    val prazo: String
)

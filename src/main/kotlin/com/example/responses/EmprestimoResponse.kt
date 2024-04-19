package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class EmprestimoResponse(
    val IdEmprestimo: Int,
    val IdUsuario: Int,
    val StatusUsuario: Int,
    val QtdItens: Int,
    val Prazo: String
)

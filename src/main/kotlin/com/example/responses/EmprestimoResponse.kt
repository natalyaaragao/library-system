package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class EmprestimoResponse(
    val idEmprestimo: Int,
    val idUsuario: Int,
    val statusUsuario: Int,
    val qtdItens: Int,
    val prazo: String
)

package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class EmprestimoResponse(
    val idEmprestimo: Int,
    val idUsuario: String,
    val statusUsuario: Int,
    val qtdItens: Int
)

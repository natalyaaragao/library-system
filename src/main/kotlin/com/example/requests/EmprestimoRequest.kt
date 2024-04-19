package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Emprestimo

@Serializable
class EmprestimoRequest(
    val idUsuario: Int,
    val statusUsuario: Int,
    val qtdItens: Int,
    val prazo: String

)

fun EmprestimoRequest.toEmprestimo(idEmprestimo: Int = 1): Emprestimo {
    return Emprestimo(
        idEmprestimo = idEmprestimo,
        idUsuario = idUsuario,
        statusUsuario = statusUsuario,
        qtdItens = qtdItens,
        prazo = prazo
    )
}

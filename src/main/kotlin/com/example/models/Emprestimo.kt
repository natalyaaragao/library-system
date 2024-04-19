package com.example.models

import com.example.responses.EmprestimoResponse

data class Emprestimo(
    val idEmprestimo: Int,
    val idUsuario: Int,
    val statusUsuario: Int,
    val qtdItens: Int,
    val prazo: String
)

fun Emprestimo.toEmprestimoResponse(): EmprestimoResponse {
    return EmprestimoResponse(
        idEmprestimo = idEmprestimo,
        idUsuario = idUsuario,
        statusUsuario = statusUsuario,
        qtdItens = qtdItens,
        prazo = prazo
    )
}

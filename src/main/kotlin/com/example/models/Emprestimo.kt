package com.example.models

import com.example.responses.EmprestimoResponse

data class Emprestimo(
    val IdEmprestimo: Int,
	val IdUsuario: Int,
    val StatusUsuario: Int,
    val QtdItens: Int,
    val Prazo: String
)

fun Emprestimo.toEmprestimoResponse(): EmprestimoResponse {
    return EmprestimoResponse(
        IdEmprestimo = IdEmprestimo, 
        IdUsuario = IdUsuario,
        StatusUsuario = StatusUsuario,
        QtdItens = QtdItens,
        Prazo = Prazo
    )
}

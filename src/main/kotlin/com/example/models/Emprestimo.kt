package com.example.models

import com.example.responses.EmprestimoResponse

data class Emprestimo(
    val IdEmprestimo: Int,
	val IdUsuario: Int,
    val IdEmprestimo: Int,
    val StatusUsuario: Int,
    val QtdItens: Int,
    //val Prazo: Date 
)

fun Emprestimo.toEmprestimoResponse(): EmprestimoResponse {
    return EmprestimoResponse(
        IdEmprestimo = IdEmprestimo, 
        IdUsuario = IdUsuario,
        IdEmprestimo = IdEmprestimo,
        StatusUsuario = StatusUsuario,
        QtdItens = QtdItens,
        Prazo = Prazo
    )
}

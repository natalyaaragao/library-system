package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Emprestimo

@Serializable
class EmprestimoRequest(
    val IdUsuario: Int,
    val IdEmprestimo: Int,
    val StatusUsuario: Int,
    val QtdItens: Int,
    val Prazo: String 

)

fun EmprestimoRequest.toEmprestimo(idEmprestimo: Int = 1): Emprestimo {
    return Emprestimo(
        idEmprestimo = idEmprestimo,
        IdUsuario = IdUsuario,
        IdEmprestimo = IdEmprestimo,
        StatusUsuario = StatusUsuario,
        QtdItens = QtdItens,
        Prazo = Prazo
    )
}

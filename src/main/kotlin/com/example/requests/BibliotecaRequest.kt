package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Biblioteca

@Serializable
class BibliotecaRequest(
    val nome: String,
    val idEndereco: Int,
    val horarioFuncionamento: String,
    val telefone: String,
    val email: String
)

fun BibliotecaRequest.toBiblioteca(idBiblioteca: Int = 1): Biblioteca {
    return Biblioteca(
        idBiblioteca = idBiblioteca,
        nome = nome,
        idEndereco = idEndereco,
        horarioFuncionamento = horarioFuncionamento,
        telefone = telefone,
        email = email
    )
}
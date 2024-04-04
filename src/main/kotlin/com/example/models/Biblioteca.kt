package com.example.models

import com.example.responses.BibliotecaResponse
import com.example.responses.MaterialResponse

data class Biblioteca(
    val idBiblioteca: Int,
    val nome: String,
    val idEndereco: Int,
    val horarioFuncionamento: String,
    val telefone: String,
    val email: String,
)

fun Biblioteca.toBibliotecaResponse(): BibliotecaResponse {
    return BibliotecaResponse(
        idBiblioteca = idBiblioteca,
        nome = nome,
        idEndereco = idEndereco,
        horarioFuncionamento = horarioFuncionamento,
        telefone = telefone,
        email = email,
    )
}
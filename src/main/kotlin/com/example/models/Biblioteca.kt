package com.example.models

import com.example.responses.BibliotecaResponse
import kotlinx.serialization.Serializable

@Serializable
data class Biblioteca(
    val idBiblioteca: Int,
    val nome: String,
    val horarioFuncionamento: String,
    val telefone: String,
    val email: String,
    val site: String,
    val assuntos: String,
    val areaConhecimento: String,
    val recursos: String,
    val rua: String,
	val numero: Int,
	val bairro: String,
	val cidade: String,
	val estado: String,
	val cep: Int
)

fun Biblioteca.toBibliotecaResponse(): BibliotecaResponse {
    return BibliotecaResponse(
        idBiblioteca = idBiblioteca,
        nome = nome,
        horarioFuncionamento = horarioFuncionamento,
        telefone = telefone,
        email = email,
        site = site,
        assuntos = assuntos,
        areaConhecimento = areaConhecimento,
        recursos = recursos,
        rua = rua,
		numero = numero,
		bairro = bairro,
		cidade = cidade,
		estado = estado,
		cep = cep
    )
}
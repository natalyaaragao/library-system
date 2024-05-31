package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Biblioteca

@Serializable
class BibliotecaRequest(
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

fun BibliotecaRequest.toBiblioteca(idBiblioteca: Int = 1): Biblioteca {
    return Biblioteca(
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
package com.example.models

import com.example.responses.EnderecoResponse

data class Endereco(
	val IdEndereco: Int,
	val Rua: String,
	val Numero: Int,
	val Bairro: String,
	val Cidade: String,
	val Estado: String,
	val Cep: Int
)

fun Endereco.toEnderecoResponse(): EnderecoResponse {
    return EnderecoResponse(
        IdEndereco = IdEndereco,
		Rua = Rua,
		Numero = Numero,
		Bairro = Bairro,
		Cidade = Cidade,
		Estado = Estado,
		Cep = Cep
    )
}

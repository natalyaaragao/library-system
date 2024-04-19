package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Endereco

@Serializable
class EnderecoRequest(
	val Rua: String,
	val Numero: Int,
	val Bairro: String,
	val Cidade: String,
	val Estado: String,
	val Cep: Int
)

fun EnderecoRequest.toEndereco(idEndereco: Int = 1): Endereco {
    return Endereco(
        IdEndereco = idEndereco,
		Rua = Rua,
		Numero = Numero,
		Bairro = Bairro,
		Cidade = Cidade,
		Estado = Estado,
		Cep = Cep
    )
}

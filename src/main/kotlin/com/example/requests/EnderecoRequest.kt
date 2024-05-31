package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Endereco

@Serializable
class EnderecoRequest(
	val rua: String,
	val numero: Int,
	val bairro: String,
	val cidade: String,
	val estado: String,
	val cep: Int
)

fun EnderecoRequest.toEndereco(idEndereco: Int = 1): Endereco {
    return Endereco(
        idEndereco = idEndereco,
		rua = rua,
		numero = numero,
		bairro = bairro,
		cidade = cidade,
		estado = estado,
		cep = cep
    )
}

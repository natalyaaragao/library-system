package com.example.models

import com.example.responses.EnderecoResponse
import kotlinx.serialization.Serializable

@Serializable
data class Endereco(
	val idEndereco: Int,
	val rua: String,
	val numero: Int,
	val bairro: String,
	val cidade: String,
	val estado: String,
	val cep: Int
)

fun Endereco.toEnderecoResponse(): EnderecoResponse {
    return EnderecoResponse(
        idEndereco = idEndereco,
		rua = rua,
		numero = numero,
		bairro = bairro,
		cidade = cidade,
		estado = estado,
		cep = cep
    )
}

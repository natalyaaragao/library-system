package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class MaterialResponse(
    val idMaterial: Int,
    val idSecao: Int,
    val titulo: String,
    val descricao: String,
    val tipoMaterial: String,
    val entradaPrincipal: String, 
    val idioma: String,
    val imprenta: String,
    val edicao: String,
    val nota: String,
    val assunto: String,
    val autorSecundario: String
)

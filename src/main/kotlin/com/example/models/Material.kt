package com.example.models

import com.example.responses.MaterialResponse
data class Material(
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

fun Material.toMaterialResponse(): MaterialResponse {
    return MaterialResponse(
        idMaterial = idMaterial,
        idSecao = idSecao,
        titulo = titulo,
        descricao = descricao,
        tipoMaterial = tipoMaterial, 
        entradaPrincipal = entradaPrincipal, 
        idioma = idioma,
        imprenta = imprenta,
        edicao = edicao,
        nota = nota,
        assunto = assunto,
        autorSecundario = autorSecundario
    )
}
package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Material

@Serializable
class MaterialRequest(
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

fun MaterialRequest.toMaterial(idMaterial: Int = 1): Material {
    return Material(
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


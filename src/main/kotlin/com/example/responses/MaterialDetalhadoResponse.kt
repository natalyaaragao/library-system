package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class MaterialDetalhadoResponse(
    val titulo: String,
    val descricao: String,
    val entradaPrincipal: String, 
    val imprenta: String,
    val edicao: String,
    val nota: String,
    val assunto: String,
    val localizacaoItem: String,
    val statusItem: Int,
    val colecao: String,
    val paginas: Int,
    val numReservas: Int,
    val codigoDeBarras: String,
    val nomeBiblioteca: String
)
package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class LocalizacaoItemResponse(
    val idLocalizacaoItem: Int,
    val idSecao: Int,
    val localizacao: String
)
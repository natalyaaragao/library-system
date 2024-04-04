package com.example.models

import com.example.responses.LocalizacaoItemResponse

data class LocalizacaoItem(
    val idLocalizacaoItem: Int,
    val idSecao: Int,
    val localizacao: String
)

fun LocalizacaoItem.toLocalizacaoItemResponse(): LocalizacaoItem {
    return LocalizacaoItem(
        idLocalizacaoItem = idLocalizacaoItem,
        idSecao = idSecao,
        localizacao = localizacao
    )
}
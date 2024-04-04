package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.LocalizacaoItem

@Serializable
class LocalizacaoItemRequest(
    val idSecao: Int,
    val localizacao: String
)

fun LocalizacaoItemRequest.toLocalizacaoItem(idLocalizacaoItem: Int  = 1): LocalizacaoItem {
    return LocalizacaoItem(
        idLocalizacaoItem = idLocalizacaoItem,
        idSecao = idSecao,
        localizacao = localizacao
    )
}
package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class ItemEmprestimoResponse(
    val IdItemMaterial: Int,
    val IdAdministrador: Int,
    val Devolucao: String,
    val Status: Int 
)

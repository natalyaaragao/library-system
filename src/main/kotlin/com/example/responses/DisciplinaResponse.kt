package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class DisciplinaResponse(
    val idDisciplina: String,
    val departamento: String,
    val idMaterial: Int
)
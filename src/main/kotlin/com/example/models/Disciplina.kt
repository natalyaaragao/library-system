package com.example.models

import com.example.responses.DisciplinaResponse

data class Disciplina(
    val idDisciplina: String,
    val departamento: String,
    val idMaterial: Int
)

fun Disciplina.toDisciplinaResponse(): DisciplinaResponse {
    return DisciplinaResponse(
        idDisciplina = idDisciplina,
        departamento = departamento,
        idMaterial = idMaterial
    )
}
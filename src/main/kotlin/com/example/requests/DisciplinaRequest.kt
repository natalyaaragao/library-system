package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.Disciplina

@Serializable
class DisciplinaRequest(
    val departamento: String,
    val idMaterial: Int
)

fun DisciplinaRequest.toDisciplina(idDisciplina: String = "MAC"): Disciplina {
    return Disciplina(
        idDisciplina = idDisciplina,
        departamento = departamento,
        idMaterial = idMaterial
    )
}
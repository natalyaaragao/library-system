package com.example.services

import com.example.models.Disciplina
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class DisciplinaService(database: Database) {

    private object Disciplinas : Table() {
        val idDisciplina = varchar("idDisciplina", 128)
        val departamento = varchar("departamento", 256)
        val idMaterial = integer("idMaterial")

        override val primaryKey = PrimaryKey(idDisciplina)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Disciplinas)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toDisciplina() = Disciplina(
        idDisciplina = this[Disciplinas.idDisciplina],
        departamento = this[Disciplinas.departamento],
        idMaterial = this[Disciplinas.idMaterial]
    )

    suspend fun allDisciplinas(): List<Disciplina> = dbQuery {
        DisciplinaService.Disciplinas.selectAll().map { row -> row.toDisciplina()}
    }

    suspend fun findDisciplina(idDisciplina: String): Disciplina? = dbQuery {
        Disciplinas
            .select { Disciplinas.idDisciplina eq idDisciplina}
            .map { row -> row.toDisciplina() }
            .singleOrNull()
    }

    suspend fun addNewDisciplina(disciplina: Disciplina): Disciplina = dbQuery {
        Disciplinas.insertIgnore {
            it[departamento] = disciplina.departamento
            it[idMaterial] = disciplina.idMaterial
        }.let {
            Disciplina(
                idDisciplina = it[DisciplinaService.Disciplinas.idDisciplina],
                departamento = it[DisciplinaService.Disciplinas.departamento],
                idMaterial = it[DisciplinaService.Disciplinas.idMaterial]
            )
        }
    }

    suspend fun editDisciplina(idDisciplina: String, departamento: String, idMaterial: Int): Boolean =
        dbQuery {
            Disciplinas.update({ Disciplinas.idDisciplina eq idDisciplina}) {
                it[Disciplinas.departamento] = departamento
                it[Disciplinas.idMaterial] = idMaterial
            } > 0
        }

    suspend fun deleteDisciplina(idDisciplina: String): Boolean = dbQuery {
        Disciplinas.deleteWhere { Disciplinas.idDisciplina eq idDisciplina } > 0
    }
}
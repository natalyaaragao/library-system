package com.example.services

import com.example.models.Material
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class MaterialService(database: Database) {
    private object Materiais : Table()  {
        val idMaterial = integer("idMaterial").autoIncrement()
        val titulo = varchar("titulo", 128)
        val descricao = varchar("descricao", 1024)

        override val primaryKey = PrimaryKey(idMaterial)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Materiais)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toMaterial() = Material(
        idMaterial = this[Materiais.idMaterial],
        titulo = this[Materiais.titulo],
        descricao = this[Materiais.descricao],
    )

    suspend fun allMateriais(): List<Material> = dbQuery {
        Materiais.selectAll().map{row -> row.toMaterial()}
    }

     suspend fun findMaterial(idMaterial: Int): Material? = dbQuery {
        Materiais
            .select { Materiais.idMaterial eq idMaterial }
            .map { row -> row.toMaterial() }
            .singleOrNull()
    }

    suspend fun addNewMaterial(material: Material): Material = dbQuery {
        Materiais.insertIgnore {
            it[titulo] = material.titulo
            it[descricao] = material.descricao
        }.let {
            Material(
                idMaterial = it[Materiais.idMaterial],
                titulo = it[Materiais.titulo],
                descricao = it[Materiais.descricao]
            )
        }
    }

    suspend fun editMaterial(idMaterial: Int, titulo: String, descricao: String): Boolean =
        dbQuery {
            Materiais.update({ Materiais.idMaterial eq idMaterial }) {
                it[Materiais.titulo] = titulo
                it[Materiais.descricao] = descricao
            } > 0
        }

    suspend fun deleteMaterial(idMaterial: Int): Boolean = dbQuery {
        Materiais.deleteWhere { Materiais.idMaterial eq idMaterial } > 0
    }
}
package com.example.dao

import com.example.dao.DatabaseSingleton.dbQuery
import com.example.models.*
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class DAOFacadeImpl() : DAOFacade {
    private fun resultRowToMaterial(row: ResultRow) = Material(
        idMaterial = row[Materiais.idMaterial],
        titulo = row[Materiais.titulo],
        descricao = row[Materiais.descricao],
    )

    override suspend fun allMateriais(): List<Material> = dbQuery {
        Materiais.selectAll().map(::resultRowToMaterial)
    }

    override suspend fun material(idMaterial: Int): Material? = dbQuery {
        Materiais
            .select { Materiais.idMaterial eq idMaterial }
            .map(::resultRowToMaterial)
            .singleOrNull()
    }

    override suspend fun addNewMaterial(titulo: String, descricao: String): Material? = dbQuery {
        val insertStatement = Materiais.insert {
            it[Materiais.titulo] = titulo
            it[Materiais.descricao] = descricao
        }
        insertStatement.resultedValues?.singleOrNull()?.let(::resultRowToMaterial)
    }

    override suspend fun editMaterial(idMaterial: Int, titulo: String, descricao: String): Boolean = dbQuery {
        Materiais.update({ Materiais.idMaterial eq idMaterial }) {
            it[Materiais.titulo] = titulo
            it[Materiais.descricao] = descricao
        } > 0
    }

    override suspend fun deleteMaterial(idMaterial: Int): Boolean = dbQuery {
        Materiais.deleteWhere { Materiais.idMaterial eq idMaterial } > 0
    }
}

val dao: DAOFacade = DAOFacadeImpl().apply {
    runBlocking {
        if(allMateriais().isEmpty()) {
            addNewMaterial("The drive to develop!", "...it's what keeps me going.")
        }
    }
}
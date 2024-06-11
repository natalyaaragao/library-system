package com.example.services

import com.example.models.Material
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class MaterialService(database: Database) {
    object Materiais : Table()  {
        val idMaterial = integer("idMaterial").autoIncrement()
        val idSecao = integer("idSecao")
        val titulo = varchar("titulo", 512)
        val descricao = varchar("descricao", 2048)
        val tipoMaterial = varchar("tipoMaterial", 1024)
        val entradaPrincipal = varchar("entradaPrincipal", 1024)
        val idioma = varchar("idioma", 256)
        val imprenta = varchar("imprenta", 2048)
        val edicao = varchar("edicao", 2048)
        val nota = varchar("nota", 2048)
        val assunto = varchar("assunto", 2048)
        val autorSecundario = varchar("autorSecundario", 2048)

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
        idSecao = this[Materiais.idSecao],
        titulo = this[Materiais.titulo],
        descricao = this[Materiais.descricao],
        tipoMaterial = this[Materiais.tipoMaterial], 
        entradaPrincipal = this[Materiais.entradaPrincipal], 
        idioma = this[Materiais.idioma],
        imprenta = this[Materiais.imprenta],
        edicao = this[Materiais.edicao],
        nota = this[Materiais.nota],
        assunto = this[Materiais.assunto],
        autorSecundario = this[Materiais.autorSecundario]
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
        Materiais.insert {
            it[idSecao] = material.idSecao
            it[titulo] = material.titulo
            it[descricao] = material.descricao
            it[Materiais.tipoMaterial] = material.tipoMaterial
            it[Materiais.entradaPrincipal] = material.entradaPrincipal
            it[Materiais.idioma] = material.idioma
            it[Materiais.imprenta] = material.imprenta
            it[Materiais.edicao] = material.edicao
            it[Materiais.nota] = material.nota
            it[Materiais.assunto] = material.assunto
            it[Materiais.autorSecundario] = material.autorSecundario
        }.let {
            Material(
                idMaterial = it[Materiais.idMaterial],
                idSecao = it[Materiais.idSecao],
                titulo = it[Materiais.titulo],
                descricao = it[Materiais.descricao],
                tipoMaterial = it[Materiais.tipoMaterial], 
                entradaPrincipal = it[Materiais.entradaPrincipal], 
                idioma = it[Materiais.idioma],
                imprenta = it[Materiais.imprenta],
                edicao = it[Materiais.edicao],
                nota = it[Materiais.nota],
                assunto = it[Materiais.assunto],
                autorSecundario = it[Materiais.autorSecundario]

            )
        }
    }

    suspend fun editMaterial(idMaterial: Int, titulo: String, descricao: String): Boolean =
        dbQuery {
            Materiais.update({ Materiais.idMaterial eq idMaterial }) {
                it[Materiais.idSecao] = idSecao
                it[Materiais.titulo] = titulo
                it[Materiais.descricao] = descricao
                it[Materiais.tipoMaterial] = tipoMaterial
                it[Materiais.entradaPrincipal] = entradaPrincipal
                it[Materiais.idioma] = idioma
                it[Materiais.imprenta] = imprenta
                it[Materiais.edicao] = edicao
                it[Materiais.nota] = nota
                it[Materiais.assunto] = assunto
                it[Materiais.autorSecundario] = autorSecundario
            } > 0
        }

    suspend fun deleteMaterial(idMaterial: Int): Boolean = dbQuery {
        Materiais.deleteWhere { Materiais.idMaterial eq idMaterial } > 0
    }
}
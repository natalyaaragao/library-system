package com.example.services

import com.example.models.Secao
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class SecaoService(database: Database) {
     object Secoes : Table()  {
        val idSecao = integer("idSecao").autoIncrement()
    	val idBiblioteca = integer("idBiblioteca")
    	val nomeSecao = varchar("nomeSecao", 256)
        val siglaSecao = varchar("siglaSecao", 16)
        override val primaryKey = PrimaryKey(idSecao)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Secoes)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toSecao() = Secao(
        idSecao = this[Secoes.idSecao],
        idBiblioteca = this[Secoes.idBiblioteca],
        nomeSecao = this[Secoes.nomeSecao],
        siglaSecao = this[Secoes.siglaSecao]
    )

    suspend fun allSecoes(): List<Secao> = dbQuery {
        Secoes.selectAll().map{row -> row.toSecao()}
    }

    suspend fun findSecao(idSecao: Int): Secao? = dbQuery {
        Secoes
            .select { Secoes.idSecao eq idSecao }
            .map { row -> row.toSecao() }
            .singleOrNull()
    }

    suspend fun findSecaoByBiblioteca(idBiblioteca: Int): List<Secao> = dbQuery {
        Secoes
            .select { Secoes.idBiblioteca eq idBiblioteca }
            .map { row -> row.toSecao() }
    }

    suspend fun addNewSecao(secao: Secao): Secao = dbQuery {
        Secoes.insert {
            it[idBiblioteca] = secao.idBiblioteca
            it[nomeSecao] = secao.nomeSecao
            it[siglaSecao] = secao.siglaSecao
        }.let {
            Secao(
                idSecao = it[Secoes.idSecao],
                idBiblioteca = it[Secoes.idBiblioteca],
            	nomeSecao = it[Secoes.nomeSecao],
                siglaSecao = it[Secoes.siglaSecao]
            )
        }
    }

    suspend fun editSecao(idSecao: Int, idBiblioteca: Int, nomeSecao: String): Boolean =
        dbQuery {
            Secoes.update({ Secoes.idSecao eq idSecao }) {
                it[Secoes.idBiblioteca] = idBiblioteca
                it[Secoes.nomeSecao] = nomeSecao
                it[Secoes.siglaSecao] = siglaSecao
            } > 0
        }

    suspend fun deleteSecao(idSecao: Int): Boolean = dbQuery {
        Secoes.deleteWhere { Secoes.idSecao eq idSecao } > 0
    }
}

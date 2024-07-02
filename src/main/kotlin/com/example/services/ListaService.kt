package com.example.services

import com.example.models.Lista
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class ListaService(database: Database) {
    private object Listas : Table()  {
        val idLista = integer("idLista").autoIncrement()
        val email = varchar("email", 128)
        val nomeLista = varchar("nomeLista", 1024)
        val tipoLista = varchar("tipoLista", 1024)
        
        override val primaryKey = PrimaryKey(idLista)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Listas)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toLista() = Lista(
        idLista = this[Listas.idLista],
        email = this[Listas.email],
        nomeLista = this[Listas.nomeLista],
        tipoLista = this[Listas.tipoLista]
    )

    suspend fun allListas(): List<Lista> = dbQuery {
        Listas.selectAll().map{row -> row.toLista()}
    }

    suspend fun findListaById(idLista: Int): Lista? = dbQuery {
        Listas
            .select { Listas.idLista eq idLista }
            .map { row -> row.toLista() }
            .singleOrNull()
    }

    suspend fun findListaByEmail(email: String): List<Lista> = dbQuery {
        Listas
            .select { Listas.email eq email }
            .map{row -> row.toLista()}
    }

    suspend fun addNewLista(lista: Lista): Lista = dbQuery {
        Listas.insert {
            it[email] = lista.email
            it[nomeLista] = lista.nomeLista
            it[tipoLista] = lista.tipoLista
        }.let {
            Lista(
                idLista = it[Listas.idLista],
                email = it[Listas.email],
                nomeLista = it[Listas.nomeLista],
                tipoLista = it[Listas.tipoLista]
            )
        }
    }

    suspend fun editLista(idLista: Int, email: String, nomeLista: String, tipoLista: String): Boolean =
        dbQuery {
            Listas.update({ Listas.idLista eq idLista }) {
                it[Listas.email] = email
                it[Listas.nomeLista] = nomeLista
                it[Listas.tipoLista] = tipoLista
            } > 0
        }

    suspend fun deleteLista(idLista: Int): Boolean = dbQuery {
        Listas.deleteWhere { Listas.idLista eq idLista } > 0
    }
}

package com.example.services

import com.example.models.Autor
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class AutorService(database: Database) {
    private object Autores : Table()  {
        val idAutor = integer("idAutor").autoIncrement()
        val nome = varchar("nome", 256)
        
        override val primaryKey = PrimaryKey(idAutor)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Autores)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toAutor() = Autor(
        idAutor = this[Autores.idAutor],
        nome = this[Autores.nome]
    )

    suspend fun allAutores(): List<Autor> = dbQuery {
        Autores.selectAll().map{row -> row.toAutor()}
    }

     suspend fun findAutor(idAutor: Int): Autor? = dbQuery {
        Autores
            .select { Autores.idAutor eq idAutor }
            .map { row -> row.toAutor() }
            .singleOrNull()
    }

    suspend fun addNewAutor(autor: Autor): Autor = dbQuery {
        Autores.insertIgnore {
            it[nome] = autor.nome
        }.let {
            Autor(
                idAutor = it[Autores.idAutor],
                nome = it[Autores.nome]
            )
        }
    }

    suspend fun editAutor(idAutor: Int, nome: String): Boolean =
        dbQuery {
            Autores.update({ Autores.idAutor eq idAutor }) {
                it[Autores.nome] = nome
            } > 0
        }

    suspend fun deleteAutor(idAutor: Int): Boolean = dbQuery {
        Autores.deleteWhere { Autores.idAutor eq idAutor } > 0
    }
}

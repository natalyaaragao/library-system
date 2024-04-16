package com.example.services

import com.example.models.Biblioteca
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

class BibliotecaService(database: Database) {

    private object Bibliotecas : Table()  {
        val idBiblioteca = integer("idBiblioteca").autoIncrement()
        val nome = varchar("nome", 512)
        val idEndereco = integer("idEndereco")
        val telefone = varchar("telefone", 20)
        val horarioFuncionamento = varchar("horarioFuncionamento", 50)
        val email = varchar("email", 125)

        override val primaryKey = PrimaryKey(idBiblioteca)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Bibliotecas)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toBiblioteca() = Biblioteca(
        idBiblioteca = this[Bibliotecas.idBiblioteca],
        nome = this[Bibliotecas.nome],
        idEndereco = this[Bibliotecas.idEndereco],
        telefone = this[Bibliotecas.telefone],
        horarioFuncionamento = this[Bibliotecas.horarioFuncionamento],
        email = this[Bibliotecas.email]
    )

    suspend fun allBiblioteca(): List<Biblioteca> = dbQuery {
        Bibliotecas.selectAll().map{row -> row.toBiblioteca()}
    }

    suspend fun findBiblioteca(idBiblioteca: Int): Biblioteca? = dbQuery {
        Bibliotecas
            .select { Bibliotecas.idBiblioteca eq idBiblioteca }
            .map { row -> row.toBiblioteca() }
            .singleOrNull()
    }

    suspend fun addNewBiblioteca(biblioteca: Biblioteca): Biblioteca = dbQuery {
        Bibliotecas.insertIgnore {
            it[nome] = biblioteca.nome
            it[idEndereco] = biblioteca.idEndereco
            it[telefone] = biblioteca.telefone
            it[horarioFuncionamento] = biblioteca.horarioFuncionamento
            it[email] = biblioteca.email
        }.let {
            Biblioteca(
                idBiblioteca = it[Bibliotecas.idBiblioteca],
                nome = it[Bibliotecas.nome],
                idEndereco = it[Bibliotecas.idEndereco],
                telefone = it[Bibliotecas.telefone],
                horarioFuncionamento = it[Bibliotecas.horarioFuncionamento],
                email = it[Bibliotecas.email]
            )
        }
    }

    suspend fun editMaterial(idBiblioteca: Int, nome: String, idEndereco: Int,
                             horarioFuncionamento: String, telefone: String, email: String,): Boolean =
        dbQuery {
            Bibliotecas.update({ Bibliotecas.idBiblioteca eq idBiblioteca }) {
                it[Bibliotecas.idBiblioteca] = idBiblioteca
                it[Bibliotecas.nome] = nome
                it[Bibliotecas.idEndereco] = idEndereco
                it[Bibliotecas.telefone] = telefone
                it[Bibliotecas.horarioFuncionamento] = horarioFuncionamento
                it[Bibliotecas.email] = email
            } > 0
        }

    suspend fun deleteBiblioteca(idBiblioteca: Int): Boolean = dbQuery {
        Bibliotecas.deleteWhere { Bibliotecas.idBiblioteca eq idBiblioteca } > 0
    }
}
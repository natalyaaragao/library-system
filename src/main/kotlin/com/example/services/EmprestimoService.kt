package com.example.services

import com.example.models.Emprestimo
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class EmprestimoService(database: Database) {
    private object Emprestimos : Table()  {
        val idEmprestimo = integer("idEmprestimo").autoIncrement()
        val idUsuario = varchar("idUsuario", 40)
        val statusUsuario = integer("statusUsuario")
        val qtdItens = integer("qtdItens")
        
        override val primaryKey = PrimaryKey(idEmprestimo)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Emprestimos)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toEmprestimo() = Emprestimo(
        idEmprestimo = this[Emprestimos.idEmprestimo],
        idUsuario = this[Emprestimos.idUsuario],
        statusUsuario = this[Emprestimos.statusUsuario],
        qtdItens = this[Emprestimos.qtdItens]
    )

    suspend fun allEmprestimos(): List<Emprestimo> = dbQuery {
        Emprestimos.selectAll().map{row -> row.toEmprestimo()}
    }

    suspend fun findEmprestimoById(idEmprestimo: Int): Emprestimo? = dbQuery {
        Emprestimos
            .select { Emprestimos.idEmprestimo eq idEmprestimo }
            .map { row -> row.toEmprestimo() }
            .singleOrNull()
    }

    suspend fun findEmprestimoByUsuario(idUsuario: String): Emprestimo? = dbQuery {
        Emprestimos
            .select { Emprestimos.idUsuario eq idUsuario }
            .map { row -> row.toEmprestimo() }
            .singleOrNull()
    }

    suspend fun addNewEmprestimo(emprestimo: Emprestimo): Emprestimo = dbQuery {
        Emprestimos.insert {
            it[idUsuario] = emprestimo.idUsuario
            it[statusUsuario] = emprestimo.statusUsuario
            it[qtdItens] = emprestimo.qtdItens
        }.let {
            Emprestimo(
                idEmprestimo = it[Emprestimos.idEmprestimo],
                idUsuario = it[Emprestimos.idUsuario],
                statusUsuario = it[Emprestimos.statusUsuario],
                qtdItens = it[Emprestimos.qtdItens]
            )
        }
    }

    suspend fun editEmprestimo(idEmprestimo: Int, emprestimo: Emprestimo): Boolean =
        dbQuery {
            Emprestimos.update({ Emprestimos.idEmprestimo eq idEmprestimo }) {
                it[Emprestimos.idUsuario] = emprestimo.idUsuario
                it[Emprestimos.statusUsuario] = emprestimo.statusUsuario
                it[Emprestimos.qtdItens] = emprestimo.qtdItens
            } > 0
        }

    suspend fun deleteEmprestimo(idEmprestimo: Int): Boolean = dbQuery {
        Emprestimos.deleteWhere { Emprestimos.idEmprestimo eq idEmprestimo } > 0
    }
}

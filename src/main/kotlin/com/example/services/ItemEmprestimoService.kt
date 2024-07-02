package com.example.services

import com.example.models.ItemEmprestimo
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class ItemEmprestimoService(database: Database) {
    private object ItemEmprestimos : Table()  {
        val idItemEmprestimo = integer("idItemEmprestimo").autoIncrement()
        val idItemMaterial = integer("idItemMaterial")
        val idEmprestimo = integer("idEmprestimo")
        val devolucao = varchar("devolucao", 128)
        val status = integer("status")
        val prazo = varchar("prazo", 128)
        
        override val primaryKey = PrimaryKey(idItemEmprestimo)
    }

    init {
        transaction(database) {
            SchemaUtils.create(ItemEmprestimos)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toItemEmprestimo() = ItemEmprestimo(
        idItemEmprestimo = this[ItemEmprestimos.idItemEmprestimo],
        idItemMaterial = this[ItemEmprestimos.idItemMaterial],
        idEmprestimo = this[ItemEmprestimos.idEmprestimo],
        devolucao = this[ItemEmprestimos.devolucao],
        status = this[ItemEmprestimos.status],
        prazo = this[ItemEmprestimos.prazo]
    )

    suspend fun allItemEmprestimos(): List<ItemEmprestimo> = dbQuery {
        ItemEmprestimos.selectAll().map{row -> row.toItemEmprestimo()}
    }

     suspend fun findItemEmprestimoById(idItemEmprestimo: Int): ItemEmprestimo? = dbQuery {
        ItemEmprestimos
            .select { ItemEmprestimos.idItemEmprestimo eq idItemEmprestimo }
            .map { row -> row.toItemEmprestimo() }
            .singleOrNull()
    }

    suspend fun findItemEmprestimoByEmprestimo(idEmprestimo: Int): List<ItemEmprestimo> = dbQuery {
        ItemEmprestimos
            .select { ItemEmprestimos.idEmprestimo eq idEmprestimo }
            .map { row -> row.toItemEmprestimo() }
    }

    suspend fun addNewItemEmprestimo(ItemEmprestimo: ItemEmprestimo): ItemEmprestimo = dbQuery {
        ItemEmprestimos.insert {
            it[idItemMaterial] = ItemEmprestimo.idItemMaterial
            it[idEmprestimo] = ItemEmprestimo.idEmprestimo
            it[devolucao] = ItemEmprestimo.devolucao
            it[status] = ItemEmprestimo.status
            it[prazo] = ItemEmprestimo.prazo
        }.let {
            ItemEmprestimo(
                idItemEmprestimo = it[ItemEmprestimos.idItemEmprestimo],
                idItemMaterial = it[ItemEmprestimos.idItemMaterial],
                idEmprestimo = it[ItemEmprestimos.idEmprestimo],
                devolucao = it[ItemEmprestimos.devolucao],
                status = it[ItemEmprestimos.status],
                prazo = it[ItemEmprestimos.prazo]
            )
        }
    }

    suspend fun editItemEmprestimo(idItemEmprestimo: Int, itemEmprestimo: ItemEmprestimo): Boolean =
        dbQuery {
            ItemEmprestimos.update({ ItemEmprestimos.idItemEmprestimo eq idItemEmprestimo }) {
                it[ItemEmprestimos.idItemMaterial] = itemEmprestimo.idItemMaterial 
                it[ItemEmprestimos.idEmprestimo] = itemEmprestimo.idEmprestimo
                it[ItemEmprestimos.devolucao] = itemEmprestimo.devolucao
                it[ItemEmprestimos.status] = itemEmprestimo.status
                it[ItemEmprestimos.prazo] = itemEmprestimo.prazo
            } > 0
        }

    suspend fun deleteItemEmprestimo(idItemEmprestimo: Int): Boolean = dbQuery {
        ItemEmprestimos.deleteWhere { ItemEmprestimos.idItemEmprestimo eq idItemEmprestimo } > 0
    }
}

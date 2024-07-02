package com.example.services

import com.example.models.ItemLista
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class ItemListaService(database: Database) {
    private object ItemListas : Table()  {
        val idItemLista = integer("idItemLista").autoIncrement()
        val idLista = integer("idLista")
        val nomeMaterial = varchar("nomeMaterial", 2048)
        
        override val primaryKey = PrimaryKey(idItemLista)
    }

    init {
        transaction(database) {
            SchemaUtils.create(ItemListas)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toItemLista() = ItemLista(
        idItemLista = this[ItemListas.idItemLista],
        idLista = this[ItemListas.idLista],
        nomeMaterial = this[ItemListas.nomeMaterial],
    )

    suspend fun allItemListas(): List<ItemLista> = dbQuery {
        ItemListas.selectAll().map{row -> row.toItemLista()}
    }

    suspend fun findItemListaById(idItemLista: Int): ItemLista? = dbQuery {
        ItemListas
            .select { ItemListas.idItemLista eq idItemLista }
            .map { row -> row.toItemLista() }
            .singleOrNull()
    }

    suspend fun findItemLista(idLista: Int): List<ItemLista> = dbQuery {
        ItemListas
            .select { ItemListas.idLista eq idLista }
            .map { row -> row.toItemLista() }
    }

    suspend fun addNewItemLista(itemLista: ItemLista): ItemLista = dbQuery {
        ItemListas.insert {
            it[idLista] = itemLista.idLista
            it[nomeMaterial] = itemLista.nomeMaterial
        }.let {
            ItemLista(
                idItemLista = it[ItemListas.idItemLista],
                idLista = it[ItemListas.idLista],
                nomeMaterial = it[ItemListas.nomeMaterial],
            )
        }
    }

    suspend fun editItemLista(idItemLista: Int, idLista: Int, nomeMaterial: String): Boolean =
        dbQuery {
            ItemListas.update({ ItemListas.idItemLista eq idItemLista }) {
                it[ItemListas.idLista] = idLista
                it[ItemListas.nomeMaterial] = nomeMaterial
            } > 0
        }

    suspend fun deleteItemLista(idItemLista: Int): Boolean = dbQuery {
        ItemListas.deleteWhere { ItemListas.idItemLista eq idItemLista } > 0
    }
}
 
package com.example.services

import com.example.models.ItemMaterial
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class ItemMaterialService(database: Database) {
    private object ItensMateriais : Table()  {
        val idItemMaterial = integer("idSecao").autoIncrement()
        val idLocalizacaoItem = integer("idLocalizacaoItem").autoIncrement()
        val statusItem = integer("statusItem")
        val colecao = varchar("colecao", 512)
        val paginas = integer("paginas")
        val numReservas = integer("numReservas")
        val codigoDeBarras = varchar("codigoDeBarras", 125)
        
        override val primaryKey = PrimaryKey(idItemMaterial)
    }

    init {
        transaction(database) {
            SchemaUtils.create(ItensMateriais)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toItemMaterial() = ItemMaterial(
        idItemMaterial = this[ItensMateriais.idItemMaterial],
        idLocalizacaoItem = this[ItensMateriais.idLocalizacaoItem],
        statusItem = this[ItensMateriais.statusItem],
        colecao = this[ItensMateriais.colecao],
        paginas = this[ItensMateriais.paginas],
        numReservas = this[ItensMateriais.numReservas],
        codigoDeBarras = this[ItensMateriais.codigoDeBarras]
    )

    suspend fun allItemMaterial(): List<ItemMaterial> = dbQuery {
        ItensMateriais.selectAll().map{row -> row.toItemMaterial()}
    }

     suspend fun findItemMaterial(idItemMaterial: Int): ItemMaterial? = dbQuery {
        ItensMateriais
            .select { ItensMateriais.idItemMaterial eq idItemMaterial }
            .map { row -> row.toItemMaterial() }
            .singleOrNull()
    }

    suspend fun addNewItemMaterial(itemMaterial: ItemMaterial): ItemMaterial = dbQuery {
        ItensMateriais.insertIgnore {
            it[idLocalizacaoItem] = itemMaterial.idLocalizacaoItem
            it[statusItem] = itemMaterial.statusItem
            it[colecao] = itemMaterial.colecao
            it[paginas] = itemMaterial.paginas
            it[numReservas] = itemMaterial.numReservas
            it[codigoDeBarras] = itemMaterial.codigoDeBarras
        }.let {
            ItemMaterial(
                idItemMaterial = it[ItensMateriais.idItemMaterial],                
                idLocalizacaoItem = it[ItensMateriais.idLocalizacaoItem],
                statusItem = it[ItensMateriais.statusItem],
                colecao = it[ItensMateriais.colecao],
                paginas = it[ItensMateriais.paginas],
                numReservas = it[ItensMateriais.numReservas],
                codigoDeBarras = it[ItensMateriais.codigoDeBarras]
            )
        }
    }

    suspend fun editItemMaterial(idItemMaterial: Int,idLocalizacaoItem: Int, statusItem: Int,
                          colecao: String, paginas: Int, numReservas: Int, codigoDeBarras: String): Boolean =
        dbQuery {
            ItensMateriais.update({ ItensMateriais.idItemMaterial eq idItemMaterial }) {
                it[ItensMateriais.idLocalizacaoItem] = idLocalizacaoItem
                it[ItensMateriais.statusItem] = statusItem
                it[ItensMateriais.colecao] = colecao
                it[ItensMateriais.paginas] = paginas
                it[ItensMateriais.numReservas] = numReservas
                it[ItensMateriais.codigoDeBarras] = codigoDeBarras
            } > 0
        }

    suspend fun deleteItemMaterial(idItemMaterial: Int): Boolean = dbQuery {
        ItensMateriais.deleteWhere { ItensMateriais.idItemMaterial eq idItemMaterial } > 0
    }
}

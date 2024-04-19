package com.example.services

import com.example.models.LocalizacaoItem
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class LocalizacaoItemService(database: Database) {
    private object LocalizacaoItens: Table() {
        val idLocalizacaoItem = integer("idLocalizacaoItem").autoIncrement()
        val idSecao = integer("idSecao")
        val localizacao = varchar("localizacao", 128)

        override val primaryKey = PrimaryKey(idLocalizacaoItem)
    }

    init {
        transaction(database) {
            SchemaUtils.create(LocalizacaoItens)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toLocalizacaoItem() = LocalizacaoItem(
        idLocalizacaoItem = this[LocalizacaoItens.idLocalizacaoItem],
        idSecao = this[LocalizacaoItens.idSecao],
        localizacao = this[LocalizacaoItens.localizacao]
    )

    suspend fun allLocalizacaoItens(): List<LocalizacaoItem> = dbQuery {
        LocalizacaoItens.selectAll().map{row -> row.toLocalizacaoItem()}
    }

    suspend fun findLocalizacaoItem(idLocalizacaoItem: Int): LocalizacaoItem? = dbQuery {
        LocalizacaoItens
            .select { LocalizacaoItens.idLocalizacaoItem eq idLocalizacaoItem }
            .map { row -> row.toLocalizacaoItem() }
            .singleOrNull()
    }

    suspend fun addNewLocalizacaoItem(localizacaoItem: LocalizacaoItem): LocalizacaoItem = dbQuery {
        LocalizacaoItens.insertIgnore {
            it[idSecao] = localizacaoItem.idSecao
            it[localizacao] = localizacaoItem.localizacao
        }.let {
            LocalizacaoItem(
                idLocalizacaoItem = it[LocalizacaoItens.idLocalizacaoItem],
                idSecao = it[LocalizacaoItens.idSecao],
                localizacao = it[LocalizacaoItens.localizacao]
            )
        }
    }

    suspend fun editLocalizacaoItem(idLocalizacaoItem: Int, idSecao: Int, localizacao: String): Boolean =
        dbQuery {
            LocalizacaoItens.update({ LocalizacaoItens.idLocalizacaoItem eq idLocalizacaoItem }) {
                it[LocalizacaoItens.idSecao] = idSecao
                it[LocalizacaoItens.localizacao] = localizacao
            } > 0
        }

    suspend fun deleteLocalizacaoItem(idLocalizacaoItem: Int): Boolean = dbQuery {
        LocalizacaoItens.deleteWhere { LocalizacaoItens.idLocalizacaoItem eq idLocalizacaoItem } > 0
    }
}
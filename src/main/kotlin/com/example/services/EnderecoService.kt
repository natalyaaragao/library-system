package com.example.services

import com.example.models.Endereco
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

class EnderecoService(database: Database) {

    object Enderecos : Table()  {
        val idEndereco = integer("idEndereco").autoIncrement()
        val rua = varchar("rua", 1024)
        val numero = integer("numero")
        val bairro = varchar("bairro", 512)
        val cidade = varchar("cidade", 512)
        val estado = varchar("estado", 128)
        val cep = integer("cep")
        
        override val primaryKey = PrimaryKey(idEndereco)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Enderecos)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    fun ResultRow.toEndereco() = Endereco(
        idEndereco = this[Enderecos.idEndereco],
		rua = this[Enderecos.rua],
		numero = this[Enderecos.numero],
		bairro = this[Enderecos.bairro],
		cidade = this[Enderecos.cidade],
		estado = this[Enderecos.estado],
		cep = this[Enderecos.cep]
    )

    suspend fun allEndereco(): List<Endereco> = dbQuery {
        Enderecos.selectAll().map{row -> row.toEndereco()}
    }

    suspend fun findEndereco(idEndereco: Int): Endereco? = dbQuery {
        Enderecos
            .select { Enderecos.idEndereco eq idEndereco }
            .map { row -> row.toEndereco() }
            .singleOrNull()
    }

    suspend fun addNewEndereco(endereco: Endereco): Endereco = dbQuery {
        Enderecos.insert {
            it[idEndereco] = endereco.idEndereco
            it[rua] = endereco.rua
            it[numero] = endereco.numero
            it[bairro] = endereco.bairro
            it[cidade] = endereco.cidade
            it[estado] = endereco.estado
            it[cep] = endereco.cep
            
        }.let {
            Endereco(
                idEndereco = it[Enderecos.idEndereco],
                rua = it[Enderecos.rua],
                numero = it[Enderecos.numero],
                bairro = it[Enderecos.bairro],
                cidade = it[Enderecos.cidade],
                estado = it[Enderecos.estado],
                cep = it[Enderecos.cep]
            )
        }
    }

    suspend fun editEndereco(idEndereco: Int, rua: String, numero: Int, bairro: String, 
                            cidade: String, estado: String, cep: Int): Boolean =
        dbQuery {
            Enderecos.update({ Enderecos.idEndereco eq idEndereco }) {
                it[Enderecos.idEndereco] = idEndereco
                it[Enderecos.rua] = rua
                it[Enderecos.numero] = numero 
                it[Enderecos.bairro] = bairro
                it[Enderecos.cidade] = cidade
                it[Enderecos.estado] = estado
                it[Enderecos.cep] = cep
            } > 0
        }
}
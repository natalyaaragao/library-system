package com.example.services

import com.example.models.Biblioteca
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

class BibliotecaService(database: Database) {

     object Bibliotecas : Table()  {
        val idBiblioteca = integer("idBiblioteca").autoIncrement()
        val nome = varchar("nome", 512)
        val telefone = varchar("telefone", 64)
        val horarioFuncionamento = varchar("horarioFuncionamento", 512)
        val email = varchar("email", 125)
        val site = varchar("site", 256)
        val assuntos = varchar("assuntos", 512)
        val areaConhecimento = varchar("areaConhecimento", 512) 
        val recursos = varchar("recursos", 512)
        val rua = varchar("rua", 1024)
        val numero = integer("numero")
        val bairro = varchar("bairro", 512)
        val cidade = varchar("cidade", 512)
        val estado = varchar("estado", 128)
        val cep = integer("cep")

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
        telefone = this[Bibliotecas.telefone],
        horarioFuncionamento = this[Bibliotecas.horarioFuncionamento],
        email = this[Bibliotecas.email],
        site = this[Bibliotecas.site],
        assuntos = this[Bibliotecas.assuntos],
        areaConhecimento = this[Bibliotecas.areaConhecimento], 
        recursos = this[Bibliotecas.recursos],
        rua = this[Bibliotecas.rua], 
        numero = this[Bibliotecas.numero], 
        bairro = this[Bibliotecas.bairro], 
        cidade = this[Bibliotecas.cidade], 
        estado = this[Bibliotecas.estado],  
        cep = this[Bibliotecas.cep]
    )

    suspend fun allBiblioteca(): List<Biblioteca> = dbQuery {
        Bibliotecas.selectAll().map { row -> row.toBiblioteca() }
    }

    /*suspend fun getBibliotecaByCidade(cidade: String): List<Biblioteca> = dbQuery {
        Bibliotecas
            .select { Bibliotecas.cidade eq cidade }
            .map { row -> row.toBiblioteca() }
            .singleOrNull()
    }*/

    suspend fun findBiblioteca(idBiblioteca: Int): Biblioteca? = dbQuery {
        Bibliotecas
            .select { Bibliotecas.idBiblioteca eq idBiblioteca }
            .map { row -> row.toBiblioteca() }
            .singleOrNull()
    }

    suspend fun addNewBiblioteca(biblioteca: Biblioteca): Biblioteca = dbQuery {
        Bibliotecas.insert {
            it[nome] = biblioteca.nome
            it[telefone] = biblioteca.telefone
            it[horarioFuncionamento] = biblioteca.horarioFuncionamento
            it[email] = biblioteca.email
            it[site] = biblioteca.site
            it[assuntos] = biblioteca.assuntos
            it[areaConhecimento] = biblioteca.areaConhecimento 
            it[recursos] = biblioteca.recursos
            it[rua] = biblioteca.rua 
            it[numero] = biblioteca.numero
            it[bairro] = biblioteca.bairro
            it[cidade] = biblioteca.cidade
            it[estado] = biblioteca.estado
            it[cep] = biblioteca.cep
        }.let {
            Biblioteca(
                idBiblioteca = it[Bibliotecas.idBiblioteca],
                nome = it[Bibliotecas.nome],
                telefone = it[Bibliotecas.telefone],
                horarioFuncionamento = it[Bibliotecas.horarioFuncionamento],
                email = it[Bibliotecas.email],
                site = it[Bibliotecas.site],
                assuntos = it[Bibliotecas.assuntos],
                areaConhecimento = it[Bibliotecas.areaConhecimento], 
                recursos = it[Bibliotecas.recursos],
                rua = it[Bibliotecas.rua], 
                numero = it[Bibliotecas.numero], 
                bairro = it[Bibliotecas.bairro], 
                cidade = it[Bibliotecas.cidade], 
                estado = it[Bibliotecas.estado],  
                cep = it[Bibliotecas.cep]
            )
        }
    }
    
    suspend fun editBiblioteca(idBiblioteca: Int, biblioteca: Biblioteca): Boolean =
        dbQuery {
            Bibliotecas.update({ Bibliotecas.idBiblioteca eq idBiblioteca }) {
                it[Bibliotecas.idBiblioteca] = idBiblioteca
                it[Bibliotecas.nome] = biblioteca.nome
                it[Bibliotecas.telefone] = biblioteca.telefone
                it[Bibliotecas.horarioFuncionamento] = biblioteca.horarioFuncionamento
                it[Bibliotecas.email] = biblioteca.email
                it[Bibliotecas.site] = biblioteca.site
                it[Bibliotecas.assuntos] = biblioteca.assuntos
                it[Bibliotecas.areaConhecimento] = biblioteca.areaConhecimento 
                it[Bibliotecas.recursos] = biblioteca.recursos
                it[Bibliotecas.rua] = biblioteca.rua 
                it[Bibliotecas.numero] = biblioteca.numero
                it[Bibliotecas.bairro] = biblioteca.bairro 
                it[Bibliotecas.cidade] = biblioteca.cidade 
                it[Bibliotecas.estado] = biblioteca.estado 
                it[Bibliotecas.cep] = biblioteca.cep 
            } > 0
        }

    suspend fun deleteBiblioteca(idBiblioteca: Int): Boolean = dbQuery {
        Bibliotecas.deleteWhere { Bibliotecas.idBiblioteca eq idBiblioteca } > 0   
    }
}
package com.example.services

import com.example.models.Usuario
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class UsuarioService(database: Database) {
    private object Usuarios : Table() {
        val idUsuario = integer("idUsuario").autoIncrement()
        val nome = varchar("nome", 256)
        val cpf = varchar("cpf", 15)
        val nusp = integer("nusp")
        val telefone = varchar("telefone", 15)
        val email = varchar("email", 128)
        val rua = varchar("rua", 1024)
        val numero = integer("numero")
        val bairro = varchar("bairro", 512)
        val cidade = varchar("cidade", 512)
        val estado = varchar("estado", 128)
        val cep = integer("cep")

        override val primaryKey = PrimaryKey(idUsuario)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Usuarios)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toUsuario() = Usuario(
        idUsuario = this[Usuarios.idUsuario],
        nome = this[Usuarios.nome],
        cpf = this[Usuarios.cpf],
        nusp = this[Usuarios.nusp],
        telefone = this[Usuarios.telefone],
        email = this[Usuarios.email],
        rua = this[Usuarios.rua], 
        numero = this[Usuarios.numero], 
        bairro = this[Usuarios.bairro], 
        cidade = this[Usuarios.cidade], 
        estado = this[Usuarios.estado],  
        cep = this[Usuarios.cep]
    )

    suspend fun allUsuarios(): List<Usuario> = dbQuery {
        Usuarios.selectAll().map{ row -> row.toUsuario()}
    }

    suspend fun findUsuario(idUsuario: Int): Usuario? = dbQuery {
        Usuarios
            .select { Usuarios.idUsuario eq idUsuario }
            .map { row -> row.toUsuario() }
            .singleOrNull()
    }

    suspend fun addNewUsuario(usuario: Usuario): Usuario = dbQuery {
        Usuarios.insert {
            it[nome] = usuario.nome
            it[cpf] = usuario.cpf
            it[nusp] = usuario.nusp
            it[telefone] = usuario.telefone
            it[email] = usuario.email
            it[rua] = usuario.rua 
            it[numero] = usuario.numero
            it[bairro] = usuario.bairro
            it[cidade] = usuario.cidade
            it[estado] = usuario.estado
            it[cep] = usuario.cep
        }.let {
            Usuario(
                idUsuario = it[Usuarios.idUsuario],
                nome = it[Usuarios.nome],
                cpf = it[Usuarios.cpf],
                nusp = it[Usuarios.nusp],
                telefone = it[Usuarios.telefone],
                email = it[Usuarios.email],
                rua = it[Usuarios.rua], 
                numero = it[Usuarios.numero], 
                bairro = it[Usuarios.bairro], 
                cidade = it[Usuarios.cidade], 
                estado = it[Usuarios.estado],  
                cep = it[Usuarios.cep]
            )
        }
    }

    suspend fun editUsuario(idUsuario: Int, usuario: Usuario): Boolean =
        dbQuery {
            Usuarios.update({ Usuarios.idUsuario eq idUsuario }) {
                it[Usuarios.nome] = usuario.nome
                it[Usuarios.cpf] = usuario.cpf
                it[Usuarios.nusp] = usuario.nusp
                it[Usuarios.telefone] = usuario.telefone
                it[Usuarios.email] = usuario.email
                it[Usuarios.rua] = usuario.rua 
                it[Usuarios.numero] = usuario.numero
                it[Usuarios.bairro] = usuario.bairro 
                it[Usuarios.cidade] = usuario.cidade 
                it[Usuarios.estado] = usuario.estado 
                it[Usuarios.cep] = usuario.cep 
            } > 0
        }

    suspend fun deleteUsuario(idUsuario: Int): Boolean = dbQuery {
        Usuarios.deleteWhere { Usuarios.idUsuario eq idUsuario } > 0
    }

}
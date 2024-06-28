package com.example.services

import com.example.models.Usuario
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.util.*

class UsuarioService(database: Database) {
    private object Usuarios : Table() {
        val idUsuario = uuid("idUsuario")
        val nome = varchar("nome", 256)
        val email = varchar("email", 128)
        val senha = varchar("senha", 128)
        val role = varchar("role", 64)

        override val primaryKey = PrimaryKey(idUsuario)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Usuarios)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private val users = mutableListOf(
        Usuario(UUID.randomUUID(), "admin", "email@admin.com", "password", "ADMIN")
    )

    private fun ResultRow.toUsuario() = Usuario(
        idUsuario = this[Usuarios.idUsuario],
        nome = this[Usuarios.nome],
        email = this[Usuarios.email],
        senha = this[Usuarios.senha],
        role = this[Usuarios.role], 
    )

    suspend fun allUsuarios(): List<Usuario> = dbQuery {
        Usuarios.selectAll().map{ row -> row.toUsuario()}
    }

    suspend fun findUsuarioById(idUsuario: UUID): Usuario? = dbQuery {
        Usuarios
            .select { Usuarios.idUsuario eq idUsuario }
            .map { row -> row.toUsuario() }
            .singleOrNull()
    }

    suspend fun findUsuarioByEmail(email: String): Usuario? = dbQuery {
        Usuarios
            .select { Usuarios.email eq email }
            .map { row -> row.toUsuario() }
            .singleOrNull()
    }

    suspend fun checkUsuario(email: String): Boolean = dbQuery {
        Usuarios.select { Usuarios.email eq email }.empty().not()
    }

    suspend fun addNewUsuario(usuario: Usuario): Usuario = dbQuery {
        Usuarios.insert {
            it[idUsuario] = usuario.idUsuario
            it[nome] = usuario.nome
            it[email] = usuario.email
            it[senha] = usuario.senha 
            it[role] = usuario.role
        }.let {
            Usuario(
                idUsuario = it[Usuarios.idUsuario],
                nome = it[Usuarios.nome],
                email = it[Usuarios.email],
                senha = it[Usuarios.senha], 
                role = it[Usuarios.role]
            )
        }
    }

    suspend fun editUsuario(usuario: Usuario): Boolean =
        dbQuery {
            Usuarios.update({ Usuarios.email eq usuario.email }) {
                it[Usuarios.nome] = usuario.nome
                it[Usuarios.email] = usuario.email
                it[Usuarios.senha] = usuario.senha 
                it[Usuarios.role] = usuario.role
            } > 0
        }

    suspend fun deleteUsuario(idUsuario: UUID): Boolean = dbQuery {
        Usuarios.deleteWhere { Usuarios.idUsuario eq idUsuario } > 0
    }

}
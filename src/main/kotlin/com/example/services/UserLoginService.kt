package com.example.services

import com.example.models.UserLogin
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.util.*

class UserLoginService(database: Database) {
    object Users : Table()  {
        val idUserLogin = uuid("idUserLogin")
        val email = varchar("email", 255)
        val senha = varchar("senha", 128)

        override val primaryKey = PrimaryKey(idUserLogin)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Users)
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toUserLogin() = UserLogin(
        idUserLogin = this[Users.idUserLogin],
        email = this[Users.email],
        senha = this[Users.senha],
    )

    suspend fun allUsersLogin(): List<UserLogin> = dbQuery {
        Users.selectAll().map{row -> row.toUserLogin()}
    }

    suspend fun findUserLoginById(idUserLogin: UUID): UserLogin? = dbQuery {
        Users
            .select { Users.idUserLogin eq idUserLogin }
            .map { row -> row.toUserLogin() }
            .singleOrNull()
    }

    suspend fun findUserLoginByEmail(email: String): UserLogin? = dbQuery {
        Users
            .select { Users.email eq email }
            .map { row -> row.toUserLogin() }
            .singleOrNull()
    }

    suspend fun checkUser(email: String): Boolean = dbQuery {
        Users.select { Users.email eq email }.empty().not()
    }

    suspend fun addUserLogin(user: UserLogin): UserLogin = dbQuery {
        Users.insert {
            it[idUserLogin] = user.idUserLogin
            it[email] = user.email
            it[senha] = user.senha
        }.let {
            UserLogin(
                idUserLogin = it[Users.idUserLogin],
                email = it[Users.email],
                senha = it[Users.senha]
            )
        }
    }

    suspend fun editUserLogin(email: String, senha: String): Boolean =
        dbQuery {
            Users.update({ Users.email eq email }) {
                it[Users.senha] = senha
            } > 0
    }

    suspend fun deleteUserLogin(idUserLogin: UUID): Boolean = dbQuery {
        Users.deleteWhere { Users.idUserLogin eq idUserLogin } > 0
    }
}

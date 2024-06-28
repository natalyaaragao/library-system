package com.example.requests

import kotlinx.serialization.Serializable
import com.example.models.UserLogin
import java.util.UUID

@Serializable
class UserLoginRequest(
    val email: String,
    val senha: String
)

fun UserLoginRequest.toUserLogin(
    idUserLogin: UUID = UUID.randomUUID()
): UserLogin {
    return UserLogin(
        idUserLogin = idUserLogin,
        email = email,
        senha = senha
    )
}
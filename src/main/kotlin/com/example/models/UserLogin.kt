package com.example.models

import com.example.responses.UserLoginResponse
import java.util.*

data class UserLogin(
    val idUserLogin: UUID = UUID.randomUUID(),
    val email: String,
    val senha: String
)

fun UserLogin.toUserLoginResponse(): UserLoginResponse {
    return UserLoginResponse(
        idUserLogin = idUserLogin.toString(),
        email = email,
        senha = senha
    )
}

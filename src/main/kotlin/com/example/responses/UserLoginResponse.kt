package com.example.responses

import kotlinx.serialization.Serializable

@Serializable
class UserLoginResponse(
    val idUserLogin: String,
    val email: String,
    val senha: String
)
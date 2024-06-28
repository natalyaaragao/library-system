package com.example.response

import kotlinx.serialization.Serializable

@Serializable
data class RefreshTokenResponse(
    val token: String
)
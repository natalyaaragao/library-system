package com.example.services

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.example.models.UserLogin
import com.example.requests.UserLoginRequest
import com.example.services.UserLoginService
import io.ktor.server.application.*
import io.ktor.server.auth.jwt.*
import java.util.*

class JwtService(
    private val application: Application,
) {

    private val secret = "secret" //getConfigProperty("jwt.secret")
    private val issuer = "http://localhost:8080/" //getConfigProperty("jwt.issuer")
    private val audience = "my-audience" //getConfigProperty("jwt.audience")

    val realm = "My realm" //getConfigProperty("jwt.realm")

    val jwtVerifier: JWTVerifier =
        JWT
            .require(Algorithm.HMAC256(secret))
            .withAudience(audience)
            .withIssuer(issuer)
            .build()

    suspend fun createJwtToken(email: String, role: String): String? {
        return JWT.create()
            .withAudience(audience)
            .withIssuer(issuer)
            .withClaim("email", email)
            .withClaim("role", role)
            .withExpiresAt(Date(System.currentTimeMillis() + (5 * 60 * 1000)))
            .sign(Algorithm.HMAC256(secret))
    }

    private fun audienceMatches(
        credential: JWTCredential,
    ): Boolean =
        credential.payload.audience.contains(audience)

    private fun getConfigProperty(path: String) =
        application.environment.config.property(path).getString()

    private fun extractEmail(credential: JWTCredential): String? =
        credential.payload.getClaim("email").asString()
}
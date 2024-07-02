package com.example

import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.testing.*
import kotlinx.serialization.*
import kotlinx.serialization.json.*
import kotlin.test.*
import com.example.requests.SecaoRequest

class SecaoTest {
    val secao = SecaoRequest(
        idBiblioteca = 1,
        nomeSecao = "Seção de teste",
        siglaSecao = "A123"
    )

    @Test
    fun testGetAll() = testApplication {
        val response = client.get("/secoes")
        assertEquals(HttpStatusCode.OK, response.status)
    }

    @Test
    fun testPost() = testApplication {
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }

        val response = client.post("/secoes") {
            contentType(ContentType.Application.Json)
            setBody(secao)
        }
        assertEquals(HttpStatusCode.Created, response.status)
    }

}
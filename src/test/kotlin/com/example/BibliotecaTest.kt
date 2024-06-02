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
import com.example.requests.BibliotecaRequest

class BibliotecaTest {
    val biblioteca = BibliotecaRequest(
        nome = "Biblioteca Teste",
        horarioFuncionamento = "Seg-Sab: 8:00-18:00",
        telefone = "(11) 91234-5678",
        email = "email@usp.br",
        site = "site.com",
        assuntos = "História, Geografia",
        areaConhecimento = "Humanas",
        recursos = "Sala de estudos",
        rua = "Avenida principal",
        numero = 123,
        bairro = "Centro",
        cidade = "São Paulo",
        estado = "SP",
        cep = 12345000
    )

    @Test
    fun testGetAll() = testApplication {
        val response = client.get("/bibliotecas")
        assertEquals(HttpStatusCode.OK, response.status)
    }

    @Test
    fun testPost() = testApplication {
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }
        val response = client.post("/bibliotecas") {
            contentType(ContentType.Application.Json)
            setBody(biblioteca)
        }
        assertEquals(HttpStatusCode.Created, response.status)
    }
}
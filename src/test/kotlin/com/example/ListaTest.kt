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
import com.example.models.toListaResponse
import com.example.requests.ListaRequest
import com.example.requests.toLista

class ListaTest {
    val lista = ListaRequest(
        email = "usuario@email.com.br",
        nomeLista = "Lista de estudos",
        tipoLista = "Estudo"
    )

    @Test
    fun testGetAll() = testApplication {
        val response = client.get("/listas")
        assertEquals(HttpStatusCode.OK, response.status)
    }

    @Test
    fun testPost() = testApplication {
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }
        val response = client.post("/listas") {
            contentType(ContentType.Application.Json)
            setBody(lista)
        }

        assertEquals(HttpStatusCode.Created, response.status)
    }

}
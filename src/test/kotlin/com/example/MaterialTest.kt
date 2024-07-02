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
import com.example.requests.MaterialRequest

class MaterialTest {
    val material = MaterialRequest(
        idSecao = 1,
        titulo = "Título do material",
        descricao = "Descrição do material",
        tipoMaterial = "Livro",
        entradaPrincipal = "Autor principal", 
        idioma = "Português",
        imprenta = "Rio de Janeiro",
        edicao = "1ª",
        nota = "Alguma nota sobre o livro",
        assunto = "Geral",
        autorSecundario = "Outro autor"
    )

    @Test
    fun testGetAll() = testApplication {
        val response = client.get("/materiais")
        assertEquals(HttpStatusCode.OK, response.status)
    }

    @Test
    fun testPost() = testApplication {
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }
        val response = client.post("/materiais") {
            contentType(ContentType.Application.Json)
            setBody(material)
        }
        assertEquals(HttpStatusCode.Created, response.status)
    }

}
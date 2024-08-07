package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.Database
import com.example.services.*
import com.example.modules.*

fun Application.configureRouting(jwtService: JwtService, database: Database) {
    configureMaterialRouting(MaterialService(database))
    configureAutorRouting(AutorService(database))
    configureUsuarioRouting(UsuarioService(database))
    configureDisciplinaRouting(DisciplinaService(database))
    configureBibliotecaRouting(BibliotecaService(database))
    configureSecaoRouting(SecaoService(database))
    configureExemplarRouting(ItemMaterialService(database))
    configureMaterialDetalhadoRouting(MaterialDetalhadoService(database))
    configureListaRouting(ListaService(database))
    configureItemListaRouting(ItemListaService(database))
    configureEmprestimoRouting(EmprestimoService(database))
    configureItemEmprestimoRouting(ItemEmprestimoService(database))
    //configureUserLoginRouting(UserLoginService(database))
    configureAuthRouting(jwtService, UsuarioService(database))
}

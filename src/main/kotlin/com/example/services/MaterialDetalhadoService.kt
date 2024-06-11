package com.example.services

import com.example.models.Biblioteca
import com.example.models.MaterialDetalhado
import com.example.services.MaterialService.Materiais
import com.example.services.ItemMaterialService.ItensMateriais
import com.example.services.SecaoService.Secoes
import com.example.services.BibliotecaService.Bibliotecas
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class MaterialDetalhadoService(database: Database) {
    init {
        transaction(database) {
            SchemaUtils.create(ItensMateriais, Materiais, Secoes, Bibliotecas)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    private fun ResultRow.toMaterialDetalhado() = MaterialDetalhado(
        titulo = this[Materiais.titulo],
        descricao = this[Materiais.descricao],
        entradaPrincipal = this[Materiais.entradaPrincipal],
        imprenta = this[Materiais.imprenta],
        edicao = this[Materiais.edicao],
        nota = this[Materiais.nota],
        assunto = this[Materiais.assunto],
        localizacaoItem = this[ItensMateriais.localizacaoItem],
        statusItem = this[ItensMateriais.statusItem],
        colecao = this[ItensMateriais.colecao],
        paginas = this[ItensMateriais.paginas],
        numReservas = this[ItensMateriais.numReservas],
        codigoDeBarras = this[ItensMateriais.codigoDeBarras],
        nomeBiblioteca = this[Bibliotecas.nome]
    )

    suspend fun findMaterialDetalhado(idMaterial: Int): List<MaterialDetalhado> = dbQuery {
        ItensMateriais
            .innerJoin(Materiais, { ItensMateriais.idMaterial }, { Materiais.idMaterial })
            .innerJoin(Secoes, { Materiais.idSecao }, { Secoes.idSecao })
            .innerJoin(Bibliotecas, { Secoes.idBiblioteca }, { Bibliotecas.idBiblioteca })
            .slice(
                Materiais.titulo,
                Materiais.descricao,
                Materiais.entradaPrincipal,
                Materiais.imprenta,
                Materiais.edicao,
                Materiais.nota,
                Materiais.assunto,
                ItensMateriais.localizacaoItem,
                ItensMateriais.statusItem,
                ItensMateriais.colecao,
                ItensMateriais.paginas,
                ItensMateriais.numReservas,
                ItensMateriais.codigoDeBarras,
                Bibliotecas.nome
            )
            .select {
                (Materiais.idMaterial eq idMaterial) and
                (ItensMateriais.idMaterial eq Materiais.idMaterial) and
                (Materiais.idSecao eq Secoes.idSecao) and
                (Secoes.idBiblioteca eq Bibliotecas.idBiblioteca)
            }
            .map { row -> row.toMaterialDetalhado() }
    }
}
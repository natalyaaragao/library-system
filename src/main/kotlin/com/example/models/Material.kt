package com.example.models

import org.jetbrains.exposed.sql.*

data class Material(val idMaterial: Int, val titulo: String, val descricao: String)

object Materiais : Table()  {
    val idMaterial = integer("idMaterial").autoIncrement()
    val titulo = varchar("titulo", 128)
    val descricao = varchar("descricao", 1024)

    override val primaryKey = PrimaryKey(idMaterial)
}
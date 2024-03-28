package com.example.dao

import com.example.models.*

interface DAOFacade {
    suspend fun allMateriais(): List<Material>
    suspend fun material(idMaterial: Int): Material?
    suspend fun addNewMaterial(titulo: String, descricao: String): Material?
    suspend fun editMaterial(idMaterial: Int, titulo: String, descricao: String): Boolean
    suspend fun deleteMaterial(idMaterial: Int): Boolean
}
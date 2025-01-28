package com.example.pizzariaapi.dto

import java.time.LocalDateTime

data class VendaResponseDTO(
    val id: Long?,
    val clienteNome: String,
    val pizzaNome: String,
    val quantidade: Int,
    val valorTotal: Double,
    val dataVenda: String // Adiciona o campo dataVenda como String
)

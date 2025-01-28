package com.example.pizzariaapi.dto

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull

data class VendaRequestDTO(
    @field:NotNull(message = "O ID do cliente é obrigatório")
    val idCliente: Long,

    @field:NotNull(message = "O ID da pizza é obrigatório")
    val idPizza: Long,

    @field:Min(value = 1, message = "A quantidade deve ser maior que zero")
    val quantidade: Int
)


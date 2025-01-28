package com.example.pizzariaapi.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

@Entity
@Table(name = "cliente")
data class Cliente(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val idCliente: Long? = null,

    @field:NotBlank(message = "O nome do cliente não pode estar em branco")
    val nome: String,

    @field:Size(min = 10, max = 15, message = "O telefone deve ter entre 10 e 15 caracteres")
    val telefone: String? = null,

    @field:Size(max = 255, message = "O endereço não pode ter mais que 255 caracteres")
    val endereco: String? = null
) {

}

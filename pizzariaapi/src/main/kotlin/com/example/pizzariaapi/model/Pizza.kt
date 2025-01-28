package com.example.pizzariaapi.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.util.Base64

@Entity
@Table(name = "pizza")
data class Pizza(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPizza")
    val id: Long? = null,

    @field:NotBlank(message = "O nome da pizza não pode estar em branco")
    val nome: String,

    @field:Size(max = 500, message = "A descrição não pode ter mais que 500 caracteres")
    val descricao: String,

    @field:NotNull(message = "O preço não pode ser nulo")
    val preco: Double,

    val imagem: ByteArray? = null
) {
    fun getImagemBase64(): String? {
        return imagem?.let { Base64.getEncoder().encodeToString(it) }
    }
}

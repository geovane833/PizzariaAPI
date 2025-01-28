package com.example.pizzariaapi.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "venda")
data class Venda(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDVenda")
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "IDCliente", referencedColumnName = "IDCliente")
    val cliente: Cliente,

    @ManyToOne
    @JoinColumn(name = "IDPizza", referencedColumnName = "IDPizza")
    val pizza: Pizza,

    val quantidade: Int,

    @Column(name = "ValorTotal", nullable = false)
    val valorTotal: Double,

    @Column(name = "DataVenda", insertable = false, updatable = false)
    val dataVenda: java.time.LocalDateTime? = null // JPA não manipula este campo
)

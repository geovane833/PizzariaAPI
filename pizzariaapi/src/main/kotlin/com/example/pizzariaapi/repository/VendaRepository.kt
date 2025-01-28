package com.example.pizzariaapi.repository

import com.example.pizzariaapi.model.Venda
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface VendaRepository : JpaRepository<Venda, Long> // Alterado para Long

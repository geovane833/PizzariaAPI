package com.example.pizzariaapi.repository

import com.example.pizzariaapi.model.Cliente
import org.springframework.data.jpa.repository.JpaRepository

interface ClienteRepository : JpaRepository<Cliente, Long>

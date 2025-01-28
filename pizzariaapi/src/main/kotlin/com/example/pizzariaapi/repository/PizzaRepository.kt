package com.example.pizzariaapi.repository

import com.example.pizzariaapi.model.Pizza
import org.springframework.data.jpa.repository.JpaRepository

interface PizzaRepository : JpaRepository<Pizza, Long>

package com.example.pizzariaapi.service

import com.example.pizzariaapi.model.Pizza
import com.example.pizzariaapi.repository.PizzaRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class PizzaService(private val pizzaRepository: PizzaRepository) {
    fun listarTodas(): List<Pizza> = pizzaRepository.findAll()

    fun salvar(pizza: Pizza): Pizza = pizzaRepository.save(pizza)

    // Buscar pizza por ID
    @Transactional
    fun buscarPizzaPorId(id: Long): Pizza {
        return pizzaRepository.findById(id).orElseThrow {
            throw NoSuchElementException("Pizza com ID $id não encontrada.")
        }
    }
}

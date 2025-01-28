package com.example.pizzariaapi.controller

import com.example.pizzariaapi.model.Pizza
import com.example.pizzariaapi.service.PizzaService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/pizzas")
class PizzaController(private val pizzaService: PizzaService) {

    @GetMapping
    fun listarTodas() = pizzaService.listarTodas()

    @PostMapping
    fun salvar(@RequestBody pizza: Pizza) = pizzaService.salvar(pizza)

    // Método para buscar pizza por ID
    @GetMapping("/{id}")
    fun buscarPizzaPorId(@PathVariable id: Long): Pizza = pizzaService.buscarPizzaPorId(id)
}

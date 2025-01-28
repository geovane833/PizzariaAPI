package com.example.pizzariaapi.controller

import com.example.pizzariaapi.model.Cliente
import com.example.pizzariaapi.service.ClienteService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/clientes")
class ClienteController(private val clienteService: ClienteService) {
    @GetMapping
    fun listarTodos() = clienteService.listarTodos()

    @PostMapping
    fun salvar(@RequestBody cliente: Cliente) = clienteService.salvar(cliente)

    // Buscar cliente por ID
    @GetMapping("/{id}")
    fun buscarClientePorId(@PathVariable id: Long): Cliente {
        return clienteService.buscarClientePorId(id)
    }
}

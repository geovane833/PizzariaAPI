package com.example.pizzariaapi.service

import com.example.pizzariaapi.model.Cliente
import com.example.pizzariaapi.repository.ClienteRepository
import org.springframework.stereotype.Service

@Service
class ClienteService(private val clienteRepository: ClienteRepository) {
    fun listarTodos(): List<Cliente> = clienteRepository.findAll()

    fun salvar(cliente: Cliente): Cliente = clienteRepository.save(cliente)

    // Buscar cliente por ID
    fun buscarClientePorId(id: Long): Cliente {
        return clienteRepository.findById(id).orElseThrow {
            RuntimeException("Cliente não encontrado com id: $id")
        }
    }
}

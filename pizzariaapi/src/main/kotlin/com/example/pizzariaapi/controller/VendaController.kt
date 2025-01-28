package com.example.pizzariaapi.controller

import com.example.pizzariaapi.dto.VendaRequestDTO
import com.example.pizzariaapi.dto.VendaResponseDTO
import com.example.pizzariaapi.service.VendaService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/vendas")
class VendaController(
    private val vendaService: VendaService
) {

    // Endpoint para registrar venda
    @PostMapping("/registrar")
    fun registrarVenda(@RequestBody vendaRequest: VendaRequestDTO): ResponseEntity<String> {
        try {
            vendaService.registrarVenda(vendaRequest)
            // Retorne uma resposta de sucesso (por exemplo, status 200)
            return ResponseEntity.ok("Venda registrada com sucesso")
        } catch (e: Exception) {
            // Retorne uma resposta de erro (por exemplo, status 400)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao registrar venda: ${e.message}")
        }
    }

    // Endpoint para listar vendas
    @GetMapping("/listar")
    fun listarVendas(): ResponseEntity<List<VendaResponseDTO>> {
        return try {
            val vendas = vendaService.listarVendas()
            ResponseEntity.ok(vendas)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null)
        }
    }

}

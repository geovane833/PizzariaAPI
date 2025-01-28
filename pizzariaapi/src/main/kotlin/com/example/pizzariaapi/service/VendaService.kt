package com.example.pizzariaapi.service

import com.example.pizzariaapi.dto.VendaRequestDTO
import com.example.pizzariaapi.dto.VendaResponseDTO
import com.example.pizzariaapi.model.Venda
import com.example.pizzariaapi.repository.ClienteRepository
import com.example.pizzariaapi.repository.PizzaRepository
import com.example.pizzariaapi.repository.VendaRepository
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter

@Service
class VendaService(
    private val vendaRepository: VendaRepository,
    private val pizzaRepository: PizzaRepository,
    private val clienteRepository: ClienteRepository
) {

    // Registrar uma nova venda
    fun registrarVenda(vendaRequest: VendaRequestDTO) {
        // Validação do cliente
        val cliente = clienteRepository.findById(vendaRequest.idCliente).orElseThrow {
            Exception("Cliente não encontrado")
        }
        println("Cliente encontrado: ${cliente.idCliente}, ${cliente.nome}")

        // Validação da pizza
        val pizza = pizzaRepository.findById(vendaRequest.idPizza).orElseThrow {
            Exception("Pizza não encontrada")
        }
        println("Pizza encontrada: ${pizza.id}, ${pizza.nome}, Preço: ${pizza.preco}")

        // Verificar se o preço da pizza é válido
        if (pizza.preco <= 0) {
            throw Exception("O preço da pizza é inválido ou zero")
        }

        // Validação da quantidade
        if (vendaRequest.quantidade <= 0) {
            throw Exception("A quantidade deve ser maior que zero")
        }
        println("Quantidade de pizzas: ${vendaRequest.quantidade}")

        // Calcular o valor total
        val valorTotal = calcularValorTotal(pizza.preco, vendaRequest.quantidade)
        println("Valor total calculado: $valorTotal")

        // Verificação de valorTotal nulo ou inválido
        if (valorTotal <= 0) {
            throw Exception("Valor total inválido ou zero")
        }

        // Criação e salvamento da venda
        val venda = Venda(
            cliente = cliente,
            pizza = pizza,
            quantidade = vendaRequest.quantidade,
            valorTotal = valorTotal
            // O campo dataVenda será preenchido automaticamente pelo banco
        )
        println("Registrando venda: ${venda.cliente.idCliente}, ${venda.pizza.id}, ${venda.quantidade}, ${venda.valorTotal}")
        vendaRepository.save(venda)

    }

    // Calcular o valor total da venda
    fun calcularValorTotal(precoPizza: Double, quantidade: Int): Double {
        // Verificando se o precoPizza não é nulo ou zero
        if (precoPizza <= 0) {
            throw Exception("Preço da pizza inválido ou zero")
        }

        // Calcular o valor total com base no preço e na quantidade
        val valorTotal = precoPizza * quantidade

        // Exibir valor total calculado para depuração
        println("Valor total calculado: $valorTotal")

        return valorTotal
    }

    // Listar as vendas com a data formatada
    fun listarVendas(): List<VendaResponseDTO> {
        val vendas = vendaRepository.findAll() // Supondo que você tenha um repositório para buscar as vendas

        return vendas.map { venda ->
            val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")

            // Usando o operador seguro ?. para verificar se dataVenda não é nulo
            val dataVendaFormatada = venda.dataVenda?.format(formatter) ?: "Data não disponível"

            VendaResponseDTO(
                id = venda.id,
                clienteNome = venda.cliente.nome,
                pizzaNome = venda.pizza.nome,
                quantidade = venda.quantidade,
                valorTotal = venda.valorTotal,
                dataVenda = dataVendaFormatada // A data da venda formatada ou mensagem de erro
            )
        }
    }

}

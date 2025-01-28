const API_URL = "http://localhost:8080/pizzas"; // URL base da API

// Carregar lista de pizzas ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarPizzas();

    // Adicionar evento ao formulário
    const form = document.getElementById("formPizza");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await registrarPizza();
    });
});

// Função para carregar pizzas
async function carregarPizzas() {
    try {
        const response = await fetch("http://localhost:8080/pizzas");
        const pizzas = await response.json();

        const listaPizzas = document.getElementById("pizzas");
        listaPizzas.innerHTML = "";

        pizzas.forEach((pizza) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${pizza.nome}</h3>
                <p>${pizza.descricao}</p>
                <p>Preço: R$ ${pizza.preco.toFixed(2)}</p>
            `;

            // Adiciona a imagem, se existir
            if (pizza.imagemBase64) {
                const img = document.createElement("img");
                img.src = `data:image/jpeg;base64,${pizza.imagemBase64}`;
                img.alt = `Imagem de ${pizza.nome}`;
                img.style.width = "200px";
                img.style.height = "auto";
                li.appendChild(img);
            }

            listaPizzas.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar pizzas:", error);
    }
}

// Função para registrar uma nova pizza
async function registrarPizza() {
    const form = document.getElementById("formPizza");
    const formData = new FormData(form);

    const novaPizza = {
        nome: formData.get("nome"),
        descricao: formData.get("descricao"),
        preco: parseFloat(formData.get("preco")),
    };

    // Adicionar imagem, se existir
    const imagem = formData.get("imagem");
    if (imagem && imagem.size > 0) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            novaPizza.imagem = Array.from(new Uint8Array(reader.result));
            await enviarPizza(novaPizza);
        };
        reader.readAsArrayBuffer(imagem);
    } else {
        await enviarPizza(novaPizza);
    }
}

// Função para enviar pizza para a API
async function enviarPizza(pizza) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pizza),
        });

        if (response.ok) {
            alert("Pizza registrada com sucesso!");
            carregarPizzas(); // Atualizar lista

            // Fechar o modal de registro de pizza
            document.getElementById("modalPizza").style.display = "none";
        } else {
            const error = await response.text();
            console.error("Erro ao registrar pizza:", error);
            alert("Erro ao registrar pizza.");
        }
    } catch (error) {
        console.error("Erro ao registrar pizza:", error);
        alert("Erro ao registrar pizza.");
    }
}

// Abrir e fechar modais
document.getElementById("abrirModalPizza").addEventListener("click", () => {
    document.getElementById("modalPizza").style.display = "flex";
});
document.getElementById("fecharModalPizza").addEventListener("click", () => {
    document.getElementById("modalPizza").style.display = "none";
});

document.getElementById("abrirModalCliente").addEventListener("click", () => {
    document.getElementById("modalCliente").style.display = "flex";
});
document.getElementById("fecharModalCliente").addEventListener("click", () => {
    document.getElementById("modalCliente").style.display = "none";
});

document.getElementById("abrirModalVenda").addEventListener("click", () => {
    document.getElementById("modalVenda").style.display = "flex";
});
document.getElementById("fecharModalVenda").addEventListener("click", () => {
    document.getElementById("modalVenda").style.display = "none";
});


document.getElementById("abrirListaVendas").addEventListener("click", () => {
    document.getElementById("listaVendas").classList.remove("hidden");
    document.getElementById("listaClientes").classList.add("hidden");  // Esconde a lista de clientes
});


// Função para registrar um novo cliente
async function registrarCliente() {
    const form = document.getElementById("formCliente");
    const formData = new FormData(form);

    const novoCliente = {
        nome: formData.get("nomeCliente"),
        telefone: formData.get("telefoneCliente"),
        endereco: formData.get("enderecoCliente"),
    };

    try {
        const response = await fetch("http://localhost:8080/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(novoCliente),
        });

        if (response.ok) {
            alert("Cliente cadastrado com sucesso!");
            form.reset(); // Limpa o formulário após o cadastro
            document.getElementById("modalCliente").style.display = "none"; // Fecha o modal
        } else {
            const error = await response.text();
            console.error("Erro ao cadastrar cliente:", error);
            alert("Erro ao cadastrar cliente.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        alert("Erro ao cadastrar cliente.");
    }
}

// Adicionar evento ao formulário de cliente
document.getElementById("formCliente").addEventListener("submit", async (event) => {
    event.preventDefault();
    await registrarCliente();
});



document.getElementById("abrirListaClientes").addEventListener("click", () => {
    document.getElementById("listaClientes").classList.add("show");
    carregarClientes(); // Carregar clientes ao abrir a lista
});

// Fechar o modal de clientes
document.getElementById("fecharModalClientes").addEventListener("click", () => {
    document.getElementById("listaClientes").classList.remove("show");
});

// Carregar lista de clientes (já está no seu código)
async function carregarClientes() {
    try {
        const response = await fetch("http://localhost:8080/clientes");
        const clientes = await response.json();

        const listaClientes = document.getElementById("clientes");
        listaClientes.innerHTML = ""; // Limpar lista antes de adicionar novos clientes

        clientes.forEach((cliente) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${cliente.nome}</h3>
                <p>Telefone: ${cliente.telefone}</p>
                <p>Endereço: ${cliente.endereco}</p>
            `;
            listaClientes.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

async function carregarClientesNoSelect() {
    try {
        const response = await fetch("http://localhost:8080/clientes");
        const clientes = await response.json();

        const selectCliente = document.getElementById("cliente");
        selectCliente.innerHTML = '<option value="" disabled selected>Selecione um cliente</option>'; // Placeholder

        clientes.forEach((cliente) => {
            const option = document.createElement("option");

            // Define o ID como o valor da opção
            option.value = cliente.idCliente; // Certifique-se de que a API retorna "idCliente" corretamente

            // Exibe o nome e outros detalhes no texto da opção
            option.textContent = `${cliente.nome} - ID: ${cliente.idCliente}, Tel: ${cliente.telefone}, Endereço: ${cliente.endereco}`;
            
            selectCliente.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

async function carregarPizzasNoSelect() {
    try {
        const response = await fetch("http://localhost:8080/pizzas");
        const pizzas = await response.json();

        const selectProduto = document.getElementById("produto");
        selectProduto.innerHTML = '<option value="" disabled selected>Selecione uma pizza</option>';

        pizzas.forEach((pizza) => {
            const option = document.createElement("option");
            option.value = pizza.id; // Presume-se que a pizza tenha um campo `id`
            option.textContent = `${pizza.nome} - R$ ${pizza.preco.toFixed(2)}`;
            selectProduto.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar pizzas:", error);
    }
}

// Função para registrar uma nova venda
async function registrarVenda() {
    const form = document.getElementById("formVenda");
    const formData = new FormData(form);

    const venda = {
        idCliente: formData.get("cliente"), // Renomeado para idCliente
        idPizza: formData.get("produto"),  // Renomeado para idPizza
        quantidade: parseInt(formData.get("quantidade")),
    };    

    // Adicionando logs para verificar o que está sendo enviado
    console.log("Dados enviados para o backend:");
    console.log("Cliente ID:", venda.clienteId);
    console.log("Produto ID:", venda.produtoId);
    console.log("Quantidade:", venda.quantidade);

    try {
        const response = await fetch("http://localhost:8080/vendas/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(venda), // Envia a venda como JSON
        });

        if (response.ok) {
            alert("Venda registrada com sucesso!");
            form.reset(); // Limpa o formulário após o registro
            document.getElementById("modalVenda").style.display = "none"; // Fecha o modal
        } else {
            const error = await response.text();
            console.error("Erro ao registrar venda:", error);
            alert("Erro ao registrar venda: " + error);
        }
    } catch (error) {
        console.error("Erro ao registrar venda:", error);
        alert("Erro ao registrar venda.");
    }
}

// Adicionar evento ao formulário de venda
document.getElementById("formVenda").addEventListener("submit", async (event) => {
    event.preventDefault();
    await registrarVenda();
});

document.getElementById("produto").addEventListener("change", calcularValorTotal);
document.getElementById("quantidade").addEventListener("input", calcularValorTotal);

async function calcularValorTotal() {
    const selectProduto = document.getElementById("produto");
    const quantidade = parseInt(document.getElementById("quantidade").value) || 0;

    if (selectProduto.value) {
        try {
            const response = await fetch(`http://localhost:8080/pizzas/${selectProduto.value}`);
            const pizza = await response.json();

            const valorTotal = quantidade * pizza.preco;
            document.getElementById("valorTotal").value = `R$ ${valorTotal.toFixed(2)}`;
        } catch (error) {
            console.error("Erro ao calcular valor total:", error);
        }
    }
}

document.getElementById("abrirModalVenda").addEventListener("click", () => {
    document.getElementById("modalVenda").style.display = "flex";

    // Carregar os clientes e produtos nos selects
    carregarClientesNoSelect();
    carregarPizzasNoSelect();
});



// Função para carregar a lista de vendas
const modal = document.getElementById("listaVendas");
const btnAbrirLista = document.getElementById("abrirListaVendas");
const btnFecharLista = document.getElementById("fecharListaVendas");

// Função para abrir o modal e carregar as vendas
btnAbrirLista.addEventListener("click", function() {
    carregarVendas(); // Carregar as vendas quando abrir o modal
    modal.classList.remove("hidden"); // Exibir o modal removendo a classe "hidden"
    modal.style.display = "flex"; // Garantir que o modal seja exibido com display flex
});

// Função para fechar o modal
btnFecharLista.addEventListener("click", function() {
    modal.classList.add("hidden"); // Esconde o modal adicionando a classe "hidden"
    modal.style.display = "none"; // Garantir que o modal seja ocultado
});

// Fechar o modal quando clicar fora da área do modal
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.classList.add("hidden");
        modal.style.display = "none";
    }
});

// Função para carregar as vendas no modal
async function carregarVendas() {
    try {
        const response = await fetch("http://localhost:8080/vendas/listar");
        
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        
        const vendas = await response.json();

        const vendasList = document.getElementById("Vendas");
        vendasList.innerHTML = ''; // Limpar a lista antes de adicionar os novos itens

        // Função para formatar a data
        function formatarData(data) {
            // Tenta converter a data em um formato "dd/MM/yyyy HH:mm"
            const partesData = data.split(' '); // Separar data e hora
            const partesDataDiaMesAno = partesData[0].split('/'); // Separar dd/MM/yyyy
            const partesHora = partesData[1].split(':'); // Separar HH:mm

            const dia = partesDataDiaMesAno[0];
            const mes = partesDataDiaMesAno[1] - 1; // Meses começam em 0 no JavaScript
            const ano = partesDataDiaMesAno[2];
            const horas = partesHora[0];
            const minutos = partesHora[1];

            // Criar um objeto Date com os componentes extraídos
            const date = new Date(ano, mes, dia, horas, minutos);

            if (isNaN(date.getTime())) { // Verifica se a data é inválida
                return "Data inválida";
            }

            return `${String(dia).padStart(2, '0')}/${String(mes + 1).padStart(2, '0')}/${ano} ${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
        }

        // Preencher a lista com as vendas
        vendas.forEach(venda => {
            const li = document.createElement("li");

            li.innerHTML = ` 
                <strong>Venda #${venda.id}</strong><br>
                Cliente: ${venda.clienteNome}<br>
                Pizza: ${venda.pizzaNome}<br>
                Quantidade: ${venda.quantidade}<br>
                Total: R$ ${venda.valorTotal.toFixed(2)}<br>
                Data: ${formatarData(venda.dataVenda)}<br>
            `;
            vendasList.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao carregar vendas:", error);
    }
}

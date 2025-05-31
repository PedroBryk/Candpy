// Função chamada ao clicar no botão "Adicionar"
function adicionaProduto(event) {
  event.preventDefault(); // Evita que a página seja recarregada ao clicar

  // Recupera os produtos já armazenados no localStorage ou inicia com lista vazia
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Encontra o elemento pai mais próximo com a classe "produto" (onde estão os dados)
  const produtoElemento = event.target.closest(".produto");

  // Se não encontrou o elemento, encerra a função
  if (!produtoElemento) return;

  // Cria um objeto com nome e preço do produto selecionado
  const produto = {
    nome: produtoElemento.querySelector(".produto__titulo").textContent, // Pega o nome do produto
    preco: produtoElemento.querySelector(".produto__preco").textContent  // Pega o preço do produto
  };

  // Adiciona o novo produto à lista existente
  produtos.push(produto);

  // Salva a lista atualizada de produtos no localStorage em formato texto (JSON)
  localStorage.setItem("produtos", JSON.stringify(produtos));

  exibirProdutos(); // Atualiza a lista de produtos na tela
}

// Adiciona o evento de clique a todos os botões com a classe "add__btn"
document.querySelectorAll(".add__btn").forEach(button => {
  button.addEventListener("click", adicionaProduto); // Cada botão chama a função adicionaProduto ao ser clicado
});

// Função que exibe os produtos adicionados na tela e calcula o valor total + frete
function exibirProdutos() {
  // Recupera os produtos armazenados no localStorage ou inicia com lista vazia
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Seleciona a div onde os produtos serão listados
  const lista = document.getElementById("listaProdutos");

  // Seleciona o elemento onde será exibido o valor total
  const valorTotalEl = document.getElementById("valorTotal");

  // Seleciona o elemento onde será exibida a info sobre frete grátis
  const freteGratisEl = document.getElementById("freteGratis");

  lista.innerHTML = ""; // Limpa a área da lista para evitar duplicações

  let total = 0; // Inicializa a variável do valor total dos produtos

  if (produtos.length === 0) {
    // Se o carrinho está vazio, mostra mensagem
    lista.innerHTML = `<p style="text-align:center; font-style: italic; color: #555;">O carrinho está vazio.</p>`;
  } else {
    // Percorre todos os produtos da lista
    produtos.forEach((produto, index) => {
      const card = document.createElement("div"); // Cria um elemento div
      card.className = "produto-card"; // Define a classe para o estilo

      // Define o conteúdo HTML do produto com nome, preço e botão de excluir
      card.innerHTML = `
        <h3 class="produto__titulo">${produto.nome}</h3>
        <p>Valor R$: ${produto.preco}</p>
        <button class="btn__principal" onclick="excluirProduto(${index})">Excluir</button>
      `;

      lista.appendChild(card); // Adiciona o card à lista na tela

      // Converte o preço de string (ex: "R$ 29,99") para número (ex: 29.99)
      const precoNumerico = parseFloat(produto.preco.replace("R$", "").replace(",", ".").trim());

      // Se for um número válido, adiciona ao total
      if (!isNaN(precoNumerico)) {
        total += precoNumerico;
      }
    });
  }

  // Atualiza o conteúdo do elemento com o valor total formatado com vírgula
  valorTotalEl.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;

  // Verifica se o valor total é maior ou igual a 30 para aplicar frete grátis
  freteGratisEl.textContent = total >= 30
    ? "Frete grátis: Elegível" // Mostra que tem frete grátis
    : "Frete grátis: Não elegível"; // Mostra que não tem

  // Seleciona o botão de finalizar compra
  const botaoFinalizar = document.getElementById("botao__finalizar");

  // Adiciona a ação ao botão para verificar se o carrinho está vazio
  botaoFinalizar.addEventListener("click", function() {
    if (total != 0) {
      alert("Compra poderá ser finalizada!"); // Se tem produtos, mostra alerta de sucesso
    } else {
      alert("O carrinho está vazio!"); // Se não tem produtos, alerta o usuário
    }
  });
}

// Função para remover um produto do carrinho
function excluirProduto(index) {
  // Recupera a lista atual de produtos
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  produtos.splice(index, 1); // Remove o produto na posição "index"

  // Atualiza o localStorage com a nova lista de produtos
  localStorage.setItem("produtos", JSON.stringify(produtos));

  exibirProdutos(); // Atualiza a tela após a exclusão
}

// Quando a página carrega, exibe os produtos que estavam salvos
window.onload = () => {
  exibirProdutos(); // Chama a função assim que a página abrir
};

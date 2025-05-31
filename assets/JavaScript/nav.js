const toggleBtn = document.querySelector('.toggle');

const menu = document.querySelector('nav.menu');

toggleBtn.addEventListener('click', function(){

    menu.classList.toggle('active');
    
});

// Exemplo de programação assíncrona

function alternarCor() {
    const texto = document.getElementById("promocao__texto");

    // Verifica a cor atual
    const corAtual = texto.style.color;

    // Alterna entre preto e amarelo
    texto.style.color = (corAtual === "yellow") ? "#f0dede" : "yellow";

    // Chama novamente após 1 segundo
    setTimeout(alternarCor, 1000);

  }

  // Inicia o loop ao carregar a página
  window.onload = () => {
    alternarCor();
  };
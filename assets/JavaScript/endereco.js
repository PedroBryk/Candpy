function preencheEndereco(event) {
    event.preventDefault();

    // Pegando valores dos inputs
    let endereco = {
        bairro: document.getElementById("bairro").value,
        rua: document.getElementById("rua").value, // Corrigido: antes estava pegando "bairro" novamente
        numero: document.getElementById("numero").value,
        recebedor: document.getElementById("nomeRecebedor").value
    };

    // Preenchendo os elementos HTML com os valores
    document.getElementById("bairroPreenche").textContent = `Bairro: ${endereco.bairro}`;
    document.getElementById("ruaPreenche").textContent = `Rua: ${endereco.rua}`;
    document.getElementById("numeroPreenche").textContent = `Número: ${endereco.numero}`;
    document.getElementById("recebedorPreenche").textContent = `Recebedor: ${endereco.recebedor}`;
};

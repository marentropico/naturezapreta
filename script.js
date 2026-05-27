// Clicar no H1 muda a cor para azul, clicar de novo retorna para a cor original

// Variável para controlar o estado da cor
let azul = false;

// Adiciona um evento de clique ao elemento H1
document.querySelector('h1').addEventListener

// Função que alterna a cor do texto
('click', function() {

    // Verifica o estado atual da cor
    if (azul) {

        // Se a cor for azul, muda para a cor original
        this.style.color = '#008d2c';

        // Atualiza o estado para indicar que a cor não é mais azul
        azul = false;

    // Se a cor não for azul, muda para azul
    } else {

        // Muda a cor para azul
        this.style.color = '#037c94';

        // Atualiza o estado para indicar que a cor é azul
        azul = true;
    }
});


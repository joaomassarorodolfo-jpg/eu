
// ========================================
// SITE JOÃO VITOR MASSARO
// JavaScript principal
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ====================================
    // MENU RESPONSIVO
    // ====================================

    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            const aberto = menu.classList.toggle("ativo");

            menuToggle.setAttribute("aria-expanded", String(aberto));
            menuToggle.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );

            menuToggle.textContent = aberto ? "✕" : "☰";
        });

        const links = menu.querySelectorAll("a");

        links.forEach((link) => {
            link.addEventListener("click", () => {
                menu.classList.remove("ativo");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
                menuToggle.textContent = "☰";
            });
        });
    }

    // ====================================
    // ANO AUTOMÁTICO DO RODAPÉ
    // ====================================

    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    // ====================================
    // JOGO DE ADIVINHAÇÃO
    // ====================================

    const formulario = document.getElementById("form-jogo");
    const input = document.getElementById("palpite");
    const resultado = document.getElementById("resultado");
    const contador = document.getElementById("tentativas");
    const botaoEnviar = document.getElementById("enviar");
    const botaoReiniciar = document.getElementById("reiniciar");

    if (
        !formulario ||
        !input ||
        !resultado ||
        !contador ||
        !botaoEnviar ||
        !botaoReiniciar
    ) {
        return;
    }

    let numeroSecreto;
    let tentativas;
    let jogoFinalizado;

    // GERA UM NÚMERO ALEATÓRIO
    function gerarNumero() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // EXIBE AS MENSAGENS DO JOGO
    function mostrarMensagem(mensagem, tipo = "") {
        resultado.textContent = mensagem;
        resultado.className = "resultado";

        if (tipo) {
            resultado.classList.add(tipo);
        }
    }

    // INICIA OU REINICIA O JOGO
    function iniciarJogo() {
        numeroSecreto = gerarNumero();
        tentativas = 0;
        jogoFinalizado = false;

        contador.textContent = tentativas;

        input.value = "";
        input.disabled = false;
        botaoEnviar.disabled = false;

        mostrarMensagem("Boa sorte! Faça seu primeiro palpite.");

        input.focus();
    }

    // VERIFICA O PALPITE
    function verificarPalpite(evento) {
        evento.preventDefault();

        if (jogoFinalizado) {
            return;
        }

        const valor = input.value.trim();
        const palpite = Number(valor);

        // VALIDAÇÃO
        if (
            valor === "" ||
            !Number.isInteger(palpite) ||
            palpite < 1 ||
            palpite > 100
        ) {
            mostrarMensagem(
                "❌ Digite um número inteiro entre 1 e 100!",
                "erro"
            );
            return;
        }

        // CONTADOR DE TENTATIVAS
        tentativas++;
        contador.textContent = tentativas;

        // NÚMERO MENOR
        if (palpite < numeroSecreto) {
            mostrarMensagem(
                "📈 Muito baixo! Tente um número maior."
            );
        }

        // NÚMERO MAIOR
        else if (palpite > numeroSecreto) {
            mostrarMensagem(
                "📉 Muito alto! Tente um número menor."
            );
        }

        // ACERTOU
        else {
            mostrarMensagem(
                `🏆 PARABÉNS! Você acertou o número ${numeroSecreto} em ${tentativas} tentativa(s)!`,
                "sucesso"
            );

            jogoFinalizado = true;
            input.disabled = true;
            botaoEnviar.disabled = true;
        }

        // LIMPA O CAMPO
        if (!jogoFinalizado) {
            input.value = "";
            input.focus();
        }
    }

    // EVENTOS DO JOGO
    formulario.addEventListener("submit", verificarPalpite);
    botaoReiniciar.addEventListener("click", iniciarJogo);

    // INICIALIZA
    iniciarJogo();

});

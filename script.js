
// ==========================================
// SITE JOÃO VITOR MASSARO
// JavaScript principal
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // MENU DE NAVEGAÇÃO
    // ======================================

    const botaoMenu = document.getElementById("botao-menu");
    const menuLinks = document.getElementById("menu-links");

    function fecharMenu() {
        menuLinks.classList.remove("ativo");
        botaoMenu.setAttribute("aria-expanded", "false");
    }

    if (botaoMenu && menuLinks) {

        botaoMenu.addEventListener("click", () => {
            const aberto = menuLinks.classList.toggle("ativo");
            botaoMenu.setAttribute("aria-expanded", String(aberto));
        });

        menuLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", fecharMenu);
        });

        document.addEventListener("click", (evento) => {
            if (
                !botaoMenu.contains(evento.target) &&
                !menuLinks.contains(evento.target)
            ) {
                fecharMenu();
            }
        });

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape") {
                fecharMenu();
            }
        });
    }

    // ======================================
    // ANO AUTOMÁTICO
    // ======================================

    const anoAtual = document.getElementById("ano-atual");

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // ======================================
    // JOGO DE ADIVINHAÇÃO
    // ======================================

    const formulario = document.getElementById("form-jogo");
    const inputPalpite = document.getElementById("palpite");
    const resultado = document.getElementById("resultado");
    const contador = document.getElementById("tentativas");
    const botaoEnviar = document.getElementById("enviar-palpite");
    const botaoReiniciar = document.getElementById("reiniciar-jogo");

    if (
        !formulario ||
        !inputPalpite ||
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

    // GERA NÚMERO ALEATÓRIO
    function gerarNumeroSecreto() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // EXIBE MENSAGENS
    function mostrarMensagem(mensagem, tipo = "") {
        resultado.textContent = mensagem;
        resultado.className = "mensagem";

        if (tipo) {
            resultado.classList.add(tipo);
        }
    }

    // INICIA O JOGO
    function iniciarJogo() {
        numeroSecreto = gerarNumeroSecreto();
        tentativas = 0;
        jogoFinalizado = false;

        contador.textContent = "0";
        inputPalpite.value = "";
        inputPalpite.disabled = false;
        botaoEnviar.disabled = false;

        mostrarMensagem("Boa sorte! Faça seu primeiro palpite.");
    }

    // VERIFICA O PALPITE
    function verificarPalpite(evento) {
        evento.preventDefault();

        if (jogoFinalizado) {
            return;
        }

        const valor = inputPalpite.value.trim();
        const palpite = Number(valor);

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

        tentativas++;
        contador.textContent = String(tentativas);

        if (palpite < numeroSecreto) {
            mostrarMensagem(
                "📈 Muito baixo! Tente um número maior."
            );
        }

        else if (palpite > numeroSecreto) {
            mostrarMensagem(
                "📉 Muito alto! Tente um número menor."
            );
        }

        else {
            mostrarMensagem(
                `🏆 PARABÉNS! Você acertou o número ${numeroSecreto} em ${tentativas} tentativa(s)!`,
                "sucesso"
            );

            jogoFinalizado = true;
            inputPalpite.disabled = true;
            botaoEnviar.disabled = true;
        }

        if (!jogoFinalizado) {
            inputPalpite.value = "";
            inputPalpite.focus();
        }
    }

    // EVENTOS
    formulario.addEventListener("submit", verificarPalpite);
    botaoReiniciar.addEventListener("click", iniciarJogo);

    // INICIALIZA O JOGO
    iniciarJogo();

});

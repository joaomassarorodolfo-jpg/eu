import readline from 'readline';

// Configura a interface para ler o que você digita no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Gera um número aleatório entre 1 e 100
const numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

console.log("=========================================");
console.log("🎉 BEM-VINDO AO JOGO DE ADIVINHAÇÃO! 🎉");
console.log("Tente adivinhar o número entre 1 e 100.");
console.log("=========================================\n");

function jogar() {
    rl.question('Digite o seu palpite: ', (entrada) => {
        const palpite = parseInt(entrada);
        tentativas++;

        if (isNaN(palpite)) {
            console.log("❌ Por favor, digite um número válido!\n");
            jogar();
        } else if (palpite < numeroSecreto) {
            console.log("📈 Muito baixo! Tente um número maior.\n");
            jogar();
        } else if (palpite > numeroSecreto) {
            console.log("📉 Muito alto! Tente um número menor.\n");
            jogar();
        } else {
            console.log(`\n🏆 PARABÉNS! Você acertou o número ${numeroSecreto}!`);
            console.log(`✨ Você precisou de ${tentativas} tentativas.\n`);
            rl.close();
        }
    });
}

// Inicia o loop do jogo
jogar();


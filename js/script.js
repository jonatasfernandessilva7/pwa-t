const buscaURL = new URLSearchParams(window.location.search);
const nomeUsuario = buscaURL.get('nomeUsuario');

console.log(nomeUsuario);

const nomeDeUsuario = document.getElementById('nomeUsuario');
nomeDeUsuario.innerHTML = `Bem-vindo ${nomeUsuario}`;

const inputMsg = document.getElementById('inputMsg');
const msgDiv = document.getElementById('mensagem');

function carregarMensagens() {
    const mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
    mensagens.forEach((data) => {
        exibirMensagem(data.nome, data.msg);
    });
}

function salvarMensagem(nome, msg) {
    const mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
    mensagens.push({ nome, msg });
    localStorage.setItem('mensagens', JSON.stringify(mensagens));
}

function exibirMensagem(nome, msg) {
    msgDiv.innerHTML += `
    <div class="novaMensagem">
        <label class="form-label">
            <strong>${nome}</strong> <span id="novaMensagem">${msg}</span>
        </label>
    </div>`;
}

inputMsg.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const mensagem = event.target.value;
        console.log(mensagem);
        const data = {
            nome: nomeUsuario,
            msg: mensagem,
        };
        salvarMensagem(data.nome, data.msg);
        exibirMensagem(data.nome, data.msg);
        event.target.value = '';
    }
});

// Carregar mensagens do cache ao iniciar
carregarMensagens();

/////////////////////////////////////////////////////////////////////////////////

const sintetizador = window.speechSynthesis;

function ouvir() {
    const valor = document.querySelectorAll('#novaMensagem');
    const conta = valor.length;
    const texto = valor[conta - 1]?.textContent || '';
    const voz = sintetizador.getVoices();

    if (voz.length !== 0 && texto) {
        console.log('falando');
        const msg = new SpeechSynthesisUtterance();
        msg.voz = voz[0]; // primeira voz
        msg.rate = 1; // velocidade
        msg.pitch = 1; // tom
        msg.text = texto;
        msg.lang = 'pt-BR';
        sintetizador.speak(msg);
    }
}

const botaoOuvir = document.getElementById('ouvirMsg');
botaoOuvir.onclick = ouvir;

/////////////////////////////////////////////////////////////////////////////////

function falar() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const minhaFala = new SpeechRecognition();
        minhaFala.lang = 'pt-BR';

        minhaFala.start();

        minhaFala.addEventListener('result', (event) => {
            const result = event.results[0][0].transcript;
            console.log(`Texto reconhecido: ${result}`);
            if (inputMsg) {
                inputMsg.value = result;
            }
        });
    } else {
        console.error('Reconhecimento de voz não suportado neste navegador.');
    }
}

const botaoFalar = document.getElementById('falarMsg');
botaoFalar.onclick = falar;
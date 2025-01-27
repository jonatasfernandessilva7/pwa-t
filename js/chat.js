var socket = io();

const buscaURL = new URLSearchParams(window.location.search);
const nomeUsuario = buscaURL.get('nomeUsuario');

console.log(nomeUsuario);

socket.emit('novoUsuario', {
    nomeUsuario
});

const nomeDeUsuario = document.getElementById('nomeUsuario');
nomeDeUsuario.innerHTML = `Bem vindo ${nomeUsuario}`

const inputMsg = document.getElementById('inputMsg');

inputMsg.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const mensagem = event.target.value;
        console.log(mensagem);
        data = {
            nomeUsuario,
            mensagem
        }
        socket.emit('mensagem', data);
        event.target.value = '';
    }
});

socket.on('mensagem', data => {
    console.log(data);

    const msgDiv = document.getElementById('mensagem');

    msgDiv.innerHTML += `
    <div class="novaMensagem">
        <label class="form-label">
            <strong> ${data.nome} </strong> <span id="novaMensagem">${data.msg}</span>
        </label>
    </div>`
});

//////////////////////////////////////////////////////////////////////////


const sintetizador = window.speechSynthesis;

function ouvir() {
    let valor = document.querySelectorAll('#novaMensagem');
    let conta = valor.length;
    let texto = valor[conta-1].textContent;
    let voz = sintetizador.getVoices();

    if (voz.length !== 0) {
        console.log('falando');
        let msg = new SpeechSynthesisUtterance();
        msg.voz = voz[0]; //primeira voz
        msg.rate = 1; //velocidade
        msg.pitch = 1; //tom
        msg.text = texto;
        msg.lang = 'pt-BR'
        sintetizador.speak(msg)
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

/* DOCUMENTS */

const canvas = document.getElementById('gamecanvas');
const ctx = canvas.getContext('2d');

/* VARIAVEIS */

const points = document.getElementById('points'); // pontu :D (... ele pega o texto que e sobre os pontos... e coloca nele... NOOOOOSSSSSAAAAA TITIA QUE MANEIRO)
const record = document.getElementById('record'); // recordi :D (Coloca o recorde no texto do html. ta certo isso?)
const time = document.getElementById('timer'); // Pega o documento (por id🔥) do timeer para mostrar o timer (TIMER TIMER AAAAAA)
const errors = document.getElementById('error'); // Pega o documento (por id uau) do erro para ser exibido (skibidi)
const timertoend = 60; // Tempo para o jogo terminar
const errorsmax = 3; // Maximo de erros
const maxballs = 8; // Maximo de bolas na tela
const initialballs = 0; // Quantas bolas aparece de inicio

/* VARIAVEIS DE BOTÕES */

const resetgame = document.getElementById('restart'); // ele renicia o jogo. legal ne?
const beatmyrecord = document.getElementsByClassName('retry'); // RETENTEEE! (ele renicia o jogo. igual o restar- acho que o retry e a mesma coisa que o restart. 🔥)


/* VARIAVEIS DE MENSAGENS */

const youwon = document.getElementById('youwonmsg'); // mensagem de "VOCE VENCEU PARABENS!!!!!!11!!!!!!111! AAAAAAAA QUE LEGALLLLLL". empougei

/* VARIAVEIS DAS BOLAS */

const ballsval = [1, 2, 3, 4, 5]; // quantas bolas tem no jogo. acho que isso iria ser normal? jamais AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const ballpoints = { // onde coloco isso? ah isso pega quantos pontos cada bola vai ter. bola de queijo
    1: 3,
    2: 5,
    3: 10,
    4: 12,
    5: 25
};

const balltimer = { // não. não vai demorar 12 anos pra a bola desaparecer. e que 1000 e 1 segundo em codigos. e, mas isso pega quanto tempo demora pra bola sumir
    1: 12000,
    2: 10000,
    3: 3000,
    4: 5000,
    5: 2000
};

/* CORES UAU AAAAAAAAAA */

const color = [
    'cyan',
    'orange',
    'red',
    'green',
    'white'
]

/* FUNÇÕES */

function drawCircle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

/* LISTA DE ALGUMA COISA NUM SEI */

const shapeDrawMap = {
    'circle': drawCircle,
}
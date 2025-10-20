
/* DOCUMENTS */

const canvas = document.getElementById('gamecanvas');
const ctx = canvas.getContext('2d');

/* VARIAVEIS */

//const points = document.getElementById('points'); // pontu :D (... ele pega o texto que e sobre os pontos... e coloca nele... NOOOOOSSSSSAAAAA TITIA QUE MANEIRO)
//const record = document.getElementById('record'); // recordi :D (Coloca o recorde no texto do html. ta certo isso?)
//const time = document.getElementById('timer'); // Pega o documento (por id🔥) do timeer para mostrar o timer (TIMER TIMER AAAAAA)
//const errors = document.getElementById('error'); // Pega o documento (por id uau) do erro para ser exibido (skibidi)
//const timertoend = 60; // Tempo para o jogo terminar
//const errorsmax = 3; // Maximo de erros
//const maxballs = 8; // Maximo de bolas na tela
//const initialballs = 0; // Quantas bolas aparece de inicio
//const GAME_DURATION = 60; // falta 60 segundos pro jogo acaba. tempo passa viu?
//const MAX_MISSED_CLICKS = 10; // mamixo de bolad clicsdoas (escrevi isso sem olhar no teclado)
//const INITIAL_BALL_COUNT = 3; // bolas inicias (TREIS DOIS UM VAOOOOOOOOOOOOOOOOOOOOODSFAHV HDUFVJFVHFDVJKFDGVJFDVDFCHJVFFDHJFGDHJFEHFDFHJDFFKJFDHFDHFFDHGRYGUYDFJHGFDHJVCJBCHDYUJGJHVBVDNVJKFDVFJGHBGJFDHGJKRDHGUIERFJGFDV,JHBVIUDYGERGFDJBGHJRFGHREGHYOEJFDNBGFREGTREFHNKJIMVGLFNBHRG\GHFRDÇHGYUZM,.GHDFFJKBNCVBNMJDVJD. acabei)
const BALL_RADIUS = 25;

/* VARIAVEIS DE BOTÕES */

//const resetgame = document.getElementById('restart'); // ele renicia o jogo. legal ne?
//const beatmyrecord = document.getElementsByClassName('retry'); // RETENTEEE! (ele renicia o jogo. igual o restar- acho que o retry e a mesma coisa que o restart. 🔥)


/* VARIAVEIS DE MENSAGENS */

//const youwon = document.getElementById('youwonmsg'); // mensagem de "VOCE VENCEU PARABENS!!!!!!11!!!!!!111! AAAAAAAA QUE LEGALLLLLL". empougei

/* VARIAVEIS DAS BOLAS */

const ballsval = [1, 2, 3, 4, 5]; // quantas bolas tem no jogo. acho que isso iria ser normal? jamais AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
/*const ballpoints = { // onde coloco isso? ah isso pega quantos pontos cada bola vai ter. bola de queijo
    1: 3,
    2: 5,
    3: 10,
    4: 12,
    5: 25
}; */

/*const balltimer = { // não. não vai demorar 12 anos pra a bola desaparecer. e que 1000 e 1 segundo em codigos. e, mas isso pega quanto tempo demora pra bola sumir
    1: 12000,
    2: 10000,
    3: 3000,
    4: 5000,
    5: 2000
}; */

/* VARIAVEIS DO ESTATO DO JOGO E OUTRAS COISAS!. bola de bola */

//let gameRunning = false; // MAIS UM JOGO!!! (se o jogo estiver rodando ela e true e se não estiver rodando e false. bola de camera.)
//let score = 0; // hmmmm quantos pontos eu tenho... acho que uns 83334392483974782349327489374327928. (quantos pontos o jogador tem. bola de Visual Studio Code 2.0 launch)
//let missedClicks = 0; // erro 100 voce errou muitas vezes. babau
//let gameTimer = GAME_DURATION; // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 e vai indo (quanto tempo passou para o jogo acaba. bola de 🥚)
//let gameInterval; // intervalo 😎👍
//let ballGenerationIntervalId; // id da geração. na verdade eu nem sei oque isso faz
//let activeBalls = []; // bola ativa 💡
//let animationFrameId; // animação ou alguma coisa do tipo. num sei.
//let highScore = 0; // seu recordi! MUNDIAL! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//let lastScores = []; // erui

// acabo 💡💡💡👍😎👍👍👍😎💡🔁🎮⏬🔥🔥⚠️⚠️🔥🖥️🩸🩸🔨

/* CORES UAU AAAAAAAAAA */

const color = [ // /\ olhe. (isso pega as cores das bolas. bola de feijoada)
    'cyan',
    'orange',
    'red',
    'green',
    'white'
]

/* FUNÇÕES (ausiliaries)™ */

/** Rasôes de por que isso e legal 2.0
 * acabei de aprender isso (DENOVO)
 * e legal (NOVA DE NOVO DE NOUVEMENTE)
 * o @param {Array} arr O arr- ARRR      ESTOU NÃO MAS SOU UM PIRATA ARRRRRRRRRRRRRRRRRR ELE E UM COISO DE UR IRTEM QUE VAIR DER SELECIORNADOR. ARRRRRRRRRRRRRRRRRR
 * e o @returns {*} um item aleatorio o cara ai de cima ce ta bem? /\ bvvv
 */

/** Rasôes de por que isso e legal 
 * acabei de aprender isso
 * e legal
 * o @param {number} min e o valor minimo
 * o @param {number} max e o valor maximo
 * e o @returns {number} nos da um numero aleatoraioio (portugesx)
 */

function drawCircle(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'white'; // el cor del texto espaghete
    ctx.font = `${ball.radius * 0.8}px Arial`; // fontel (oficial bla bla bla tm)
    ctx.textAlign = 'center'; // CENTRO CENTRO DE SOS
    ctx.textBaseline = 'middle'; // honestamente. meio, e onde que a baseline vai ta
    ctx.fillText(ball.value.toString(), ball.x, ball.y); // colocar el texto 🥖
}

function generateBall() {
    if (!gameRunning || activeBalls.length >= maxballs) {
        return;
    }

    const randomValue = getRandomItem(BALL_VALUES);
    const randomColor = getRandomItem(BALL_COLORS);
    const x = getRandomInt(BALL_RADIUS, canvas.width - BALL_RADIUS);
    const y = getRandomInt(BALL_RADIUS, canvas.height - BALL_RADIUS);
    
    const newBall = {
        id: Date.now() + Math.random(),
        x: x,
        y: y,
        radius: BALL_RADIUS,
        color: randomColor,
        value: randomValue,
        points: VALUE_TO_POINTS[randomValue],
        spawnTime: Date.now(),
        lifespan: VALUE_TO_LIFESPAN_MS[randomValue]
    };

    activeBalls.push(newBall);
}

function endGame() {
    clearInterval(timerInterval);
    winSound.currentTime = 0;
    winSound.play();
    youwon.classList('show');
}

drawCircle(ball);

/* LISTA DE ALGUMA COISA NUM SEI */

const shapeDrawMap = {
    'circle': drawCircle,
}
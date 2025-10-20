// CANVAS MUITO LEGAL MUIHEHEHEHEH🤣🤣🤣🤣🤣

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// CONSTIS VARIAVEIS LEGAIS bola de bola de const

const BALL_RADIUS = 25;
const ballsval = [1, 2, 3, 4, 5];

// COLORES.🎨🎨🎨🎨🎨🎨🖼️🖼️🖼️👨‍🎨👨‍🎨👨‍🎨👩‍🎨👩‍🎨👩‍🎨👩‍🎨👩‍🎨

const color = [ // /\ olhe. (isso pega as cores das bolas. bola de feijoada)
    'cyan',
    'orange',
    'red',
    'green',
    'white'
]

// funcao auxiliriliries 🤤🤤🤤

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//  bola do bola ⚽

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

// LIMPA O CANVAS SOS AJUDE AAAA 🆘🆘🆘🗣️🗣️🗣️🗣️🚔🚓🚓🚓👮‍♂️👮👮👮‍♀️👮‍♂️

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
}
 
// gerar bola meu deus aahhdsasuifhy hgasgcshgdashdgsja ⚽

function generateBall() { // GERAR A BOLINHA DE PAPEL
    const randomValue = getRandomItem(ballsval);
    const randomColor = getRandomItem(color);
    const x = getRandomInt(BALL_RADIUS, canvas.width - BALL_RADIUS);
    const y = getRandomInt(BALL_RADIUS, canvas.height - BALL_RADIUS);
    
    const newBall = {
        x: x,
        y: y,
        radius: BALL_RADIUS,
        color: randomColor,
        value: randomValue,
    };

    return newBall;
}

// o comeco de tudinho (CAPITULO 1, EPISODIO 1, PARODIA 1, WIKI 1, BATALHA 1.)

clearCanvas();
const primeiraBola = generateBall();
drawCircle(primeiraBola);

console.log("pronto tudo começou 👌👍👍👍👍💚💚💚");
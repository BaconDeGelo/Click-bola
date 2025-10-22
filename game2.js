const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BALL_RADIUS = 25;
const INITIAL_BALL_COUNT = 3;
const ballsval = [1, 2, 3, 4, 5];

const color = [ // /\ olhe. (isso pega as cores das bolas. bola de feijoada)
    'darkcyan',
    'orange',
    'red',
    'green',
    'black',
    'olive',
    'purple',
    'pink',
    'violet',
    'brown',
    'blue',
    'gold',
    'deeppink',
    'hotpink'
]

let activeBalls = [];

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





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

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
}

function generateBall() { // GERAR A BOLINHA DE PAPEL
    const randomValue = getRandomItem(ballsval);
    const randomColor = getRandomItem(color);
    const x = getRandomInt(BALL_RADIUS, canvas.width - BALL_RADIUS);
    const y = getRandomInt(BALL_RADIUS, canvas.height - BALL_RADIUS);

    const newBall = {
        id: Date.now() + Math.random(),
        x: x,
        y: y,
        radius: BALL_RADIUS,
        color: randomColor,
        value: randomValue,
    };

    activeBalls.push(newBall);
}

function drawAllBalls() {
    clearCanvas();

    for (let i = 0; i < activeBalls.length; i++) {
        drawCircle(activeBalls[i]);
    }
}

for (let i = 0; i < INITIAL_BALL_COUNT; i++) {
    generateBall();
}

drawAllBalls();

console.log(`mano então ${activeBalls.length} e quantas bolas apareceu bele?`);
console.log(`tem ${activeBalls} bolas.`);
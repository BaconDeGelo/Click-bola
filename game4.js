const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BALL_RADIUS = 25;
const INITIAL_BALL_COUNT = 3;
const MAX_ACTIVE_BALLS = 5;
const BALL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const BALL_COLORS = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'gold', 'brown', 'lime', 'teal'];

const VALUE_TO_LIFESPAN_MS = {
    1: 4000,
    2: 3500,
    3: 3000,
    4: 2500,
    5: 2000,
    6: 1500,
    7: 1000,
    8: 900,
    9: 500
}

let activeBalls = [];
let score = 0;
let gameRunning = true;

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBalls(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = `${ball.radius * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ball.value.toString(), ball.x, ball.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    if (!gameRunning) return;

    clearCanvas();

    const currentTime = Date.now();
    const nextActiveBalls = [];

    for (let i = 0; i < activeBalls.length; i++) {
        const ball = activeBalls[i];

        if (currentTime - ball.spawnTime > ball.lifespan) {
            console.log(`SOLDADO! *piu piu piu* TEMOS UM SOLDADO CAIDO DE ${ball.value} MORREU! PRESISAMOS DE UM MEDICO *pou pou pou*`);
            generateBall();
        } else {
            drawBalls(ball);
            nextActiveBalls.push(ball);
        }
    }

    activeBalls = nextActiveBalls;

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`pontus: ${score}`, 10, 30);
    ctx.fillText(`bolas ativas🤤: ${activeBalls.length}`, 10, 55);

    requestAnimationFrame(gameLoop);
}

function generateBall() {
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
        points: randomValue * 10,
        spawnTime: Date.now(),
        lifespan: VALUE_TO_LIFESPAN_MS[randomValue]
    };

    activeBalls.push(newBall);
}


function drawAllBalls() {
    clearCanvas();

    for (let i = 0; i < activeBalls.length; i++) {
        drawBalls(activeBalls[i]);
    }

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Pontos: ${score}`, 10, 30);
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    for (let i = 0; i < activeBalls.length; i++) {
        
        const ball = activeBalls[i];
        const distance = Math.sqrt(
            Math.pow(clickX - ball.x, 2) + Math.pow(clickY - ball.y, 2)
        );

        if (distance <= ball.radius) {
            score += ball.points;
            console.log(`CONGRATILAITIONS!!!!2111111!!!111!! VC GANHOU ${ball.points}!!!!!!! VC TEM ${score} DE PONTOS!!!11!!!1!😀😀😀😄😃😃😄😁🤣😃😃😃😄🙂🙂🙂😊😊😊`);

            activeBalls.splice(i, 1);
            generateBall();
            drawAllBalls();
            break;
        }
    }
}

canvas.addEventListener('click', handleClick);

for (let i = 0; i < INITIAL_BALL_COUNT; i++) {
    generateBall();
}

gameLoop();

console.log("OS SCIRP FUNCIPNOUY YAYAYAYAYAY QAGORA TUDO FUNCIONA AGORA AHAAAA");
console.log("dica: isso e uma dica muito util")

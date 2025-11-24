const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const missedClicksSpan = document.getElementById('missedClicks');
const restartButton = document.getElementById('restart');
const messageDiv = document.getElementById('winmsg')


const BALL_RADIUS = 25;
const INITIAL_BALL_COUNT = 3;
const MAX_ACTIVE_BALLS = 5;
const MAX_MISSED_CLICKS = 3;
const GAME_DURATION = 60;
const BALL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const BALL_COLORS = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'gold', 'brown', 'lime', 'teal'];

const VALUE_TO_POINTS = { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50, 6: 60, 7: 70, 8: 80, 9: 90};
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
};

const clickSound = new Audio('Sounds/click.mp3');
const missSound = new Audio('Sounds/miss.mp3');
const endSound = new Audio('Sounds/end.mp3');

let activeBalls = [];
let score = 0;
let missedClicks = 0;
let gameTimer = GAME_DURATION;
let gameInterval;
let gameRunning = true;
let animationFrameId;

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

function updateGameDisplay() {
    scoreSpan.textContent = score;
    timerSpan.textContent = gameTimer;
    missedClicksSpan.textContent = `${missedClicks} / ${MAX_MISSED_CLICKS}`;
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('points');
    if (pointsElement) {
        pointsElement.textContent = `Pontos: ${score}`;
    }
}

function gameLoop() {
    if (!gameRunning) return;

    clearCanvas();

    const currentTime = Date.now();
    const nextActiveBalls = [];

    for (let i = 0; i < activeBalls.length; i++) {
        const ball = activeBalls[i];

        if (currentTime - ball.spawnTime > ball.lifespan) {
        } else {
            drawBalls(ball);
            nextActiveBalls.push(ball);
        }
    }

    activeBalls = nextActiveBalls;

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`bolas ativas🤤: ${activeBalls.length}`, 10, 55);

    requestAnimationFrame(gameLoop);
}

function generateBall() {
    if (!gameRunning || activeBalls.length >= MAX_ACTIVE_BALLS) return;

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

    console.log(`nova bola: ${JSON.stringify(newBall)}`);

    activeBalls.push(newBall);
}

function gameLoop() {
    if (!gameRunning) return;

    clearCanvas();

    const currentTime = Date.now();
    const nextActiveBalls = [];

    for (let i = 0; i < activeBalls.length; i++) {
        const ball = activeBalls[i];

        if (currentTime - ball.spawnTime > ball.lifespan) {
            generateBall();
        } else {
            drawAllBalls(ball);
            nextActiveBalls.push(ball);
        }
    }
    activeBalls = nextActiveBalls;
    animationFrameId = requestAnimationFrame(gameLoop);
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
    if (!gameRunning) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    let ballClicked = false;

    clickSound.currentTime = 0;
    clickSound.play();

    for (let i = 0; i < activeBalls.length; i++) {
        
        const ball = activeBalls[i];
        const distance = Math.sqrt(
            Math.pow(clickX - ball.x, 2) + Math.pow(clickY - ball.y, 2)
        );

        if (distance <= ball.radius) {
            score += ball.points;
            activeBalls.splice(i, 1);
            generateBall();
            updatePointsDisplay();
            drawAllBalls();
            break;
        }
    }

    if (!ballClicked) {
        missedClicks++;
        updateGameDisplay();
        console.log(`tu errou .,. (${missedClicks} ai se tu ganhar ${MAX_MISSED_CLICKS} tu perde.)`);
    }
}

function startTimer() {
    gameInterval = setInterval(() => {
        gameTimer--;
        updateGameDisplay();

        if (gameTimer <= 0) {
            endgame(`babau acabo. pelo menos vc teve ${score} pontos (●'◡'●)`);
        }
    })
}

function initGame() {
    endgame();

    score = 0;
    missedClicks = 0;
    gameTimer = GAME_DURATION;
    activeBalls = [];
    gameRunning = true;
    messageDiv.textContent = '';
    messageDiv.className = 'message';

    updateGameDisplay();
    clearCanvas();

    for (let i = 0; i < INITIAL_BALL_COUNT; i++) {
        generateBall();
    };

    startTimer();
    gameLoop();

    console.log("começo. vai. vaia.");
}

function endgame(msg = "") {
    gameRunning = false;
    clearInterval(gameInterval);
    cancelAnimationFrame(animationFrameId);
    activeBalls = [];
    clearCanvas();
    endSound.currentTime = 0;
    endSound.play();

    messageDiv.textContent = msg;

    if (msg.includes(`babau acabo. pelo menos vc teve ${score} pontos (●'◡'●)`) && missedClicks < MAX_MISSED_CLICKS) {
        messageDiv.classList.add('win-message');
    }

    console.log('ACABOOOOAA. ACABOOOOOO, ACABOOOOOOO!!!!!!')
}

canvas.addEventListener('click', handleClick);
restartButton.addEventListener('click', initGame);

initGame();

console.log("começoux. ex jajax vaix acabax ☆*: .｡. o(≧▽≦)o .｡.:*☆")
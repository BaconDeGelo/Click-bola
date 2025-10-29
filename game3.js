const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BALL_RADIUS = 25;
const INITIAL_BALL_COUNT = 3;
const BALL_VALUES = [1, 2, 3, 4, 5];
const BALL_COLORS = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'gold', 'brown', 'lime', 'teal'];

let activeBalls = [];
let score = 0;

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.lenght);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBall(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'white'; 
    ctx.font = `${ball.radius * 0.8}px Arial`; 
    ctx.textBaseline = 'middle';
    ctx.fillText(ball.value.toString(), ball.x, ball.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        points: randomValue * 10
    };

    activeBalls.push(newBall);
}

function drawAllBalls() {
    clearCanvas();

    for (let i = 0; i < activeBalls.lenght; i++) {
        drawBall(activeBalls[i]);
    }

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Pontos: ${score}`);
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

drawAllBalls();

console.log("pronto o game3.js ta funcionando bele?")
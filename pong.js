const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const ball = {
x: canvas.width / 2,
y: canvas.height / 2,
radius: 10,
velocityX: 5,
velocityY: 5,
speed: 7,
color: 'WHITE'
};

const user = {
x: 0,
y: (canvas.height - 100) / 2,
width: 10,
height: 100,
score: 0,
color: 'WHITE'
};

const ai = {
x: canvas.width - 10,
y: (canvas.height - 100) / 2,
width: 10,
height: 100,
score: 0,
color: 'WHITE'
};

const net = {
x: (canvas.width - 2) / 2,
y: 0,
height: 10,
width: 2,
color: 'WHITE'
};

function drawRect(x, y, w, h, color) {
context.fillStyle = color;
context.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color) {
context.fillStyle = color;
context.beginPath();
context.arc(x, y, r, 0, Math.PI * 2, true);
context.closePath();
context.fill();
}

canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt) {
let rect = canvas.getBoundingClientRect();
user.y = evt.clientY - rect.top - user.height / 2;
}

function resetBall() {
ball.x = canvas.width / 2;
ball.y = canvas.height / 2;
ball.velocityX = -ball.velocityX;
ball.speed = 7;
}

function drawNet() {
for (let i = 0; i <= canvas.height; i += 15) {
drawRect(net.x, i, net.width, net.height, net.color);
}
}

function draw() {

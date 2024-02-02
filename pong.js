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
x: 0, // left side of canvas
y: (canvas.height - 100) / 2, // -100 the height of paddle
width: 10,
height: 100,
score: 0,
color: 'WHITE'
};

const com = {
x: canvas.width - 10, // - width of paddle
y: (canvas.height - 100) / 2, // -100 the height of paddle
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
drawRect(net.x, net.y + i, net.width, net.height, net.color);
}
}

function draw() {
drawRect(0, 0, canvas.width, canvas.height, 'BLACK');
drawNet();
drawRect(user.x, user.y, user.width, user.height, user.color);drawRect(com.x, com.y, com.width, com.height, com.color);
drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function update() {
ball.x += ball.velocityX;
ball.y += ball.velocityY;

// Simple AI to control the com paddle
let computerLevel = 0.1;
com.y += (ball.y - (com.y + com.height / 2)) * computerLevel;

if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
ball.velocityY = -ball.velocityY;
}

let player = (ball.x < canvas.width / 2) ? user : com;

if (collision(ball, player)) {
let collidePoint = ball.y - (player.y + player.height / 2);
collidePoint = collidePoint / (player.height / 2);

let angleRad = (Math.PI / 4) * collidePoint;

let direction = (ball.x < canvas.width / 2) ? 1 : -1;
ball.velocityX = direction * ball.speed * Math.cos(angleRad);
ball.velocityY = ball.speed * Math.sin(angleRad);

ball.speed += 0.1;
}

if (ball.x - ball.radius < 0) {
com.score++;
resetBall();
} else if (ball.x + ball.radius > canvas.width) {
user.score++;
resetBall();
}
}

function game() {
update();
draw();
}

function collision(b, p) {
p.top = p.y;
p.bottom = p.y + p.height;
p.left = p.x;
p.right = p.x + p.width;

b.top = b.y - b.radius;
b.bottom = b.y + b.radius;
b.left = b.x - b.radius;
b.right = b.x + b.radius;

return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;
}

// call update() and draw() every 50ms
let framePerSecond = 50;
let loop = setInterval(game, 1000/framePerSecond);[1000]
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

function draw() {drawRect(0, 0, canvas.width, canvas.height, '#000');
drawNet();
drawRect(user.x, user.y, user.width, user.height, user.color);
drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function update() {
ball.x += ball.velocityX;
ball.y += ball.velocityY;

// Simple AI to control the ai paddle
let computerLevel = 0.1;
ai.y += (ball.y - (ai.y + ai.height / 2)) * computerLevel;

if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
ball.velocityY = -ball.velocityY;
}

let player = (ball.x < canvas.width / 2) ? user : ai;

if (collision(ball, player)) {
// where the ball hit the player
let collidePoint = ball.y - (player.y + player.height / 2);
collidePoint = collidePoint / (player.height / 2);

// calculate angle in radian
let angleRad = (Math.PI / 4) * collidePoint;

// X direction of the ball when it's hit
let direction = (ball.x < canvas.width / 2) ? 1 : -1;
ball.velocityX = direction * ball.speed * Math.cos(angleRad);
ball.velocityY = ball.speed * Math.sin(angleRad);

// speed up the ball every hit
ball.speed += 0.1;
}

// Update the score
if (ball.x - ball.radius < 0) {
ai.score++;
resetBall();
} else if (ball.x + ball.radius > canvas.width) {
user.score++;
resetBall();
}
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

function game() {
update();
draw();
}

// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(game, 1000/framePerSecond);[1000]

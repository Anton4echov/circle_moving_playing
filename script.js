// Get canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize canvas position
let canvasX = 0;
let canvasY = 0;

// Initialize touch/mouse position
let touchX = 0;
let touchY = 0;

// Initialize movement variables
let isMoving = false;
let offsetX = 0;
let offsetY = 0;

// Draw something on the canvas (example)
ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 200, 200);



var ball = {
  x: 200,
  y: 200,
  vx: 2,
  vy: 2,
  radius: 40
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  
  ball.x += ball.vx;
  ball.y += ball.vy;
  
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.vx = -ball.vx;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.vy = -ball.vy;
  }
}

// Add event listeners
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);
setInterval(draw, 16);


canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
setInterval(draw, 16);

// Touch event handlers
function handleTouchStart(e) {
  isMoving = true;
  canvasX = e.clientX;
  canvasY = e.clientY;
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
  offsetX = canvasX - touchX;
  offsetY = canvasY - touchY;
}

function handleTouchMove(e) {
  if (isMoving) {
//    e.preventDefault();
    ball.x = e.touches[0].clientX + offsetX;
    ball.y = e.touches[0].clientY + offsetY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }
}

function handleTouchEnd() {
  isMoving = false;
}

// Mouse event handlers
function handleMouseDown(e) {
  isMoving = true;
  canvasX = e.clientX;
  canvasY = e.clientY;
  touchX = e.clientX;
  touchY = e.clientY;
  offsetX = canvasX - touchX;
  offsetY = canvasY - touchY;
}

function handleMouseMove(e) {
  if (isMoving) {
    ball.x = e.clientX + offsetX;
    ball.y = e.clientY + offsetY;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

/*    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, canvasX, canvasY);
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 200, 200);*/
  }
}

function handleMouseUp() {
  isMoving = false;
}

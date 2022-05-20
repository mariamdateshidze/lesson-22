const gameBoard = document.querySelector('#game-board');
const ctx = gameBoard.getContext('2d');

const score = document.getElementById("score");

const gameSpeed = 3;
const squareSize = 50;
const targetSize = 20;

let squareX = 0;
let squareY = 400;
let targetX = 100;
let targetY = 200;



let dirUp = false;
let dirDown = false;
let dirRight = false;
let dirLeft = false;

startGame();



let state = {

    score: 0
};


function startGame() {
  moveSquare();
  moveTarget();
  draw();
  document.addEventListener('keydown', e => {
    if (e.code === 'ArrowUp') {
      dirUp = true;
    }
    if (e.code === 'ArrowDown') {
      dirDown = true;
    }
    if (e.code === 'ArrowLeft') {
      dirLeft = true;
    }
    if (e.code === 'ArrowRight') {
      dirRight = true;
    }
  })
  document.addEventListener('keyup', e => {
    if (e.code === 'ArrowUp') {
      dirUp = false;
    }
    if (e.code === 'ArrowDown') {
      dirDown = false;
    }
    if (e.code === 'ArrowLeft') {
      dirLeft = false;
    }
    if (e.code === 'ArrowRight') {
      dirRight = false;
    }
  })
}



function draw() {
  clearBoard();
  ctx.fillStyle = 'red';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);

  ctx.fillStyle = 'blue';
  ctx.fillRect(targetX, targetY, targetSize, targetSize);
}

function clearBoard() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

function moveSquare() {
  if (dirUp) {
    squareY -= gameSpeed;
  }
  if(dirDown) {
    squareY += gameSpeed;
  }
  if(dirLeft) {
    squareX -= gameSpeed;
  }
  if(dirRight) {
    squareX += gameSpeed;
  }
  if(squareX + squareSize > gameBoard.width){
    squareX = gameBoard.width - squareSize;
  }
  if(squareY + squareSize > gameBoard.height){
    squareY = gameBoard.height - squareSize;
  }
  squareX = Math.max(0, squareX);
  squareY = Math.max(0, squareY);
  if(isEaten()){
    moveTarget();

    state.score++;
    
    score.innerHTML = "Score: " + state.score;

  }

  
  draw();
  requestAnimationFrame(moveSquare);
}

function moveTarget() {
  targetX = Math.floor(Math.random() * (gameBoard.width - targetSize));
  targetY = Math.floor(Math.random() * (gameBoard.height - targetSize));
}

function isEaten() {
  const squareRight = squareX + squareSize;
  const squareBottom = squareY + squareSize;
  const targetRight = targetX + targetSize;
  const targetBottom = targetY + targetSize;

  const inX = squareRight > targetRight && targetX > squareX;
  const inY = squareBottom > targetBottom && targetY > squareY;

  return inX && inY;
}

const startBtn = document.querySelector('#startbtn');

startBtn.addEventListener('click', () => {
    console.log("start")
    startGame;
    moveSquare();
    moveTarget();
    draw();
  })



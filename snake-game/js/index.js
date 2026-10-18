let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
const board = document.querySelector("#board");
let speed = 2;
let lastPaintTime = 0;
//head of snake , grid pe konsy col or row me ha snake head
let snakeArr = [
  {
    x: 13,
    y: 15,
  },
];

//decide on how much FPS our game be palyed in main

//game function
function main(ctime) {
//   window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function gameEngine() {
  //update the snake array and food , change the x and y values so snake moves
  
  // Display snake and food
  board.innerHTML = "";
  snakeArr.forEach((element, index) => {
    // console.log(element, index);
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.x;
    snakeElement.style.gridColumnStart = element.y;
    snakeElement.classList.add("food");
    board.appendChild(snakeElement);
  });
 
}

//Browser, jab agla frame ready ho, mera game loop phir chala dena
window.requestAnimationFrame(main);

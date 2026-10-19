const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
const board = document.querySelector("#board");
const scoreEL = document.querySelector("#scoreBox");

let inputDir = { x: 0, y: 0 };

let speed = 5;
let score = 0;
let lastPaintTime = 0;

//head of snake , grid pe konsy col or row me ha snake head
let snakeArr = [
  {
    x: 13,
    y: 15,
  },
];

let food = {
  x: 6,
  y: 7,
};

//decide on how much FPS our game be palyed in main
//game function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snakeArr) {
  for (let index = 1; index < snakeArr.length; index++) {
    if (
      snakeArr[index].x === snakeArr[0].x &&
      snakeArr[index].y === snakeArr[0].y
    ) {
      return true;
    }
  }

  // Wall collision
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //update the snake array and food , change the x and y values so snake moves

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert(`Game Over, Score is ${score}  , Press any key to start again !`);
    snakeArr = [
      {
        x: 13,
        y: 15,
      },
    ];
    score = 0;
    return;
  }

  // if snake eats food then increament the scroe and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    scoreEL.innerHTML = `Score: ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.floor(Math.random() * 15) + 2,
      y: Math.floor(Math.random() * 15) + 2,
    };
    console.log(food);
  }
  // Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display snake and food
  board.innerHTML = "";
  snakeArr.forEach((element, index) => {
    // console.log(element, index);
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //display food block
  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  foodEl.classList.add("food");
  board.appendChild(foodEl);
}

//Browser, jab agla frame ready ho, mera game loop phir chala dena
window.requestAnimationFrame(main);

//move snake when user clicks arrow key
window.addEventListener("keydown", (e) => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});

const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
const scoreEL = document.querySelector("#scoreBox");
const board = document.querySelector("#board");

let speed = 2;
let lastPaintTime = 0;
let score = 0;

let inputDir = { x: 0, y: 0 };

//head of snake , grid pe konsy col or row me ha snake head
let snakeArr = [
  {
    x: 9,
    y: 15,
  },
];

//position of food
let food = { x: 6, y: 7 };

//Game functions
//main checks whether to update state of the game or not??
//ctime is given by browser , animation k liye browser ne kitna time guzarne k bad ye frame process kia
/*
Ye page ke animation timing system ke timestamp hain — aam tor par page load hone ke baad se guzarne wale waqt ke qareeb
iska maqsad check karna hai ke pichli game update ke baad required time guzra hai ya nahi
ctime : browser kitna time leta ha repaint krne me 
ye time requestAnimationFrame se milta ha 
*/

function main(ctime) {
  // window.requestAnimationFrame(main);

  // setInterval(() => {
  //   window.requestAnimationFrame(main);
  //   console.log("ctime ===> ", ctime);
  // }, 5000);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  // console.log(lastPaintTime);
  // GameEngine updates snake's position and show its new position on the board
  gameEngine();
}

function isCollide() {}

function gameEngine() {
  //Part 1 : Updating the snake Array and food and head

  //check if colliosn happens then reset every parameter of the game
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over !");
    score = 0;
    snakeArr = [
      {
        x: 9,
        y: 15,
      },
    ];
  }

  //part 2 : display the snake and food
  //snakeArr represents current position of snake
  //initially sirf head bana rahy hen snake ka agar sirf ek object ha array me to wo head ha ,
  // or ziada elements hongy to wo ek snake ha which is Head+ body
  board.innerHTML = "";
  snakeArr.forEach((element, index) => {
    const snakeEl = document.createElement("div");
    snakeEl.style.gridRowStart = element.x;
    snakeEl.style.gridColumnStart = element.y;
    if (index == 0) {
      snakeEl.classList.add("head");
    } else {
      snakeEl.classList.add("snake");
    }
    board.appendChild(snakeEl);
  });

  //display food
  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.x;
  foodEl.style.gridColumnStart = food.y;
  foodEl.classList.add("food");
  board.appendChild(foodEl);
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // console.log(e);
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;

      console.log("ArrowUp");
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case " ":
      console.log("space pause function");
      break;
  }
});

//requestAnimationFrame() khud ek number return karta hai — ye ek request ID / handle hota ha
// console.log(window.requestAnimationFrame(main));
//requestAnimationFrame() ka return value baad mein request ko cancel karne ke kaam bhi aa sakta hai
/*
let requestId = window.requestAnimationFrame(main);
cancelAnimationFrame(requestId);
*/

const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
const scoreEL = document.querySelector("#scoreBox");
const board = document.querySelector("#board");

let speed = 2;
let lastPaintTime = 0;

let inputDir = { x: 0, y: 0 };

//head of snake , grid pe konsy col or row me ha snake head
let snakeArr = [
  {
    x: 13,
    y: 15,
  },
];

//Game functions
//main checks whether to update state of the game or not??
//ctime is given by browser , animation k liye browser ne kitna time guzarne k bad ye frame process kia
/*
Ye page ke animation timing system ke timestamp hain — aam tor par page load hone ke baad se guzarne wale waqt ke qareeb
iska maqsad check karna hai ke pichli game update ke baad required time guzra hai ya nahi
*/
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  // GameEngine updates snake's position and show its new position on the board
  gameEngine();
}

function gameEngine() {
  //Part 1 : Updating the snake Array and food
  //part 2 : display the snake and food
}

window.requestAnimationFrame(main);

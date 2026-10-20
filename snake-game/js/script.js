const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
const scoreEL = document.querySelector("#scoreBox");
const highScoreEl = document.querySelector("#hiscoreBox");
const board = document.querySelector("#board");
musicSound.loop = true;

let musicStarted = false;
let speed = 2;
let lastPaintTime = 0;
let score = 0;
let highScore = 0;
let inputDir = { x: 0, y: 0 };
let isPaused = false;

//head of snake , grid pe konsy col or row me ha snake head
let snakeArr = initialSnakePosition();
console.log(snakeArr);
//position of food
let food = initialFoodPosition();
console.log(food);

//logic for localStorage
if (localStorage.getItem("HighScore") !== null) {
  highScore = Number(localStorage.getItem("HighScore"));
  highScoreEl.innerHTML = `High Score: ${highScore}`;
} else {
  localStorage.setItem("HighScore", 0);
  highScoreEl.innerHTML = `High Score: 0`;
}

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
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  if (isPaused) {
    return;
  }
  lastPaintTime = ctime;
  // console.log(lastPaintTime);
  // GameEngine updates snake's position and show its new position on the board
  gameEngine();
}

function speedIncrease(snakeArr) {
  if ((snakeArr.length - 1) % 3 === 0 && snakeArr.length > 1) {
    speed = speed + 2;
    console.log("speed increase by 2");
  }
}

function isCollide(snakeArr) {
  //whenever snake hit its body OR moving upward and user press down vice versa key game over
  //means head ki position or kisi segment ki position equals then collides happened
  for (let index = 1; index < snakeArr.length; index++) {
    if (
      snakeArr[index].x === snakeArr[0].x &&
      snakeArr[index].y === snakeArr[0].y
    ) {
      return true;
    }
  }

  //if snake hits the board boundry
  // x and y ki max values 18 ho skti ha
  if (
    snakeArr[0].x > 18 ||
    snakeArr[0].x < 1 ||
    snakeArr[0].y > 18 ||
    snakeArr[0].y < 1
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //speed function
  // speedIncrease();

  //Part 1 : Updating the snake Array and food and head

  //check if colliosn happens then reset every parameter of the game
  if (isCollide(snakeArr)) {
    gameOverSound.play();

    speed = 2;
    inputDir = { x: 0, y: 0 };
    scoreEL.innerHTML = "Score : 0";
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("HighScore", highScore);
      highScoreEl.innerHTML = `High Score: ${highScore}`;
    }
    score = 0;

    snakeArr = initialSnakePosition();
    food = initialFoodPosition();
    alert("Game Over !");

    return;
  }

  // if snake eats food score++ , and make food again
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    console.log("snake eats");
    foodSound.play();
    score++;
    scoreEL.innerHTML = `Your Score: ${score}`;

    console.log(score);

    // add that tile to snake's tail so add another x , y co-ords
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    speedIncrease(snakeArr);

    //now food dobara generate kro at random cell:
    // a and b k between value generate kro , or food ko wo values de do,
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //snake move , start from 2nd last tile of snake
  //ham head ko for loop se move nahi kr rahy
  //see practice window for this code
  //this for loop is responsible of making snake move in one line
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  //direction of the snake (head move)
  snakeArr[0].x = snakeArr[0].x + inputDir.x;
  snakeArr[0].y = snakeArr[0].y + inputDir.y;

  //part 2 : display the snake and food
  //snakeArr represents current position of snake
  //initially sirf head bana rahy hen snake ka agar sirf ek object ha array me to wo head ha ,
  // or ziada elements hongy to wo ek snake ha which is Head+ body
  board.innerHTML = "";
  //this for each loop makes snake intact makes head and body segment
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

window.addEventListener("keydown", (e) => {
  console.log(e);
  const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];

  if (validKeys.includes(e.key) && !musicStarted) {
    musicSound
      .play()
      .then(() => {
        musicStarted = true;
      })
      .catch((error) => {
        console.log("Music could not play:", error);
      });
  }

  if (!musicStarted) {
    musicSound.play();
    musicStarted = true;
  }
  if (e.key === "m" || e.key === "M") {
    if (musicSound.paused) {
      musicSound.play();
    } else {
      musicSound.pause();
    }
  }
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = -1;
      inputDir.y = 0;
      // console.log(snakeArr);
      // console.log(inputDir);
      console.log("ArrowUp");
      break;
    case "ArrowDown":
      // console.log("ArrowDown");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      // console.log("ArrowLeft");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowRight":
      // console.log("ArrowRight");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case " ":
      isPaused = !isPaused;
      if (isPaused) {
        musicSound.pause();
      } else {
        musicSound.play();
      }
      musicStarted = !musicStarted;
      break;
  }
});

// initial Positions of food and snake
function initialSnakePosition() {
  let a = 2;
  let b = 16;

  return [
    {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    },
  ];
}
function initialFoodPosition() {
  let a = 2;
  let b = 16;

  return {
    x: Math.round(a + (b - a) * Math.random()),
    y: Math.round(a + (b - a) * Math.random()),
  };
}

window.requestAnimationFrame(main);

//requestAnimationFrame() khud ek number return karta hai — ye ek request ID / handle hota ha
// console.log(window.requestAnimationFrame(main));
//requestAnimationFrame() ka return value baad mein request ko cancel karne ke kaam bhi aa sakta hai
/*
let requestId = window.requestAnimationFrame(main);
cancelAnimationFrame(requestId);
*/

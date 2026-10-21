const dino = document.querySelector(".dino");
const gameOver = document.querySelector(".gameOver");
const obstacle = document.querySelector(".obstacle");
const audiogo = new Audio("./res/gameover.mp3");
const scoreCont = document.querySelector("#scoreCont");
let score = 0;
let cross = true;

// function on key down check what user presses then make logic a/c to that !!
function onKeyPress(e) {
  // console.log("Key Code is: ", e.key);
  if (e.key === "ArrowUp") {
    console.log("key up is pressed !");
    dino.classList.add("animateDino");
    // let dinoRect = dino.getBoundingClientRect();
    // console.log(dinoRect.bottom);
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }

  if (e.key === "ArrowRight") {
    // let oldLeft = window.getComputedStyle(dino).left;
    // console.log("Before:", oldLeft);
    // dino.style.left = Number.parseFloat(oldLeft) + 112 + "px";
    // console.log("After:", dino.style.left);

    // console.log("Clicks Right Arrow");
    //dino ki left position get kro or usko increase krdo
    let dinoStylesLeft = parseFloat(
      window.getComputedStyle(dino).getPropertyValue("left"),
    );
    // console.log(dinoStylesLeft);
    dino.style.left = dinoStylesLeft + 112 + "px";
    // console.log(typeof dinoStyles);
    // dino.getBoundingClientRect()

    // const dx = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
    // const dy = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    // console.log("dino co-ords ====>", dx, dy);

    //obstacle coordinates
    // const ox = parseInt(
    //   window.getComputedStyle(obstacle).getPropertyValue("left"),
    // );
    // const oy = parseInt(
    //   window.getComputedStyle(obstacle).getPropertyValue("top"),
    // );
    // const offsetX = Math.abs(dx - ox);
    // const offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY);
    // console.log("Obstacle co-ords ====>", ox, oy);
    // console.log(offsetX < 73);
    // console.log(offsetX <= 152);
  }

  if (e.key === "ArrowLeft") {
    let dinoStylesLeft = parseFloat(
      window.getComputedStyle(dino).getPropertyValue("left"),
    );
    // console.log(dinoStylesLeft);
    dino.style.left = dinoStylesLeft - 112 + "px";
  }
}

//Game ki main logic
setInterval(() => {
  //dino coordinates
  const dx = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
  const dy = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  // console.log("dino co-ords ====>", dx, dy);

  //obstacle coordinates
  const ox = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left"),
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("top"),
  );
  // console.log("Obstacle co-ords ====>", ox, oy);

  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);
  // console.log(offsetX);

  //collison
  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = "Game Over - Reload to start over";
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
    alert("Game Over");
    setTimeout(() => {
      audiogo.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1; //score=score+1;
    updateScore(score);
    cross = false;

    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      let aniDur = parseFloat(
        window
          .getComputedStyle(obstacle)
          .getPropertyValue("animation-duration"),
      );
      let newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}
// event listeners
document.addEventListener("keydown", onKeyPress);

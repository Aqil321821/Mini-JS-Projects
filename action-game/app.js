let score = 0;
const audiogo = new Audio("./res/gameover.mp3");
let cross = true;
const dino = document.querySelector(".dino");

// function on key down check what user presses then make logic a/c to that !!
function onKeyPress(e) {
  console.log("Key Code is: ", e.key);
  if (e.key === "ArrowUp") {
    console.log("key up is pressed !");
    dino.classList.add("animateDino");
    // let dinoRect = dino.getBoundingClientRect();
    // console.log(dinoRect.bottom);
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 800);
  }

  if (e.key === "ArrowRight") {
    // let oldLeft = window.getComputedStyle(dino).left;
    // console.log("Before:", oldLeft);
    // dino.style.left = Number.parseFloat(oldLeft) + 112 + "px";
    // console.log("After:", dino.style.left);

    console.log("Clicks Right Arrow");
    //dino ki left position get kro or usko increase krdo
    let dinoStylesLeft = parseFloat(
      window.getComputedStyle(dino).getPropertyValue("left"),
    );
    // console.log(dinoStylesLeft);
    dino.style.left = dinoStylesLeft + 112 + "px";
    // console.log(typeof dinoStyles);
    // dino.getBoundingClientRect()
  }

  if (e.key === "ArrowLeft") {
    let dinoStylesLeft = parseFloat(
      window.getComputedStyle(dino).getPropertyValue("left"),
    );
    // console.log(dinoStylesLeft);
    dino.style.left = dinoStylesLeft - 112 + "px";
  }
}

// event listeners
document.addEventListener("keydown", onKeyPress);

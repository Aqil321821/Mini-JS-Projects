//select all elements of the page
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEls = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

/*
we have to worry about three things :
operand 1
operand 2
operator 
*/
let operand1 = "";
let operand2 = "";
let operator = "";
let reuslt = null;

let haveDot = false;

//numberEls are all number on the page which is an array
//so sab pe addEL laga do using forEach
//jo number click hoa uski value lo or display2 me dikhao

numbersEls.forEach((number) => {
  number.addEventListener("click", (e) => {
    console.log(
      "Number is pressed==>",
      e.target.innerText,
      typeof e.target.innerText,
    );
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      //check if number has 2 decimals
      return;
    }
    //concatenate
    operand1 = operand1 + e.target.innerText;
    //show inside of element
    display2El.innerText= operand1;
  });
});

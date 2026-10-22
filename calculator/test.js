const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
let dis1Num = ""; // (previous input/expression.)
let dis2Num = ""; // (current input)
let result = null;
let lastOperation = "";
let haveDot = false; //checks whether number is floating point

//numbersEl is an array like entity, select button value and decimal

/*
1.har input buton ki value read kro
2.agar user . select krta ha to haveDot true 
3. 2 bar decimal select krna not allowed 
4.first time click hoa koi number , to wo value dis2Num me concatenate hoi, 
2nd bar hoa phr concatenate hoi
5.display2El me show krwa do jo k main current value rakhta ha, na k upar wala div jo k past ya expression as string dikhata ha 

*/
numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      // Check whether the number contains two decimals
      return;
    }
    dis2Num = dis2Num + e.target.innerText;
    display2El.innerText = dis2Num;
    console.log(dis2Num);
  });
});

/*
1.user ne pehla numeric de dia which is dis2Num like 123
2.ab user operator click krta ha like +
3.check kro k user ne dis2Num dia ha bhi ?? 
4.means k pehli entry kisi operator ki nahi ho skti wo should be number
5.ab user ne click kia + wo lo or lastOperation me store krdo
6.dis1Num && dis2Num && lastOperation ye teeno lazmi chaye 
ta k math opeartion ko de den or wo maths kr sky 
7.agar ye teeno nahi hen to filhaal result me dis2Num hi rkh do

8.is nechy waly forEach se mujhe do chezain mil rahi hain ek result , or doosra operator 

*/

operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName); //45 + 45 + 67 * 9
    lastOperation = operationName;
    console.log(result, typeof result);
    console.log(lastOperation);
  });
});

/*
clearVar() :
dis1Num jo k expression history rakhta ha usko updtae kre ga 
or current inpt ko emty krdega


*/
function clearVar(operationName = "") {
  dis1Num = dis1Num + dis2Num + " " + operationName + " ";
  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
  tempResultEl.innerText = result;
}

/*

*/

console.log(result);

/*
operationEl k forEAch k bad ham dis2Num ko result me store kr rahy hen 
jab user ne first time 2 + likha to result me 2 store ho gaya , ab hamary pass last input value "result" aa gayi or lastOpertaor b aa gaya 
means 2 aa gaya or + aa gaya,  
clearVar dis2Num (current input) usko empty krdega apart from visual work
ab again user lets say 5 likhta ha to wo value dobara 5 press krta ha 
 to ye condition true ho jaye gi or mathOperation function call ho jaye ga :
 if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } 
ab mathOperation , math kre ga or result ko updtae kr de ga
or result me computed value store ho jaye gi       


*/

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }

  console.log(result);
}

equalEl.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1El.innerText = "";
  display2El.innerText = "";
  result = "";
  tempResultEl.innerText = "";
});

clearLastEl.addEventListener("click", () => {
  display2El.innerText = "";
  dis2Num = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
    // console.log("e.key ====>", e.key);
    // console.log("e ====>", e);
    // console.log("e.code ====>", e.code);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  }
});

/*
keyboard ka koi button click ho to numberEl pe foreach loop laga kr check kro 
k kia user ne jo button dabaya ha wo kisi hamary button se match krta ha ?
agar krta ha to usko JS se hi click() call krdo 
same goes for others too 


*/
function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
      // console.log(`Button Clicked====>: ${button.innerText} and key is ${key}`);
    }
  });
}

function clickOperation(key) {
  operationEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  equalEl.click();
}

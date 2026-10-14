const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const btnClear = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = document.getElementById("btn");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value.trim();
  if (!newItem) {
    alert("Please enter a value.");
    return;
  }

  //chck if editMode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    const oldItem = itemToEdit.firstChild.textContent.trim();

    if (
      newItem.toLowerCase() !== oldItem.toLowerCase() &&
      getItemsFromStorage().some(
        (item) => item.toLowerCase() === newItem.toLowerCase(),
      )
    ) {
      alert("Item already exists");
      return;
    }

    removeItemFromStorage(oldItem);
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (
      getItemsFromStorage().some(
        (item) => item.toLowerCase() === newItem.toLowerCase(),
      )
    ) {
      alert("Item already exists");
      return;
    }
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);
  checkUI();
  itemInput.value = "";
}

function addItemToDOM(item) {
  //create new element
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
}

//create button
function createButton(classes) {
  const button = document.createElement("button");
  button.type = "button";

  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
//function create icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

//add item to LS
function addItemToStorage(item) {
  //check whether we have already array of items in LS
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  //convert into JSON String and set it to LS
  window.localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  //check whether we have already array of items in LS
  let itemsFromStorage;
  if (window.localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(window.localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.classList.contains("fa-xmark")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

//check if itm exist
function checkItemExist(item) {
  const ItemsFromStorage = getItemsFromStorage();
  return ItemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll("li").forEach((li) => {
    li.classList.remove("edit-mode");
  });
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "green";
  itemInput.value = item.textContent.trim();
}

function removeItem(item) {
  // console.log("Target ===> ", e.target);
  // console.log("Current Target ====> ", e.currentTarget);
  if (window.confirm("are you sure?")) {
    item.remove();
    //remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  //get item from stoarge
  let itemsFromStoarge = getItemsFromStorage();
  // console.log(itemsFromStoarge);
  //filter out items
  itemsFromStoarge = itemsFromStoarge.filter((i) => i !== item);
  // reset to LS
  window.localStorage.setItem("items", JSON.stringify(itemsFromStoarge));
}

function removeAll() {
  // console.log(Boolean(itemList.firstChild));
  // console.log(itemList.firstElementChild);
  while (itemList.firstElementChild) {
    itemList.removeChild(itemList.firstElementChild);
  }
  window.localStorage.removeItem("items");
  checkUI();

  // itemList.innerHTML = "";
}

//check if there is no items then dont show ClearALL and filter
function checkUI() {
  itemInput.value = "";
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    btnClear.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    btnClear.style.display = "block";
    itemFilter.style.display = "block";
  }
  formBtn.innerHTML = ' <i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

//filter items
function filterItems(e) {
  //get text of field filter
  const text = e.target.value.toLowerCase();
  //get all items in the ul which is node list so we can use forEach
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    //get text of each item
    const itemName = item.firstChild.textContent.trim().toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//all event listeneres
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onClickItem);
btnClear.addEventListener("click", removeAll);
itemFilter.addEventListener("input", filterItems);
window.document.addEventListener("DOMContentLoaded", displayItems);
checkUI();

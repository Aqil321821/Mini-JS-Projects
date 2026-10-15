const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

// show modal when we click on h1 and make focus on input
function showModal() {
  if (modal.classList.contains("show-modal")) {
    modal.classList.remove("show-modal");
  } else {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
  }
}

//modal open and close
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", showModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show-modal");
  }
});

function validateForm(nameValue, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  // Valid
  return true;
}

function storeBookmark(e) {
  e.preventDefault();
  console.log(e);
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.startsWith("http://") && !urlValue.startsWith("https://")) {
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue);
  if (!validateForm(nameValue, urlValue)) {
    return;
  }
}

//form event
bookmarkForm.addEventListener("submit", storeBookmark);

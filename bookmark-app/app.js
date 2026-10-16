const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

//array of objects for bookmarks
let bookmarks = [];

// show modal when we click on h1 and make focus on input
function showModal() {
  if (modal.classList.contains("show-modal")) {
    modal.classList.remove("show-modal");
  } else {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
  }
}

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
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.startsWith("http://") && !urlValue.startsWith("https://")) {
    urlValue = `https://${urlValue}`;
  }

  if (!validateForm(nameValue, urlValue)) {
    return;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  setToLocalStorage(bookmark);
  modal.classList.remove("show-modal");
  bookmarkForm.reset();
}

function setToLocalStorage(bookmark) {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function showBookmarksOnDOM() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    //create Item
    const item = document.createElement("div");
    //icon for close
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark(${url})`);
    const linkInfo = document.createElement("div");
    const favIcon = document.createElement("img");
    favIcon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`,
    );
    favIcon.setAttribute("alt", "Favicon");
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favIcon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

//form event
bookmarkForm.addEventListener("submit", storeBookmark);
//modal open and close
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", showModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show-modal");
  }
});

document.addEventListener("DOMContentLoaded", showBookmarksOnDOM);

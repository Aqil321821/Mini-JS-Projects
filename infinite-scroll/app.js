//grab elemnts
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//API variables
const count = 10;
const apiKey = "QQRbF0T-aF2pf8BDuTIGrv4P9sGSYY3h9OcsyaSVsCo";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//helper to set attribute
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((pic) => {
    const a = document.createElement("a");
    setAttributes(a, {
      href: pic.links.html,
      target: "_blank",
    });
    //img elemnet
    const img = document.createElement("img");
    setAttributes(img, {
      src: pic.urls.small,
      alt: pic.alt_description || "Unsplash photo",
      title: pic.alt_description || "Unsplash photo",
    });
    //check wheter image load is done

    img.addEventListener("load", imageLoaded);

    a.appendChild(img);
    imageContainer.appendChild(a);
  });
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      // const details = await res.text();
      // console.log("Status:", res.status);
      // console.log("API details:", details);
      throw new Error(`Request failed: ${res.status}`);
    }
    photosArray = await res.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
    ready = true;
    loader.hidden = true;
    imageContainer.innerHTML = `<p class = "danger">Couldn't load photos. Check your connection and try again.
    <br/>
    ${error.message}
    </p>`;
    loader.style.background = "none";
  }
}

//check if we are at the bottom , then make a request again
//window is parent of document and grandparent of body
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();

'use strict'
const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let ready = false;
let loadedImages = 0;
let totalImages = 0;
let photoArray = [];

let initialLoaded = true;
let initialCount = 5;
const apiKey = 'c599ovkyqctGdbT9449s5sCUFLnifQzGMJ-Bx4uuLaE';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}&orientation=landscape`;

function updateAPIUrl(count) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=landscape`;
}

function loadedImage() {
  loadedImages++;
  if (loadedImages === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhoto() {
  loadedImages = 0;
  totalImages = photoArray.length;
  photoArray.forEach((photo) => {
    const link = document.createElement('a');

    setAttributes(link, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', loadedImage);
    link.appendChild(img);
    imageContainer.appendChild(link);
  });
}

async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhoto();
    if (initialLoaded) {
      updateAPIUrl(30);
      initialLoaded = false;
    }
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhoto();
  }
})
getPhoto();
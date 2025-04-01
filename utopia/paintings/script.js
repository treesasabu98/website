// Image data
const imageData = [
  { url: "assets/fruits.jpg", title: "Art Piece 1", description: "This is the first art piece."},
  { url: "assets/berries.jpg", title: "Art Piece 2", description: "This is the second art piece." },
  { url: "assets/beach.jpg", title: "Art Piece 3", description: "This is the third art piece." },
  { url: "assets/tiger.jpg", title: "Art Piece 4", description: "This is the fourth art piece." },
  { url: "assets/lion.jpg", title: "Art Piece 5", description: "This is the fifth art piece." },
  { url: "assets/fire.jpg", title: "Art Piece 6", description: "This is the third art piece." },
  { url: "assets/dandelion.jpg", title: "Art Piece 7", description: "This is the fourth art piece." },
  { url: "assets/flowers.jpg", title: "Art Piece 8", description: "This is the fifth art piece." }
,
  { url: "assets/koi_fish.jpg", title: "Art Piece 9", description: "This is the third art piece." },
  { url: "assets/lemon.jpg", title: "Art Piece 10", description: "This is the fourth art piece." },
  { url: "assets/lighthouse.jpg", title: "Art Piece 11", description: "This is the fifth art piece." }
];

let pageData;
let currentIndex = 0;
let itemWidth;

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const galleryTrack = document.getElementById("galleryTrack");
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popupImage");
const popupDetails = document.getElementById("popupDetails");
const closePopup = document.getElementById("closePopup");


// New function for setting image count
function getGallerySize() {
  if (window.innerWidth < 768) {
      return 1; // Show 1 image at a time for mobile view
  } else {
      return 3; // Show 3 images at a time for desktop view
  }
}

//function to splitting image data for each page
function getEachPage()
{
  pageData = [];
  let size = getGallerySize();
  for (let i = 0; i < imageData.length; i += size)
    {
      pageData.push(imageData.slice(i, i+size))
  }
  return pageData;
}

//updating elements for image for current index
function updateGalleryImages()
{
  galleryTrack.innerHTML = ""; // Clear previous images
  pageData[currentIndex].forEach((image) => 
    {
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");
      galleryItem.innerHTML = `<img src="${image.url}" alt="${image.title}" />`;
      galleryItem.addEventListener("click", () => showPopup(image));
      galleryTrack.appendChild(galleryItem);
  });
}

// Show popup
function showPopup(image) {
  popupImage.src = image.url;
  popupDetails.innerHTML = `<strong>${image.title}</strong><br>${image.description}`;
  popup.style.display = "flex";
  prevButton.style.display = "none";
  nextButton.style.display = "none";
}

// Close popup
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  prevButton.style.display = "block";
  nextButton.style.display = "block";
});

// Close popup on clicking outside content
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
    prevButton.style.display = "block";
  nextButton.style.display = "block";
  }
});


// Update `updateGallery` function
function updateGallery() {
  updateGalleryImages();
  itemWidth = galleryTrack.querySelector(".gallery-item").offsetWidth + 30; // Include margin
  prevButton.style.display = currentIndex === 0 ? "none" : "block";
  nextButton.style.display = currentIndex === pageData.length - 1 ? "none" : "block";
  document.getElementById("currentPage").textContent = currentIndex + 1;
  document.getElementById("totalPages").textContent = pageData.length;
}

nextButton.addEventListener("click", () => {
  currentIndex++;
  document.getElementById("currentPage").textContent = currentIndex+1;
  updateGallery();
});

prevButton.addEventListener("click", () => {
  currentIndex--;
  document.getElementById("currentPage").textContent = currentIndex+1;
  updateGallery();
});

// Handle screen resize
window.addEventListener("resize", () => {
  const previousSize = pageData.length;
  getEachPage();
  if (pageData.length !== previousSize) {
    currentIndex = 0; // Reset to first page
    updateGallery();
  }
});

//initialising
getEachPage();
// // Initial gallery update
updateGallery();

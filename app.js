const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modal-img");
const images = document.querySelectorAll(".certificate-img");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const style = getComputedStyle(document.body);
const navigation = document.querySelectorAll(".nav-container a");
const projectVideos = document.querySelectorAll(".project-video");

let currentSlideIndex = 0;
let pageIndex = 0;
let touchEvent = null;
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
const SWIPE_THRESHOLD = 30;

handleNav();
showVideo(currentSlideIndex);
showPage(pageIndex);

function handleSwipe() {
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchEndY;

  if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > SWIPE_THRESHOLD) {
    if (deltaX < 0) {
      console.log("Swiped Right");
      currentSlideIndex = incSlideIndex();
      showVideo(currentSlideIndex);
      showPage(currentSlideIndex);
    } else {
      console.log("Swiped Left");
      currentSlideIndex = decSlideIndex();
      showVideo(currentSlideIndex);
      showPage(currentSlideIndex);
    }
  }
}

function incSlideIndex() {
  if (currentSlideIndex < 3) {
    currentSlideIndex++;
    if (currentSlideIndex >= 3) {
      currentSlideIndex = 0;
    }
  }
  return currentSlideIndex;
}

function decSlideIndex() {
  if (currentSlideIndex > -1) {
    currentSlideIndex--;
    if (currentSlideIndex <= -1) {
      currentSlideIndex = 2;
    }
  }
  return currentSlideIndex;
}

function handleNav() {
  navigation.forEach((link) => {
    link.addEventListener("click", function () {
      navigation.forEach((item) => {
        item.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
}

function showModal(index) {
  console.log(index);
  modal.style.display = "block";
  updateModalContent(index);
}

function updateModalContent(index) {
  const item = images[index];
  modalImg.src = item.src;
}

function closeModal() {
  modal.style.display = "none";
}

function showVideo(index) {
  const videos = document.querySelectorAll(".project-video");
  if (index >= 0 && index < videos.length) {
    Array.from(videos).forEach((video) => {
      video.style.display = "none";
    });

    videos[index].style.display = "block";
    currentSlideIndex = index;
  } else {
    console.log("Invalid Slide Index: " + index);
  }
}

function showPage(index) {
  const pages = document.querySelectorAll(".page");
  Array.from(pages).forEach((page) => {
    page.style.backgroundColor = "unset";
  });

  pages[index].style.backgroundColor = style.getPropertyValue("--tertiary");
  pageIndex = index;
}

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

images.forEach((img, index) => {
  img.addEventListener("click", () => showModal(index));
});

btnNext.addEventListener("click", function () {
  currentSlideIndex = incSlideIndex();
  showVideo(currentSlideIndex);
  showPage(currentSlideIndex);
});

btnPrev.addEventListener("click", function () {
  currentSlideIndex = decSlideIndex();
  showVideo(currentSlideIndex);
  showPage(currentSlideIndex);
});

projectVideos.forEach((video) => {
  video.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  });
  video.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
  });
});

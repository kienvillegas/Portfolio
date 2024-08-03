const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modal-img");
let img = document.getElementById("cert-img");
const images = document.getElementsByClassName("certificate-img");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const style = getComputedStyle(document.body);
const navigation = document.querySelectorAll(".nav-container a");
const ul = document.querySelector(".nav-list-container");
const menuToggle = document.getElementById("menu-toggle");

handleNav();

let currentSlideIndex = 0;
let pageIndex = 0;
showVideo(currentSlideIndex);
showPage(pageIndex);

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
  modal.style.display = "block";
  updateModalContent(index);
}

function closeModal() {
  modal.style.display = "none";
}

function updateModalContent(index) {
  console.log(images);
  const item = images[index];
  modalImg.src = item.src;
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

btnNext.addEventListener("click", function () {
  if (currentSlideIndex < 2) {
    currentSlideIndex++;
  }
  console.log(currentSlideIndex);
  showVideo(currentSlideIndex);
  showPage(currentSlideIndex);
});

btnPrev.addEventListener("click", function () {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  }
  console.log(currentSlideIndex);
  showVideo(currentSlideIndex);
  showPage(currentSlideIndex);
});

var carouselList = document.querySelectorAll(".test .carousel-list li");
var carouselDot = document.querySelectorAll(".test .carousel-dots button");
var nowImg = 0;
var totalImg = carouselList.length;
var currentImg;

document.querySelector(".test .arr-next").addEventListener("click", function () {
  currentImg = nowImg;
  nowImg++;
  if (nowImg === totalImg) {
    nowImg = 0;
  }
  prevNext(currentImg, nowImg);
});

document.querySelector(".test .arr-prev").addEventListener("click", function () {
  currentImg = nowImg;
  nowImg--;
  if (nowImg === -1) {
    nowImg = totalImg - 1;
  }
  prevNext(currentImg, nowImg);
});

[].forEach.call(carouselDot, function (el, idxDot) {
  el.addEventListener("click", function () {
    prevNext(nowImg, idxDot);
    nowImg = idxDot;
  });
});

function prevNext(current, change) {
  carouselList[current].classList.remove("active");
  carouselDot[current].classList.remove("active");
  carouselList[change].classList.add("active");
  carouselDot[change].classList.add("active");
}

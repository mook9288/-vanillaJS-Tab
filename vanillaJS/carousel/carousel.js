// 좌측 화살표 클릭시 이전 이미지, 우측 화살표 클릭시 다음 이미지
var carouselList = document.querySelectorAll(".carousel-list li");
var carouselDot = document.querySelectorAll(".carousel-dots button");
var carouselArrow = document.querySelectorAll(".carousel-arr button");

// 페이지 로딩 시, 첫 번째 이미지 화면에 보이기
for (var listIdx = 0; listIdx < carouselList.length; listIdx++) {
  carouselList[0].classList.add("active");
}
for (var dotIdx = 0; dotIdx < carouselDot.length; dotIdx++) {
  carouselDot[0].classList.add("active");
}

// 좌측 화살표 클릭시 이전 이미지 보여주기
// 우측 화살표 클릭시 다음 이미지 보여주기
// document.querySelector(".arr-next").addEventListener("click", arrowBtn);
// var listCurrent;

// function arrowBtn() {
//   carouselList.classList.contains("active").indexOf();
// }
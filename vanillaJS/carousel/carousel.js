
var carousel = document.querySelector(".carousel");
var imgSrc = "images/"; // 경로
var imgName = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg']; // 이미지 배열
var nowImg = 0; // 현재 이미지 index
var totalImg = imgName.length; // 전체 이미지 수
var currentImg; // 이전 이미지 index를 저장할 변수

// 이미지 생성
var carouselList = document.createElement("div");
var carouselImg = document.createElement("img");
var carouselListCreate = carousel.appendChild(carouselList);
carouselListCreate.appendChild(carouselImg);
carouselList.setAttribute("class", "carousel-list");
carouselImg.setAttribute("src", imgSrc + imgName[0]);

// 이전 다음 버튼 생성
var carouselArr = document.createElement("div");
var carouselNextBtn = document.createElement("button");
var carouselPrevBtn = document.createElement("button");
var carouselArrCreate = carousel.appendChild(carouselArr);
carouselArrCreate.appendChild(carouselNextBtn);
carouselArrCreate.appendChild(carouselPrevBtn);
carouselArr.setAttribute("class", "carousel-arr");
carouselNextBtn.setAttribute("class", "arr-next");
carouselPrevBtn.setAttribute("class", "arr-prev");

// Dot 생성
var dot = document.createElement("div");
var dotCreate = carousel.appendChild(dot);
dot.setAttribute("class", "carousel-dots");
for (var idxDot = 1; idxDot <= totalImg; idxDot++) {
  var dotBtn = document.createElement("button");
  var dotNum = document.createTextNode(idxDot);
  dotBtn.appendChild(dotNum);
  dotCreate.appendChild(dotBtn);
  document.querySelector(".carousel-dots").firstChild.setAttribute("class","active");
}

// 이미지 변경, 변경된 이미지로 dot 활성화
// current: 클릭 전 활성화된 이미지
// change: 클릭 후 활성화될 이미지
function prevNext(current, change) {
  carouselImg.setAttribute("src", imgSrc + imgName[change]);
  carouselDot[current].classList.remove("active");
  carouselDot[change].classList.add("active");
}

// 다음 버튼 클릭시 다음 이미지 변경
var carouselNext = document.querySelector(".carousel-arr .arr-next");
carouselNext.addEventListener("click", function () {
  // 지금 현재 index를 저장
  currentImg = nowImg;
  // 다음 버튼 클릭될 때마다 index 증가
  nowImg++;
  // 이미지 1~5 사이를 반복하기 위해 조건 추가, 전체 이미지 수보다 커질 때
  if (nowImg >= totalImg) {
    // 이미지 index를 처음 index로 변경해 줌
    nowImg = 0;
  }
  // 변경된 이미지 활성화
  prevNext(currentImg, nowImg);
});

// 이전 버튼 클릭시 이전 이미지 변경
var carouselPrev = document.querySelector(".carousel-arr .arr-prev");
carouselPrev.addEventListener("click", function () {
  // 지금 현재 index를 저장
  currentImg = nowImg;
  // 이전 버튼클릭될 때마다 index 감소
  nowImg--;
  // 이미지 1~5 사이를 반복하기 위해 조건 추가, -1보다 작아질 때
  if (nowImg <= -1) {
    // 이미지 index를 마지막 index로 변경해 줌
    nowImg = totalImg - 1;
  }
  // 변경된 이미지 활성화
  prevNext(currentImg, nowImg);
});

// Dot 버튼 클릭시 해당 index 이미지로 변경
// carouselDot은 같은 기능을 가진 여러개의 Dot 버튼을 유사배열로 받음(배열은 아님!)
// for문 안에 직접 익명함수 내용을 넣으면 classList가 정의 되지 않아 읽을 수 없다는 에러가 발생한다.
// prevNext()을 빼고 console에 idxDot을 찍어봤는데 5만 찍힘.
// 변수 idxDot의 값이 외부 변수가 아님. 5로 정의되어 전역변수가 됨..(for이 다 돌고 나서 5로 재정의.)
// 이럴땐, 익명함수를 이용하거나 외부함수를 사용하면 해결 됨.
// 내부함수의 변수가 외부함수의 지역변수를 참조하게 해주면 된다.
var arrDot = [];
var carouselDot = document.querySelectorAll(".carousel-dots button");
for (var idxDotBtn = 0; idxDotBtn < totalImg; idxDotBtn++) {
  arrDot[idxDotBtn] = function (idx) {
    carouselDot[idx].addEventListener("click", function () {
      prevNext(nowImg, idx);
      nowImg = idx;
    });
  }(idxDotBtn);
}
/* 또는 forEach 사용.
call() 메서드의 첫번째 인자로 전달되는 객체를 this로 지정할 수 있다.
[].forEach.call(carouselDot, function (el, idxDot) {
  el.addEventListener("click", function () {
    prevNext(nowImg, idxDot);
    nowImg = idxDot;
  });
}); */

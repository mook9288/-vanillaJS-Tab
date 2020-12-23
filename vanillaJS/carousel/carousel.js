function carousel(cls, src, imgArr) {
  var carousel = document.querySelector(cls);
  var imgSrc = src; // 이미지 경로
  var imgName = imgArr; // 이미지 배열
  var nowImg = 0; // 현재 이미지 index
  var totalImg = imgArr.length; // 전체 이미지 수
  var currentImg; // 이전 이미지 index를 저장할 변수

  // Layout
  carousel.innerHTML = `<div class="carousel-list"></div><div class="carousel-arr"></div><div class="carousel-dots"></div>`;
  document.querySelector(".carousel-list").innerHTML = `<img src="` + imgSrc + imgName[nowImg] + `" alt="">`
  document.querySelector(".carousel-arr").innerHTML = `<button class="arr-prev">이전</button><button class="arr-next">다음</button>`
  for (var idxDot = 1; idxDot <= totalImg; idxDot++) {
    document.querySelector(".carousel-dots").innerHTML += `<button>` + idxDot + `</button>`;
    document.querySelector(".carousel-dots").childNodes[nowImg].setAttribute("class","active");
  }

  // Dots Button
  var arrDot = [];
  var dotBtn = document.querySelectorAll(".carousel-dots button");
  for (var dotBtnIdx = 0; dotBtnIdx < totalImg; dotBtnIdx++) {
    arrDot[dotBtnIdx] = function (idx) {
      dotBtn[idx].addEventListener("click", function () {
        prevNext(nowImg, idx);
        nowImg = idx;
      });
    }(dotBtnIdx);
  }

  // Next Button
  document.querySelector(".carousel-arr .arr-next").addEventListener("click", function () {
    currentImg = nowImg;
    nowImg++;
    if (nowImg >= totalImg) nowImg = 0;
    prevNext(currentImg, nowImg);
  });

  // Previous Button
  document.querySelector(".carousel-arr .arr-prev").addEventListener("click", function () {
    currentImg = nowImg;
    nowImg--;
    if (nowImg <= -1) nowImg = totalImg - 1;
    prevNext(currentImg, nowImg);
  });

  // Image & Dot Button Change
  function prevNext(current, change) {
    document.querySelector(".carousel-list img").setAttribute("src", imgSrc + imgName[change]);
    dotBtn[current].classList.remove("active");
    dotBtn[change].classList.add("active");
  }
}
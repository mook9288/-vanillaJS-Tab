(function () {
  let initCubeArray = [
    ["B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ];
  const cubes = document.querySelectorAll(".cube");
  const inpCode = document.querySelector(".inp-code");
  const resultButton = document.querySelector(".btn-result");

  fillCubeCell();
  resultButton.addEventListener("click", handleClickEvent);

  function fillCubeCell() {
    [...cubes].innerHTML = "";

    for (let i = 0; i < initCubeArray.length; i++) {
      for (let j = 0; j < initCubeArray[i].length; j++) {
        cubes[i].innerHTML += `<span class="color-${i}">${initCubeArray[i][j]}</span>`;
      }
    }
  }

  function handleClickEvent() {
    if (!inpCode.value) {
      return alert("CUBE 동작 코드를 입력하세요.");
    } else if (inpCode.value[0] === "'") {
      alert("맨 앞에 '은 올 수 없습니다.");
      return inpCode.value = "";
    } else if (inpCode.value.replace(/[udlrfb']/gi, "")) {
      alert("올바른 CUBE 동작 코드가 아닙니다.");
      return inpCode.value = "";
    }
  }
})();

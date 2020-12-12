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
    for (let i = 0; i < initCubeArray.length; i++) {
      cubes[i].innerHTML = '';

      for (let j = 0; j < initCubeArray[i].length; j++) {
        const color = initCubeArray[i][j];
        cubes[i].innerHTML += `<span class="color-${color.toLocaleLowerCase()}">${color}</span>`;
      }
    }
  }

  function handleClickEvent() {
    if (!inpCode.value) {
      return alert("CUBE 동작 코드를 입력하세요.");
    } else if (inpCode.value[0] === "'") {
      alert("맨 앞에 '은 올 수 없습니다.");
      return inpCode.value = "";
    } else if (inpCode.value.replace(/[udlrfbq']/gi, "")) {
      alert("올바른 CUBE 동작 코드가 아닙니다.");
      return inpCode.value = "";
    }

    receiveEnterCode();
  }

  function receiveEnterCode() {
    const inpCodeArray = inpCode.value.toUpperCase().split("");

    inpCodeArray.forEach(function (item, index, arr) {
      if (item === "'") {
        arr[index - 1] += "'";
        arr.splice(index, 1);
      }
    });

    for (let i = 0; i < inpCodeArray.length; i++) {
      setTimeout(moveCube, 1000 * i, inpCodeArray[i]);
    }
  }

  function moveCube(code) {
    const CUBE_CODE = {
      U: "U",
      U_OPP: "U'",
    }
    const divisionNum = 3;
    const movedLine = moveLine(CUBE_CODE.U);
    let newFaceArray = [];
    let movedLineArray = [];
    let initLineArray = '';

    if (code === CUBE_CODE.U) {
      for (let i = 0; i < initCubeArray.length; i++) {
        newFaceArray.push(initCubeArray[i]);
      }

      for (let i = 0; i < movedLine.length; i++) {
        movedLineArray.push(initCubeArray[movedLine[i]].splice(0, divisionNum));
      }

      initLineArray = movedLineArray.shift();
      movedLineArray.push(initLineArray);

      for (let i = 0; i < movedLine.length; i++) {
        initCubeArray[movedLine[i]].splice(0, 0, movedLineArray[i])
        initCubeArray[movedLine[i]] = extendFlatArray(initCubeArray[movedLine[i]]);
      }
    }

    return fillCubeCell();
  }

  function extendFlatArray(nestedArray) {
    var result = [];

    for (var i = 0; i < nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        result.push(...extendFlatArray(nestedArray[i]));
      } else {
        result.push(nestedArray[i]);
      }
    }
    return result;
  }

  function moveLine(line) {
    const selectedLine = {
      "U": [1, 2, 3, 4],
    }

    return selectedLine[line];
  }
})();

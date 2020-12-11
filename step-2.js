(function () {
  let initCubeArray = ["R", "R", "W", "G", "C", "W", "G", "B", "B"];
  const cube = document.querySelector(".cube");
  const inpCode = document.querySelector(".inp-code");
  const resultButton = document.querySelector(".btn-result");

  fillCubeCell();
  resultButton.addEventListener("click", handleClickEvent);

  function fillCubeCell() {
    cube.innerHTML = "";
    for (let i = 0; i < initCubeArray.length; i++) {
      cube.innerHTML += `<span>${initCubeArray[i]}</span>`;
    }
  }

  function handleClickEvent() {
    if (!inpCode.value) {
      return alert("CUBE 동작 코드를 입력하세요.");
    } else if (inpCode.value[0] === "'") {
      alert("맨 앞에 '은 올 수 없습니다.");
      return inpCode.value = '!!!';
    } else if (inpCode.value.replace(/[curlbq']/gi, "")) {
      alert("올바른 CUBE 동작 코드가 아닙니다.");
      return inpCode.value = '???';
    }

    const inpCodeArray = inpCode.value.toUpperCase().split("");

    inpCodeArray.forEach(function (item, index, arr) {
      if (item === "'") {
        arr[index - 1] += "'";
        arr.splice(index, 1);
      }
    });

    for (let i = 0; i < inpCodeArray.length; i++) {
      const element = inpCodeArray[i];
      setTimeout(moveCube, 1000 * i, element);
    }
  }

  function moveCube(line) {
    let movedLine = moveLine(line);
    let movedLineNum = movedLine.length;
    let movedLineLastIndex = movedLineNum - 1;
    let movedCell = "";
    let horizontalLine = "";
    let movedLineArray = [];
    let count = 0;
    const CUBE_CODE = {
      U: "U",
      U_OPP: "U'",
      R: "R",
      R_OPP: "R'",
      L: "L",
      L_OPP: "L'",
      B: "B",
      B_OPP: "B'",
      C: "C",
      C_OPP: "C'",
      Q: "Q",
    }
    const CUBE_DIR = {
      HOR_T: 3,
      HOR_B: 0,
      VER_L: 0,
      VER_R: 2,
      FLAG_T: true,
      FLAG_F: false,
    }

    switch (line) {
      case CUBE_CODE.C:
        moveCirculation(CUBE_DIR.FLAG_T);
        break;

      case CUBE_CODE.C_OPP:
        moveCirculation(CUBE_DIR.FLAG_F);
        break;

      case CUBE_CODE.U:
        moveDirLift(CUBE_DIR.HOR_T, CUBE_DIR.FLAG_T);
        break;

      case CUBE_CODE.U_OPP:
        moveDirRight(CUBE_DIR.HOR_T, CUBE_DIR.FLAG_F);
        break;

      case CUBE_CODE.B:
        moveDirRight(CUBE_DIR.HOR_B, CUBE_DIR.FLAG_T);
        break;

      case CUBE_CODE.B_OPP:
        moveDirLift(CUBE_DIR.HOR_B, CUBE_DIR.FLAG_F);
        break;

      case CUBE_CODE.R:
        moveVerticality(CUBE_DIR.VER_R, CUBE_DIR.FLAG_T);
        break;

      case CUBE_CODE.R_OPP:
        moveVerticality(CUBE_DIR.VER_R, CUBE_DIR.FLAG_F);
        break;

      case CUBE_CODE.L:
        moveVerticality(CUBE_DIR.VER_L, CUBE_DIR.FLAG_F);
        break;

      case CUBE_CODE.L_OPP:
        moveVerticality(CUBE_DIR.VER_L, CUBE_DIR.FLAG_T);
        break;

      case CUBE_CODE.Q:
        alert("Bye~");
        initCubeArray = ["R", "R", "W", "G", "C", "W", "G", "B", "B"];
        inpCode.value = "";
        break;

      default:
        break;
    }

    function moveCirculation(dir) {
      for (let i = 0; i < initCubeArray.length; i++) {
        movedLineArray.push(initCubeArray[i]);
      }

      if (dir) {
        initCubeArray.splice(0, 1, movedLineArray[6]);
        initCubeArray.splice(1, 1, movedLineArray[3]);
        initCubeArray.splice(2, 1, movedLineArray[0]);
        initCubeArray.splice(3, 1, movedLineArray[7]);
        initCubeArray.splice(5, 1, movedLineArray[1]);
        initCubeArray.splice(6, 1, movedLineArray[8]);
        initCubeArray.splice(7, 1, movedLineArray[5]);
        initCubeArray.splice(8, 1, movedLineArray[2]);
      } else {
        initCubeArray.splice(0, 1, movedLineArray[2]);
        initCubeArray.splice(1, 1, movedLineArray[5]);
        initCubeArray.splice(2, 1, movedLineArray[8]);
        initCubeArray.splice(3, 1, movedLineArray[1]);
        initCubeArray.splice(5, 1, movedLineArray[7]);
        initCubeArray.splice(6, 1, movedLineArray[0]);
        initCubeArray.splice(7, 1, movedLineArray[3]);
        initCubeArray.splice(8, 1, movedLineArray[6]);
      }
    }

    function moveDirLift(num, dir) {
      if (dir) {
        horizontalLine = initCubeArray.slice(movedLine[0], num);
      } else {
        horizontalLine = initCubeArray.slice(movedLine[0]);
      }

      movedCell = horizontalLine.shift();
      horizontalLine.splice(movedLine[movedLineLastIndex], 0, movedCell);
      initCubeArray.splice(movedLine[0], movedLineNum, horizontalLine);
      initCubeArray = extendFlatArray(initCubeArray);
    }

    function moveDirRight(num, dir) {
      if (dir) {
        horizontalLine = initCubeArray.slice(movedLine[0]);
      } else {
        horizontalLine = initCubeArray.slice(movedLine[0], num);
      }

      movedCell = horizontalLine.pop();
      horizontalLine.unshift(movedCell);
      initCubeArray.splice(movedLine[0], movedLineNum, horizontalLine);
      initCubeArray = extendFlatArray(initCubeArray);
    }

    function moveVerticality(num, dir) {
      for (let i = 0; i < movedLineNum; i++) {
        movedLineArray[i] = initCubeArray[movedLine[i]];
      }

      if (dir) {
        movedCell = movedLineArray.shift();
        movedLineArray.splice(movedLine[movedLineLastIndex], 0, movedCell);
      } else {
        movedCell = movedLineArray.pop();
        movedLineArray.unshift(movedCell);
      }

      for (let j = 0; j < initCubeArray.length; j++) {
        if (j % movedLineNum === num) {
          initCubeArray[j] = movedLineArray[count];
          count++;
        }
      }
    }

    return fillCubeCell();
  }

  function moveLine(line) {
    const selectedLine = {
      "U": [0, 1, 2],
      "U'": [0, 1, 2],
      "R": [2, 5, 8],
      "R'": [2, 5, 8],
      "L": [0, 3, 6],
      "L'": [0, 3, 6],
      "B": [6, 7, 8],
      "B'": [6, 7, 8],
      "C": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      "C'": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      "Q": '',
    }

    return selectedLine[line];
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
})();

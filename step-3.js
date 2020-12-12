(function () {
  let initCubeArray = [
    ["B", "B", "B", "B", "B", "B", "1", "1", "1"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    ["2", "2", "2", "R", "R", "R", "R", "R", "R"],
  ];
  const cubes = document.querySelectorAll(".cube");
  const inpCode = document.querySelector(".inp-code");
  const resultButton = document.querySelector(".btn-result");
  const CUBE_CODE = {
    U: "U",
    U_OPP: "U'",
    D: "D",
    D_OPP: "D'",
  }
  const CUBE_FACE = {
    UP: 0,
    LEFT:1,
    FRONT: 2,
    RIGHT: 3,
    BACK: 4,
    DOWN: 5,
  }
  const CUBE_DIR = {
    LR: "from L to R",
    RL: "from R to L",
  }

  fillCubeCell();
  resultButton.addEventListener("click", handleClickEvent);

  function fillCubeCell() {
    for (let i = 0; i < initCubeArray.length; i++) {
      cubes[i].innerHTML = "";

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

    RunCodeSequentially();
  }

  function RunCodeSequentially() {
    const inpCodeArray = inpCode.value.toUpperCase().split("");

    inpCodeArray.forEach(function (item, index, arr) {
      if (item === "'") {
        arr[index - 1] += "'";
        arr.splice(index, 1);
      }
    });
    console.log(inpCodeArray);

    for (let i = 0; i < inpCodeArray.length; i++) {
      setTimeout(categorizeCode, 1000 * i, inpCodeArray[i]);
    }
  }

  const divisionNum = 3;
  let faceArray = [];
  let movingLineArray = [];
  let movingCellArray = "";

  function categorizeCode(code) {
    let movedLine = "";

    switch (code) {
      case CUBE_CODE.U:
        movedLine = rotateLine(CUBE_FACE.UP);
        rotateTop(movedLine, CUBE_FACE.UP, CUBE_DIR.LR);
        break;

      case CUBE_CODE.U_OPP:
        movedLine = rotateLine(CUBE_FACE.UP);
        rotateTop(movedLine, CUBE_FACE.UP, CUBE_DIR.RL)
        break;

      case CUBE_CODE.D:
        movedLine = rotateLine(CUBE_FACE.DOWN);
        rotateBottom(movedLine, CUBE_FACE.DOWN, CUBE_DIR.LR);
        break;

      case CUBE_CODE.D_OPP:
        movedLine = rotateLine(CUBE_FACE.DOWN);
        rotateBottom(movedLine, CUBE_FACE.DOWN, CUBE_DIR.RL)
        break;

      case CUBE_CODE.Q:
        alert("Bye~");
        initCubeArray = [
          new Array(9).fill('B'),
          new Array(9).fill('W'),
          new Array(9).fill('O'),
          new Array(9).fill('G'),
          new Array(9).fill('Y'),
          new Array(9).fill('R'),
        ];
        inpCode.value = "";
        break;

      default:
        break;
    }

    return fillCubeCell();
  }

  function rotateTop(line, face, dir) {
    for (let i = 0; i < initCubeArray.length; i++) {
      faceArray.push(initCubeArray[i]);
    }

    for (let i = 0; i < line.length; i++) {
      movingLineArray.push(initCubeArray[line[i]].splice(0, divisionNum));
    }

    if (dir === CUBE_DIR.LR) {
      movingCellArray = movingLineArray.shift();
      movingLineArray.push(movingCellArray);
    } else {
      movingCellArray = movingLineArray.pop();
      movingLineArray.unshift(movingCellArray);
    }

    for (let i = 0; i < line.length; i++) {
      initCubeArray[line[i]].splice(0, 0, movingLineArray[i])
      initCubeArray[line[i]] = extendFlatArray(initCubeArray[line[i]]);
    }

    rotateFaceOfCube(initCubeArray[face], rotatePosition(dir));
  }

  function rotateBottom(line, face, dir) {
    console.log(line, face, dir);
    for (let i = 0; i < initCubeArray.length; i++) {
      faceArray.push(initCubeArray[i]);
    }

    for (let i = 0; i < line.length; i++) {
      movingLineArray.push(initCubeArray[line[i]].splice(divisionNum * 2));
    }

    if (dir === CUBE_DIR.RL) {
      movingCellArray = movingLineArray.shift();
      movingLineArray.push(movingCellArray);
    } else {
      movingCellArray = movingLineArray.pop();
      movingLineArray.unshift(movingCellArray);
    }

    for (let i = 0; i < line.length; i++) {
      initCubeArray[line[i]].splice(divisionNum * 2, 0, movingLineArray[i])
      initCubeArray[line[i]] = extendFlatArray(initCubeArray[line[i]]);
    }

    rotateFaceOfCube(initCubeArray[face], rotatePosition(dir));
  }

  function rotateLine(line) {
    const selectedLine = {
      0: [1, 2, 3, 4],
      1: [0, 2, 5, 4],
      2: [0, 1, 3, 5],
      3: [0, 2, 5, 4],
      4: [0, 1, 2, 3],
      5: [1, 2, 3, 4],
    }

    return selectedLine[line];
  }

  function rotatePosition(line) {
    const selectedLine = {
      "from L to R": [6, 3, 0, 7, 4, 1, 8, 5, 2],
      "from R to L": [2, 5, 8, 1, 4, 7, 0, 3, 6],
    }

    return selectedLine[line];
  }

  function rotateFaceOfCube(init, pos) {
    const movedCycleArray = [];

    for (let i = 0; i < init.length; i++) {
      movedCycleArray.push(init[i]);
    }
    
    for (let j = 0; j < pos.length; j++) {
      init.splice(j, 1, movedCycleArray[pos[j]]);
    }
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

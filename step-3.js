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
    L: "L",
    L_OPP: "L'",
    R: "R",
    R_OPP: "R'",
    F: "F",
    F_OPP: "F'",
    B: "B",
    B_OPP: "B'",
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
    L: "L",
    R: "R",
  }
  const divisionNum = 3;
  // let faceArray = [];
  let movingLineArray = [];
  let movingCellArray = "";

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

    for (let i = 0; i < inpCodeArray.length; i++) {
      setTimeout(categorizeCode, 1000 * i, inpCodeArray[i]);
    }
  }

  function rotateLine(line) {
    const selected = {
      0: [1, 2, 3, 4],
      1: [0, 2, 5, 4],
      2: [0, 1, 3, 5],
      3: [0, 2, 5, 4],
      4: [0, 1, 2, 3],
      5: [1, 2, 3, 4],
    }

    return selected[line];
  }

  function rotateSideCell(line) {
    const selected = {
      "L": [0, 3, 6],
      "R": [2, 5, 8],
    }

    return selected[line];
  }

  function rotatePosition(line) {
    const selected = {
      "from L to R": [6, 3, 0, 7, 4, 1, 8, 5, 2],
      "from R to L": [2, 5, 8, 1, 4, 7, 0, 3, 6],
    }

    return selected[line];
  }

  function categorizeCode(code) {
    let movedLine = "";

    switch (code) {
      case CUBE_CODE.U:
        movedLine = rotateLine(CUBE_FACE.UP);
        rotateTop(movedLine, CUBE_FACE.UP, CUBE_DIR.LR);
        break;

      case CUBE_CODE.U_OPP:
        movedLine = rotateLine(CUBE_FACE.UP);
        rotateTop(movedLine, CUBE_FACE.UP, CUBE_DIR.RL);
        break;

      case CUBE_CODE.D:
        movedLine = rotateLine(CUBE_FACE.DOWN);
        rotateBottom(movedLine, CUBE_FACE.DOWN, CUBE_DIR.LR);
        break;

      case CUBE_CODE.D_OPP:
        movedLine = rotateLine(CUBE_FACE.DOWN);
        rotateBottom(movedLine, CUBE_FACE.DOWN, CUBE_DIR.RL);
        break;

      case CUBE_CODE.L:
        movedLine = rotateLine(CUBE_FACE.LEFT);
        rotateLeft(movedLine, CUBE_FACE.LEFT, CUBE_DIR.LR, CUBE_DIR.L);
        break;

      case CUBE_CODE.L_OPP:
        movedLine = rotateLine(CUBE_FACE.LEFT);
        rotateLeft(movedLine, CUBE_FACE.LEFT, CUBE_DIR.RL, CUBE_DIR.L);
        break;

      case CUBE_CODE.F:
        break;

      case CUBE_CODE.F_OPP:
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

  function selectMovingFace(line, face) {
    for (let i = 0; i < line.length; i++) {
      switch (face) {
        case CUBE_FACE.UP:
          movingLineArray.push(initCubeArray[line[i]].splice(0, divisionNum));
          break;

        case CUBE_FACE.DOWN:
          movingLineArray.push(initCubeArray[line[i]].splice(divisionNum * 2));
          break;

        case CUBE_FACE.LEFT:
          movingLineArray.push(initCubeArray[line[i]]);
          break;

        default:
          break;
      }
    }
    return movingLineArray;
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

  function rotateTop(line, face, dir) {
    const movingLineArray = selectMovingFace(line, face);

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
    const movingLineArray = selectMovingFace(line, face);

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

  function rotateLeft(line, face, dir, lnr) {
    const movingLineArray = selectMovingFace(line, face);
    const copyMovingLineArray = JSON.parse(JSON.stringify(movingLineArray));
    const sideCellIndex = rotateSideCell(lnr);
    const num = 2;

    movingCellArray = copyMovingLineArray.pop();
    copyMovingLineArray.unshift(movingCellArray);

    for (let i = 0; i < line.length; i++) {
      for (let j = 0; j < sideCellIndex.length; j++) {
        if (i === 0) {
          initCubeArray[line[i]][sideCellIndex[j]] = copyMovingLineArray[i][sideCellIndex[j] + num];
        } else if (i === line.length - 1) {
          initCubeArray[line[i]][sideCellIndex[j] + num] = copyMovingLineArray[i][sideCellIndex[j]];
        } else {
          initCubeArray[line[i]][sideCellIndex[j]] = copyMovingLineArray[i][sideCellIndex[j]];
        }
      }
    }

    rotateFaceOfCube(initCubeArray[face], rotatePosition(dir));
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

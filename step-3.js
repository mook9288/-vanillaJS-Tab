(function () {
  let initCubeArray = [
    ["B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["1", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R"],
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
    Q: "Q"
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
    F: "F",
    // FL: "FL",
    B: "B",
    // BL: "BL",
  }
  const divisionNum = 3;
  let countCode = 0;
  let movingCellArray = "";

  fillCubeCell();
  resultButton.addEventListener("click", handleClickEvent);

  inpCode.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      resultButton.click();
    }
  });

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

    countCode += inpCodeArray.length;

    for (let i = 0; i < inpCodeArray.length; i++) {
      setTimeout(categorizeCode, 1000 * i, inpCodeArray[i]);
    }
  }

  function rotateLine(line) {
    const selected = {
      0: [1, 2, 3, 4],
      1: [0, 2, 5, 4],
      2: [0, 3, 5, 1],
      3: [0, 2, 5, 4],
      4: [0, 1, 5, 3],
      5: [1, 2, 3, 4],
    }

    return selected[line];
  }

  function rotateSideCell(line) {
    const selected = {
      "L": [0, 3, 6],
      "R": [2, 5, 8],
      "F": [6, 7, 8, 0, 3, 6, 0, 1, 2, 2, 5, 8],
      // "FL": [6, 7, 8, 0, 3, 6, 0, 1, 2, 2, 5, 8],
      "B": [0, 1, 2, 0, 3, 6, 6, 7, 8, 2, 5, 8],
      // "BL": [0, 1, 2, 0, 3, 6, 6, 7, 8, 2, 5, 8],
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
        rotateDown(movedLine, CUBE_FACE.LEFT, CUBE_DIR.LR, CUBE_DIR.L);
        break;

      case CUBE_CODE.L_OPP:
        movedLine = rotateLine(CUBE_FACE.LEFT);
        rotateUp(movedLine, CUBE_FACE.LEFT, CUBE_DIR.RL, CUBE_DIR.L);
        break;

      case CUBE_CODE.R:
        movedLine = rotateLine(CUBE_FACE.RIGHT);
        rotateUp(movedLine, CUBE_FACE.RIGHT, CUBE_DIR.LR, CUBE_DIR.R);
        break;

      case CUBE_CODE.R_OPP:
        movedLine = rotateLine(CUBE_FACE.RIGHT);
        rotateDown(movedLine, CUBE_FACE.RIGHT, CUBE_DIR.RL, CUBE_DIR.R);
        break;

      case CUBE_CODE.F:
        movedLine = rotateLine(CUBE_FACE.FRONT);
        rotateFnB(movedLine, CUBE_FACE.FRONT, CUBE_DIR.LR, CUBE_DIR.F);
        break;

      case CUBE_CODE.F_OPP:
        movedLine = rotateLine(CUBE_FACE.FRONT);
        rotateFnB(movedLine, CUBE_FACE.FRONT, CUBE_DIR.RL, CUBE_DIR.F);
        break;

      case CUBE_CODE.B:
        movedLine = rotateLine(CUBE_FACE.BACK);
        rotateFnB(movedLine, CUBE_FACE.BACK, CUBE_DIR.LR, CUBE_DIR.B);
        break;

      case CUBE_CODE.B_OPP:
        movedLine = rotateLine(CUBE_FACE.BACK);
        rotateFnB(movedLine, CUBE_FACE.BACK, CUBE_DIR.RL, CUBE_DIR.B);
        break;

      case CUBE_CODE.Q:
        alert("큐브 조작 총 시도: " + (countCode - 1) + "\nBye~ 종료되었습니다.");
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
    const pushArray = [];
    for (let i = 0; i < line.length; i++) {
      switch (face) {
        case CUBE_FACE.UP:
          pushArray.push(initCubeArray[line[i]].splice(0, divisionNum));
          break;

        case CUBE_FACE.DOWN:
          pushArray.push(initCubeArray[line[i]].splice(divisionNum * 2));
          break;

        default:
          pushArray.push(initCubeArray[line[i]]);
          break;
      }
    }
    return pushArray;
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

  function rotateUp(line, face, dir, pos) {
    const movingLineArray = selectMovingFace(line, face);
    const copyMovingLineArray = JSON.parse(JSON.stringify(movingLineArray));
    const sideCellIndex = rotateSideCell(pos);
    const num = pos === CUBE_DIR.L ? 2 : -2;

    movingCellArray = copyMovingLineArray.shift();
    copyMovingLineArray.splice(copyMovingLineArray.length + 1, 0, movingCellArray);

    for (let i = 0; i < line.length; i++) {
      for (let j = 0; j < sideCellIndex.length; j++) {;
        if (i === 2) {
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

  function rotateDown(line, face, dir, pos) {
    const movingLineArray = selectMovingFace(line, face);
    const copyMovingLineArray = JSON.parse(JSON.stringify(movingLineArray));
    const sideCellIndex = rotateSideCell(pos);
    const num = pos === CUBE_DIR.L ? 2 : -2;

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

  function rotateFnB(line, face, dir, pos) {
    const movingLineArray = selectMovingFace(line, face);
    const copyMovingLineArray = JSON.parse(JSON.stringify(movingLineArray));
    const sideCellIndex = rotateSideCell(pos);
    const obj = {};
    let objKey = 0;

    for (let i = 0; i < line.length; i++) {
      obj[objKey] = sideCellIndex.splice(0, 3);
      objKey++;
    }

    for (const key in obj) {
      const keyCount = parseInt(key);
      let count = "";

      if (dir === CUBE_DIR.LR) {
        count = keyCount === 0 ? keyCount + 3 : keyCount - 1;
      } else {
        count = keyCount === 3 ? 0 : keyCount + 1;
      }

      for (let i = 0; i < obj[key].length; i++) {
        movingLineArray[key][obj[key][i]] = copyMovingLineArray[count][obj[count][i]];
      }
    }

    rotateFaceOfCube(initCubeArray[face], rotatePosition(dir));
  }

  // function rotateBack(line, face, dir, pos) {
  //   const movingLineArray = selectMovingFace(line, face);
  //   const copyMovingLineArray = JSON.parse(JSON.stringify(movingLineArray));
  //   const sideCellIndex = rotateSideCell(pos);
  //   const obj = {};
  //   let objKey = 0;

  //   for (let i = 0; i < line.length; i++) {
  //     obj[objKey] = sideCellIndex.splice(0, 3);
  //     objKey++;
  //   }

  //   for (const key in obj) {
  //     const keyCount = parseInt(key);
  //     let count = "";

  //     if (dir === CUBE_DIR.LR) {
  //       count = keyCount === 0 ? keyCount + 3 : keyCount - 1;
  //     } else {
  //       count = keyCount === 3 ? 0 : keyCount + 1;
  //     }

  //     for (let i = 0; i < obj[key].length; i++) {
  //       movingLineArray[key][obj[key][i]] = copyMovingLineArray[count][obj[count][i]];
  //     }
  //   }

  //   rotateFaceOfCube(initCubeArray[face], rotatePosition(dir));
  // }

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

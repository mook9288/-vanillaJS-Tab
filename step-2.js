(function () {
  let initCubeArray = ["R", "R", "W", "G", "C", "W", "G", "B", "B"];
  const cube = document.querySelector(".cube");
  const inpCode = document.querySelector(".inp-code");
  const resultButton = document.querySelector(".btn-result");

  const CUBE_CODE = {
    U: "U",
    U_OPP: "U'",
    R: "R",
    R_OPP: "R'",
    L: "L",
    L_OPP: "L'",
    B: "B",
    B_OPP: "B'",
    Q: "Q",
  }

  fillCubeCell();
  resultButton.addEventListener("click", handleClickEvent);

  function fillCubeCell() {
    cube.innerHTML = '';
    for (let i = 0; i < initCubeArray.length; i++) {
      cube.innerHTML += `<span>${initCubeArray[i]}</span>`;
    }
  }

  // const
  // > U  가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
  // > U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR RWR WRR
  // > R  가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
  // > R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
  // > L  가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG (L의 경우 R과 방향이 반대임을 주의한다.)
  // > L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
  // > B  가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB (B의 경우도 U와 방향이 반대임을 주의한다.)
  // > B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
  // > Q  Bye~를 출력하고 프로그램을 종료한다.
  function handleClickEvent() {
    if (!inpCode.value) {
      return alert("CUBE 동작 코드를 입력하세요.");
    }

    const inpCodeArray = inpCode.value.toUpperCase().split('');

    inpCodeArray.forEach(function (item, index, arr) {
      if (item === "'") {
        arr[index - 1] += "'";
        arr.splice(index, 1);
      }
    });

    for (let i = 0; i < inpCodeArray.length; i++) {
      setTimeout(() => {
        const element = inpCodeArray[i];

        if (element === CUBE_CODE.U) {
          console.log("U  가장 윗줄을 왼쪽으로 한 칸 밀기");
          moveCube(CUBE_CODE.U);
        // } else if (element === CUBE_CODE.U_OPP) {
        //   console.log("U' 가장 윗줄을 오른쪽으로 한 칸 밀기", );
        // } else if (element === CUBE_CODE.R) {
        //   console.log("R  가장 오른쪽 줄을 위로 한 칸 밀기");
        //   moveCube(CUBE_CODE.R);
        // } else if (element === CUBE_CODE.R_OPP) {
        //   console.log("R' 가장 오른쪽 줄을 아래로 한 칸 밀기");
        //   moveCube(CUBE_CODE.R_OPP);
        // } else if (element === CUBE_CODE.L) {
        //   console.log("L  가장 왼쪽 줄을 아래로 한 칸 밀기");
        //   moveCube(CUBE_CODE.L);
        // } else if (element === CUBE_CODE.L_OPP) {
        //   console.log("L' 가장 왼쪽 줄을 위로 한 칸 밀기");
        //   moveCube(CUBE_CODE.L_OPP);
        // } else if (element === CUBE_CODE.B) {
        //   console.log("B  가장 아랫줄을 오른쪽으로 한 칸 밀기");
        //   moveCube(CUBE_CODE.B);
        // } else if (element === CUBE_CODE.B_OPP) {
        //   console.log("B' 가장 아랫줄을 왼쪽으로 한 칸 밀기");
        //   moveCube(CUBE_CODE.B_OPP);
        // } else if (element === CUBE_CODE.Q) {
        //   console.log("Q  Bye~를 출력하고 프로그램을 종료한다.");
        //   moveCube(CUBE_CODE.Q);
        }
        return fillCubeCell();
      }, 1000 * i);
    }
  }

  function moveCube(move) {
    const lines = {
      "U": [0, 1, 2],
    }
    const [a, b, c] = lines[move];
    const resultMove = initCubeArray.shift();

    initCubeArray.splice(c, 0, resultMove);

    return fillCubeCell();
  }
})();

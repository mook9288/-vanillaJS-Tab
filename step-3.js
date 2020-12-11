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

  fillCubeCell();

  function fillCubeCell() {
    cubes.innerHTML = "";

    for (let i = 0; i < initCubeArray.length; i++) {
      for (let j = 0; j < initCubeArray[i].length; j++) {
        cubes[i].innerHTML += `<span class="color-${i}">${initCubeArray[i][j]}</span>`;
      }
    }
  }
})();

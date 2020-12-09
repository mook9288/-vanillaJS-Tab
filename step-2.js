(function () {
  const initCubeArray = ["R", "R", "W", "G", "C", "W", "G", "B", "B"];
  const cube = document.querySelector(".cube");

  for (let i = 0; i < initCubeArray.length; i++) {
    cube.innerHTML += `<span>${initCubeArray[i]}</span>`;
  }
})();

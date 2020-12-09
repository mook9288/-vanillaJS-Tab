(function () {
  const resultButton = document.querySelector(".btn-result");
  const resultText = document.querySelector(".text-result");
  const inputWord = document.querySelector(".inp-word");
  const inputNumber = document.querySelector(".inp-number");
  const inputDirection = document.querySelector(".inp-direction");

  resultButton.addEventListener("click", handleClickEvent);

  function handleClickEvent() {
    if (!inputWord.value) {
      return alert("단어를 입력하세요.");
    }

    if (!inputNumber.value) {
      return alert("숫자를 입력하세요.");
    }

    if (!inputDirection.value) {
      return alert("방향을 입력하세요.");
    }

    return resultText.textContent = inputWord.value;
  }
})();

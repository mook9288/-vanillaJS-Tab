(function () {
  const resultButton = document.querySelector(".btn-result");
  const resultText = document.querySelector(".text-result");
  const inputWord = document.querySelector(".inp-word");
  const inputNumber = document.querySelector(".inp-number");
  const inputDirection = document.querySelector(".inp-direction");
  const allInput =  document.querySelectorAll("input");

  resultButton.addEventListener("click", handleClickEvent);

  [...allInput].forEach(function (item, index) {
    item.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        resultButton.click();
      }
    });
  });

  function handleClickEvent() {
    const wordSplit = inputWord.value;
    const movement = +inputNumber.value % wordSplit.length;
    const directionLeft = inputDirection.value === "L" || inputDirection.value === "l";
    let wordResult = "";

    if (!inputWord.value) {
      alert("단어를 입력하세요.");
      return inputWord.focus();
    }

    if (!inputNumber.value) {
      alert("숫자를 입력하세요.");
      return inputNumber.focus();
    } else if (-100 > inputNumber.value || 100 <= inputNumber.value) {
      alert("-100 <= N < 100\n-100과 100 사이의 정수를 입력하세요.");
      return inputNumber.value = '';
    }

    if (!inputDirection.value) {
      alert("방향을 입력하세요.");
      return inputDirection.focus();
    } else if (inputDirection.value.replace(/[LRlr]/, "")) {
      alert("방향을 나타내는 L, R 의 대소문자만 입력 가능합니다.\n왼쪽으로 밀어낼 경우, L 또는 l\n오른쪽으로 밀어낼 경우, R 또는 r");
      inputDirection.value = '';
      return inputDirection.focus();
    }

    if (directionLeft) {
      wordResult = wordSplit.slice(movement) + wordSplit.slice(0, movement);
    } else {
      wordResult = wordSplit.slice(-movement) + wordSplit.slice(0, -movement);
    }

    return resultText.textContent = wordResult;
  }
})();

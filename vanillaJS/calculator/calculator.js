const result = document.querySelector(".cal__result");
const button = document.querySelectorAll(".cal__btn");
const btnNumber = document.querySelectorAll(".number");
const btnOperation = document.querySelectorAll(".operation");
const btnReset = document.querySelector(".reset");
const btnCancle = document.querySelector(".cancle");
const btnEquals = document.querySelector(".equals");

[...button].forEach((element) => {
  element.dataset.btnValue = element.innerText;
});

[...btnNumber].forEach((element) => {
  element.addEventListener("click", (e) => {
    result.value += element.dataset.btnValue;
  });
});

[...btnOperation].forEach((element) => {
  element.addEventListener("click", (e) => {
    if(!result.value) {
      result.value = '';
    } else if (!/[+-/*]$/.test(result.value)) {
      result.value += element.dataset.btnValue;
    } else {
      result.value = result.value.replace(/[+-/*]$/, element.dataset.btnValue);
    }
  });
});

btnReset.addEventListener("click", () => {
  result.value = '';
});

btnCancle.addEventListener("click", () => {
  result.value = result.value.slice(0, -1);
});

let timer = '';
btnEquals.addEventListener("click", () => {
  if (!/[+-/*]$/.test(result.value)) {
    return result.value = eval(result.value);
  } else {
    if (!document.querySelector(".calculator--alert")) {
      return reportIncomplete();
    }
  }
});

const reportIncomplete = function() {
  const layout = '<div class="calculator--alert">완성되지 않은 수식입니다.</div>';
  document.querySelector(".calculator").insertAdjacentHTML("beforeend", layout);
  timer = setInterval(() => {
    clearInterval(timer);
    document.querySelector(".calculator--alert").remove();
  }, 3000);
}

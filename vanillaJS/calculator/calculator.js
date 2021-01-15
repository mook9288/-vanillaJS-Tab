const result = document.querySelector(".cal__result");
const button = document.querySelectorAll(".cal__btn");
const btnNumber = document.querySelectorAll(".number");
const btnOperation = document.querySelectorAll(".operation");
const btnReset = document.querySelector(".reset");
const btnCancle = document.querySelector(".cancle");

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
    if (!/[+-/*]$/.test(result.value)) {
      result.value += element.dataset.btnValue;
    } else {
      result.value = result.value.replace(/[+-/*]$/, element.dataset.btnValue);
    }
  });
});

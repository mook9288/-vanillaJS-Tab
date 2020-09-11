
var number = 3;
var count = 0;
var strike = 0;
var ball = 0;
var randomArray = [];
var valueArray = [];

var gameButton = document.querySelector(".game-start-button button");
var input = document.querySelector(".input-number");
var scoreTable = document.querySelector(".score tbody");

// Start & Restart 버튼 작동
gameButton.addEventListener("click", function (e) {
  randomArray = [];
  count = 0;
  for (var randomIndex = 0; randomIndex < number; randomIndex++) {
    randomArray[randomIndex] = Math.floor(Math.random() * 10);
    for (var overlap = 0; overlap < randomIndex; overlap++) {
      if (randomArray[randomIndex] === randomArray[overlap]) {
        randomIndex--;
        break;
      }
    }
  }
  gameButton.innerHTML = "Game Restart";
  input.value = null;
  input.removeAttribute("disabled");
  scoreTable.innerHTML = null;
});

// Input 입력값 제한 및 Enter키 눌렀을 때
function enterKeyDown() {
  ball = 0;
  strike = 0;
  if(event.keyCode === 13) {
    if (input.value.length === number) {
      count++;

      // 입력값 배열로 받기
      for (var valueArrayIndex = 0; valueArrayIndex < input.value.length; valueArrayIndex++) {
        valueArray[valueArrayIndex] = input.value[valueArrayIndex];
      }

      // 생성된 값과 입력한 값 대응 비교..
      for (var startIndex = 0; startIndex < number; startIndex++) {
        for (var enterIndex = 0; enterIndex < number; enterIndex++) {
          if (randomArray[startIndex] == valueArray[enterIndex]) {
            if (startIndex === enterIndex) {
              strike++;
            } else {
              ball++;
            }
            break;
          }
        }
      }

      scoreTable.innerHTML += `<tr><td>${count}</td><td>${valueArray}</td><td>${strike}S ${ball}B</td></tr>`;

      // 3자리 모두 맞을 때
      if (strike === 3) {
        alert(count + "번째 시도만에 정답 " + randomArray);
        reset(count);
      }

      // 아웃 카운트 처리
      if (count >= 10) {
        alert("Game Over \n정답은 " + randomArray);
        reset(count);
      }
    } else {
      alert("숫자 3자리만 입력하세요.");
    }
    input.value = null;
  } else if ((event.keyCode < 48) || (event.keyCode > 57)) {
    alert("숫자만 입력 가능합니다.");
    event.returnValue = false;
  }
}

// 중복되는 reset
function reset(count) {
  count = 0;
  randomArray = [];
  gameButton.innerHTML = "Game Start!!!";
  input.value = null;
  input.setAttribute("disabled", true);
  scoreTable.innerHTML = null;
}

var number = 3;
var count = 0;
var strike = 0;
var ball = 0;
var randomArray = [];
var gameButton = document.querySelector(".btn-start");
var replayButton = document.querySelector(".game-start-button button");
var sendButton = document.querySelector(".btn-send");
var input = document.querySelector(".input-number");
var scoreTable = document.querySelector(".score tbody");

function enterNumberOnly() {
  if ((event.keyCode < 48) || (event.keyCode > 57)) {
    alert("숫자만 입력 가능합니다.");
    event.returnValue = false;
  }
}

gameButton.addEventListener("click", function (e) {
  randomArray = [];
  count = 0;
  for (var randomIndex = 0; randomIndex < number; randomIndex++) {
    randomArray[randomIndex] = Math.floor(Math.random() * 10);

    // 중복 숫자 처리
    for (var overlap = 0; overlap < randomIndex; overlap++) {
      if (randomArray[randomIndex] === randomArray[overlap]) {
        randomIndex--;
        break;
      }
    }
  }
  gameButton.setAttribute("class", "btn-replay");
  gameButton.innerHTML="Game Replay";
  input.value = '';
  input.removeAttribute("disabled");
  sendButton.removeAttribute("disabled");
  scoreTable.innerHTML = '';
  console.log(randomArray);
});


document.querySelector(".btn-send").addEventListener("click", function (e) {
  var inputValue = input.value;
  var valueArray = [];

  ball = 0;
  strike = 0;

  if (input.value.length === number) {
    count++;

    for (var valueArrayIndex = 0; valueArrayIndex < input.value.length; valueArrayIndex++) {
      valueArray.push(parseInt(input.value[valueArrayIndex]));
    }

    for (var i = 0; i < number; i++) {
      for (var j = 0; j < number; j++) {
        if (randomArray[i] == valueArray[j]) {
          if (i === j) {
            strike++;
          } else {
            ball++;
          }
          break;
        }
      }
    }

    scoreTable.innerHTML += `<tr><td>${count}</td><td>${valueArray}</td><td>${strike}S ${ball}B</td></tr>`
  } else {
    alert("숫자 3자리만 입력하세요.");
    input.value = '';
  }

  // 3자리 모두 맞을 때
  if (strike === 3) {
    reset(count);
  }

  // 아웃 카운트 처리
  if (count >= 9) {
    reset(count);
  }

  console.log(randomArray, valueArray, strike, ball);
});


function reset(count) {
  if (count >= 9) {
    alert("Game Over \n정답은 " + randomArray);

  } else {
    alert(count + '번째 시도만에 정답');
  }
  count = 0;
  input.value='';
  input.removeAttribute("disabled");
  randomArray = [];
  gameButton.setAttribute("class", "btn-start");
  gameButton.innerHTML="Game Start!!!";
  input.setAttribute("disabled", true);
  sendButton.setAttribute("disabled", true);
  scoreTable.innerHTML = '';
}
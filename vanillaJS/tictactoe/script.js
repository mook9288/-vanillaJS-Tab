var playButton = document.querySelector('.button--play');
var cellList = document.querySelectorAll('.board__cell');
var turn = document.querySelector('.turn');
var turnPlayerHtml = `Player <span class="turn__player">O</span> Turn`;
var play = false;
var count = 0;
var oScore = 0;
var xScore = 0;
var PLAYER = {
  X: 'X',
  O: 'O',
};
var cellArray = [null, null, null, null, null, null, null, null, null];

if (playButton !== null) {
  playButton.addEventListener('click', handlePlayButton);
}

function whoIsWinner(cell) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
      return cell[a];
    }
  }

  return null;
}

function handlePlayButton() {
  turn.innerHTML = turnPlayerHtml;
  playButton.textContent = 'Game Restart';
  if (play) {
    resetGame();
  } else {
    play = true;
    clickCell();
  }
}

function clickCell() {
  cellList.forEach((el, i) => {
    el.addEventListener('click', function () {
      var isExistClassO = el.classList.contains('board__cell--o');
      var isExistClassX = el.classList.contains('board__cell--x');
      var isPossibleToFill = !(isExistClassO || isExistClassX);

      if (isPossibleToFill) {
        count++;

        // TODO: O/X 플레이어 구분 다른 방법 생각해보기
        if (count % 2 === 0) {
          el.classList.add('board__cell--x');
          pushArray(i, count, PLAYER.X);
        } else {
          el.classList.add('board__cell--o');
          pushArray(i, count, PLAYER.O);
        }
      }
    });
  });
}

function pushArray(idx, count, player) {
  console.log(idx, count, player);
  var turnPlayer = document.querySelector('.turn__player');
  turnPlayer.textContent = player;
  cellArray[idx] = player;

  var winner = whoIsWinner(cellArray);
  if (winner !== null) {
    showModal(`The winner is Player "${winner}".`);
    hideModal(winner);
  } else {
    if (count >= 9) {
      showModal('The game is over. <br/>Do you want to restart <br/>the game?');
      hideModal(winner);
    }
  }
}

function gameWinner(winner) {
  play = false;
  console.log(winner);

  if (winner === PLAYER.X) {
    document.querySelector('.score__item--x span').textContent = ++xScore;
  } else if (winner === PLAYER.O) {
    document.querySelector('.score__item--o span').textContent = ++oScore;
  } else {
    return;
  }
}

function resetGame() {
  var turnPlayer = document.querySelector('.turn__player');
  play = false;
  count = 0;
  turnPlayer.textContent = 'O';
  cellList.forEach((el) =>
    el.classList.remove('board__cell--o', 'board__cell--x')
  );
  cellArray.fill(null);
}

// TODO: modal 수정필요
function showModal(message) {
  var layout = `
      <div class="modal">
        <div class="modal__contents">
          <p>${message}</p>
          <button class="button button--replay">Re-start the game</button>
        </div>
      </div>
    `;
  document.body.insertAdjacentHTML('beforeend', layout);
}

function hideModal(winner) {
  document
    .querySelector('.button--replay')
    .addEventListener('click', function () {
      document.querySelector('.modal').remove();
      gameWinner(winner);
      resetGame();
    });
}

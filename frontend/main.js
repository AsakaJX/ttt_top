import { Game, Player } from '../backend/game.js';

const boardSize = 3;
const game = new Game(
  new Player('player 1', 'x'),
  new Player('player 2', 'o'),
  boardSize
);

// Player name

const player1Name = document.querySelector('#player-1-name');
const player2Name = document.querySelector('#player-2-name');

// Default player names
player1Name.value = 'player 1';
player2Name.value = 'player 2';

player1Name.addEventListener('input', (event) => {
  game.playersInstance.playersArray[0].name = event.target.value;
});

player2Name.addEventListener('input', (event) => {
  game.playersInstance.playersArray[1].name = event.target.value;
});

// Drawing cells

const gameboard = document.querySelector('#gameboard');
let gameboardTemplateString = '';
game.boardInstance.board.map(() => {
  gameboardTemplateString += '1fr ';
});
document.styleSheets[1].insertRule(
  `#gameboard { grid-template: ${gameboardTemplateString} / ${gameboardTemplateString}; }`
);

reDrawBoard();

function reDrawBoard() {
  document.querySelectorAll('.gameboard-cell').forEach((item) => item.remove());

  let lineCounter = 0;
  for (const line of game.boardInstance.board) {
    let cellCounter = 0;
    for (const item of line) {
      const cell = document.createElement('div');
      cell.textContent = item;
      cell.setAttribute('class', 'gameboard-cell');
      cell.setAttribute('id', `${lineCounter}-${cellCounter}`);
      // cell.addEventListener('click', handleCellClick);
      if (item !== null) {
        cell.setAttribute('class', cell.getAttribute('class') + ' marked');
      }
      const cellGhostInput = document.createElement('span');
      cellGhostInput.textContent =
        game.playersInstance.playersArray[game.currentPlayerIndex].mark;
      cell.appendChild(cellGhostInput);
      gameboard.appendChild(cell);
      cellCounter++;
    }
    lineCounter++;
  }
}

gameboard.addEventListener('click', handleCellClick);

function updateGameResult(text) {
  const result = document.querySelector('#game-result');
  result.textContent = text;
}

function handleCellClick(event) {
  let target = event.target;
  if (String(target.tagName).toLowerCase() === 'span') {
    target = target.parentNode;
  }

  const [lineNumber, cellNumber] = target.getAttribute('id').split('-');

  const makeMoveResult = game.makeMove(lineNumber, cellNumber);
  reDrawBoard();

  if (game.winner !== null && makeMoveResult !== null) {
    const currentWinnerId = game.currentPlayerIndex + 1;
    const playerCounterPlaceholder = document.querySelector(
      `#player-${currentWinnerId}-score`
    );

    playerCounterPlaceholder.textContent =
      Number(playerCounterPlaceholder.textContent) + 1;

    updateGameResult(
      `Player [${game.playersInstance.playersArray[game.currentPlayerIndex].name}] won!`
    );
  }
}

// Controls

const clearBtn = document.querySelector('#gameboard-controls-clear');
clearBtn.addEventListener('click', handleGameboardClear);

function handleGameboardClear(event) {
  game.boardInstance.initialize();
  game.initialize();
  reDrawBoard();
  updateGameResult('You can start placing markers!');
}

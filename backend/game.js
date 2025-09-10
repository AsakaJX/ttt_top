function Gameboard(size = 3) {
  let line = [];
  for (let i = 0; i < size; i++) {
    // line.push(i);
    line.push(null);
  }

  this.board = [];
  for (let i = 0; i < size; i++) {
    // line = line.map((x) => x + i);
    this.board.push([...line]);
  }

  this.getVertical = function (column) {
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(this.board[i][column]);
    }
    return result;
  };

  this.getDiagonalLeft = function () {
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(this.board[i][i]);
    }
    return result;
  };

  this.getDiagonalRight = function () {
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(this.board[i][this.board[i].length - 1 - i]);
    }
    return result;
  };

  this.placeMarker = function (line, position, mark) {
    this.board[line][position] = mark;
  };
}

export function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}

function Players(player1, player2) {
  this.playersArray = [player1, player2];
}

export const game = function (player1, player2) {
  // Assigned here for testing purposes
  const _boardInstance = new Gameboard();
  const _playersInstance = new Players(player1, player2);

  // 0 - first player
  let currentPlayer = 0;
  let winner = null;
  let roundCounter = 0;

  function isWinningPosition() {
    for (let i = 0; i < _boardInstance.board.length; i++) {
      if (
        _boardInstance
          .getVertical(i)
          .every(
            (mark) => mark === _playersInstance.playersArray[currentPlayer].mark
          ) ||
        _boardInstance.board[i].every(
          (x) => x === _playersInstance.playersArray[currentPlayer].mark
        )
      ) {
        return true;
      }
    }

    if (
      _boardInstance
        .getDiagonalLeft()
        .every(
          (mark) => mark === _playersInstance.playersArray[currentPlayer].mark
        ) ||
      _boardInstance
        .getDiagonalRight()
        .every(
          (mark) => mark === _playersInstance.playersArray[currentPlayer].mark
        )
    ) {
      return true;
    }

    return false;
  }

  const makeMove = function (line, position) {
    if (winner !== null) {
      console.log(`Player ${winner.name} has already won!`);
      return null;
    }

    if (
      _boardInstance.board[line][position] ===
        _playersInstance.playersArray[+Boolean(currentPlayer)].mark ||
      _boardInstance.board[line][position] ===
        _playersInstance.playersArray[+!Boolean(currentPlayer)].mark
    ) {
      console.log(`can't place marker here`);
      return null;
    }

    _boardInstance.placeMarker(
      line,
      position,
      _playersInstance.playersArray[currentPlayer].mark
    );

    console.log(this._boardInstance.board);

    if (isWinningPosition()) {
      winner = _playersInstance.playersArray[currentPlayer];

      console.log(`Player ${winner.name} wins!`);
    }

    currentPlayer = +!Boolean(currentPlayer);
    roundCounter += 1;
  };

  return {
    _boardInstance,
    _playersInstance,
    currentPlayer,
    winner,
    roundCounter,
    makeMove,
  };
};

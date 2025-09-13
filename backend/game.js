const DEBUG = true;

if (!DEBUG) {
  console.log = function () {};
}

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

export function Game(player1, player2, gameBoardSize = 3) {
  const MIN_GAMEBOARD_SIZE = 3;
  const MAX_GAMEBOARD_SIZE = 7;

  // GameboardSize safe-guards
  if (gameBoardSize < MIN_GAMEBOARD_SIZE) {
    gameBoardSize = MIN_GAMEBOARD_SIZE;
  }

  if (gameBoardSize > MAX_GAMEBOARD_SIZE) {
    gameBoardSize = MAX_GAMEBOARD_SIZE;
  }

  // Assigned here for testing purposes
  this.boardInstance = new Gameboard(gameBoardSize);
  this.playersInstance = new Players(player1, player2);

  // 0 - first player
  this.currentPlayerIndex = 0;
  this.winner = null;
  this.roundCounter = 0;

  this.isWinningPosition = function () {
    for (let i = 0; i < this.boardInstance.board.length; i++) {
      if (
        this.boardInstance
          .getVertical(i)
          .every(
            (mark) =>
              mark ===
              this.playersInstance.playersArray[this.currentPlayerIndex].mark
          ) ||
        this.boardInstance.board[i].every(
          (x) =>
            x ===
            this.playersInstance.playersArray[this.currentPlayerIndex].mark
        )
      ) {
        return true;
      }
    }

    if (
      this.boardInstance
        .getDiagonalLeft()
        .every(
          (mark) =>
            mark ===
            this.playersInstance.playersArray[this.currentPlayerIndex].mark
        ) ||
      this.boardInstance
        .getDiagonalRight()
        .every(
          (mark) =>
            mark ===
            this.playersInstance.playersArray[this.currentPlayerIndex].mark
        )
    ) {
      return true;
    }

    return false;
  };

  this.makeMove = function (line, position) {
    if (this.winner !== null) {
      console.log(`Player ${this.winner.name} has already won!`);
      return null;
    }

    if (
      this.boardInstance.board[line][position] ===
        this.playersInstance.playersArray[+Boolean(this.currentPlayerIndex)]
          .mark ||
      this.boardInstance.board[line][position] ===
        this.playersInstance.playersArray[+!Boolean(this.currentPlayerIndex)]
          .mark
    ) {
      console.log(`can't place marker here`);
      return null;
    }

    this.boardInstance.placeMarker(
      line,
      position,
      this.playersInstance.playersArray[this.currentPlayerIndex].mark
    );

    // console.log(this);
    // console.log(_boardInstance.board);

    this.roundCounter += 1;
    if (this.isWinningPosition()) {
      this.winner = this.playersInstance.playersArray[this.currentPlayerIndex];

      console.log(`Player ${this.winner.name} wins!`);
      return;
    }
    this.currentPlayerIndex = +!Boolean(this.currentPlayerIndex);
  };
}

import { game as gameSingleton, Player } from '../backend/game.js';

let boardSize = 3;
const game = gameSingleton(
  new Player('asaka', 'x'),
  new Player('random', 'o'),
  boardSize
);

// test game
game.makeMove(0, 0);
game.makeMove(1, 0);
game.makeMove(1, 1);
game.makeMove(2, 0);
game.makeMove(2, 2);
game.makeMove(1, 2);

import { game as gameSingleton, Player } from '../backend/game.js';

const game = gameSingleton(new Player('asaka', 'x'), new Player('random', 'o'));

// test game
game.makeMove(0, 0);
game.makeMove(1, 0);
game.makeMove(1, 1);
game.makeMove(2, 0);
game.makeMove(2, 2);
game.makeMove(1, 2);

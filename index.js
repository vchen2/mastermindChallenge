const masterStart = require('./mastermind');

masterStart.startGame();
var condition = masterStart.move();
while (!condition){
	condition = masterStart.move();
}
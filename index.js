const masterStart = require('./mastermind');

// to run the game, 'node index.js'
async function start() {
	masterStart.startGame();
	var condition = await masterStart.move();
	while (!condition){
		condition = await masterStart.move();
	}
}

start();

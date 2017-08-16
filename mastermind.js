var prompt = require('prompt');


const codeValues = [1,2,3,4,5,6];
const movesCache = {}; //[guess]: [red, red]
var newcode = [];
const gameOver = false;



function startGame() {
	newcode = generateCode();

	console.log("Weclome to Mastermind! Here are the rules");
	console.log("You will be shown your previous guesses and the clues to those guesses");
	console.log("Clues take on the form: ");
	console.log("RED - one of your guesses is the correct number, and in the right position");
	console.log("WHITE - one of your guesses is the correct number, but in the wrong position");
	console.log("BLUE - one of  your guesses is not the right color");

	console.log("You win once you get all four RED clues!");

}

function move() {
	var result = prompt.get('Please input a guess of this form: 1234 (numbers from 1 to 6)');
     //request input
	var clues = processMove(result);
	if(clues == '') {
		console.log("Please do not enter invalid numbers");
	}else{
		if(clues == 'YOU WON!'){
			return true;
			console.log("congratulations! you won!")
		}else{
			console.log(result, " | | ", clues);
		}
	}
	console.log("Your previous guesses");
	const guesses = processCache(movesCache);
	return false;
	//process result
	 
}

function quickCheck(result) {
	var redCount = 0;
	for (var i = 0; i < 4; i++){
		const numguess = parseInt((result + '').charAt(i));
		if (numguess == newcode[i]){
			redCount = redCount + 1;
		}
	}
	if (redCount == 4){
		return true;
	}
	return false;
}

function generateCode() {
	const code = [];
	for(var i = 0; i<3; i++){
		var singleCode = codeValues[Math.floor(Math.random()*codeValues.length)];
		code.push(singleCode);
	}

	return code;
}

function processMove(move) {
	//see if they are red
	const toConsider = newcode;
	const clues = [];
	const redCount = 0; 
	for (var i = 0; i < 4; i++){
		const numguess = parseInt((move + '').charAt(i));
		if (numguess > 7 || numguess < 1){
			return [];
		}
		if (numguess == newcode[i]){
			clues.push("RED");
			toConsider[i] = 0;
			move[i] = 0;
			redCount = redCount + 1;
		}
	}

	if (redCount == 4){
		return "YOU WON!";
	}

	for (var i = 0; i<4; i++) {
		const numguess = parseInt((move + '').charAt(i));
		if (numguess > 7 || numguess < 1){
			return '';
		}
		if(numguess != 0){
			var index = toConsider.indexOf(numguess);
			if(index == -1){
				clues.push("BLUE");
			}else{
				move[i] = 0;
				toConsider[index] = 0;
				clues.push("WHITE");
			}
		}
	}
	var finalClues = "";
	for (clue in clues){
		finalClues = finalClues + " " + clue;
	}
	return finalClues;
}

function processCache(){
	for (var key in movesCache){
		console.log(key + " | | " + movesCache[key]);
	}
}

module.exports = {startGame, move};
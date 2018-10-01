var prompt = require('prompt-async');
const _ = require('lodash');

const codeValues = [1,2,3,4,5,6];
const movesCache = {}; //[guess]: [red, red]
var newcode = [];
const gameOver = false;

function startGame() {
	newcode = generateCode();

	console.log("Welcome to Mastermind! Here are the rules");
	console.log("You will be shown your previous guesses and the clues to those guesses");
	console.log("Clues take on the form: ");
	console.log("RED - this guess is the correct number and in the right position");
	console.log("WHITE - this guess is the correct number but in the wrong position");
	console.log("BLUE - this guess is not the right number");

	console.log("You win once you get all four RED clues!");
	
}

async function getResponse() {
	prompt.start();
	console.log('Please input a guess of this form: 1234 (numbers from 1 to 6)');
	const guess = await prompt.get(['guess']);
	return guess.guess
}

async function move() {
	const result = await getResponse();
	//request input
	const moveArray = _.map(result, (num) => parseInt(num));
	var clues = processMove(moveArray);
	if(clues === '') {
		console.log("Please do not enter invalid numbers");
	}else{
		if(clues == "YOU WON!"){
			console.log("congratulations! you won!");
			return true;	
		}else{
			console.log(result, " | | ", clues);
		}
	}
	console.log("Your previous guesses");
	const guesses = processCache(movesCache);
	return false;
	//process result
	 
}

function generateCode() {
	const code = [];
	for(var i = 0; i < 4; i++){
		var singleCode = codeValues[Math.floor(Math.random()*codeValues.length)];
		code.push(singleCode);
	}

	return code;
}

function processMove(move) {
	//see if they are red
	if (!move) {
		return "INVALID";
	}
	const toConsider = _.clone(newcode);
	console.log(newcode);
	const clues = ["BLUE", "BLUE", "BLUE", "BLUE"];
	let redCount = 0; 
	for (var i = 0; i < 4; i++){
		const guessIfRed = move[i];
		if (guessIfRed > 7 || guessIfRed < 1){
			return 'INVALID';
		}
		if (guessIfRed == newcode[i]){
			
			clues[i] = "RED";
			toConsider[i] = 0;
			
			move[i] = 0;
			redCount = redCount + 1;
		}
	}
	if (redCount == 4){
		return "YOU WON!";
	}
	for (var i = 0; i < 4; i++) {
		const numguess = move[i];
		if (numguess > 7 || numguess < 0){
			return 'INVALID';
		}
		if(numguess !== 0){
			var index = toConsider.indexOf(numguess);
			if(index == -1){
				clues[i]= "BLUE";
			}else{
				move[i] = 0;
				toConsider[index] = 0;
				clues[i] = "WHITE";
			}
		}
	}
	var finalClues = "";
	for (var clue in clues){
		finalClues = finalClues + " " + clues[clue];
	}
	return finalClues;
}

function processCache(){
	for (var key in movesCache){
		console.log(key + " | | " + movesCache[key]);
	}
}

module.exports = {startGame, move};
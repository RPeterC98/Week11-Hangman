var prompt = require('prompt');
var clear = require('clear');
var Word = require('./word.js');
var gameFile = require('./game.js');

prompt.start();

game = {

	wordsWon : 0,
	guessesRemaining : 10, //per word
	currentWrd : null, //the word object
	startGame : function (wrd){
		//make sure the user has 10 guesses
		this.resetGuessesRemaining();
		this.lettersAlreadyGuessed = "";
		//get a random word from the array
		this.currentWrd = new Word.Word(gameFile.wordsForGames.wordBank[Math.floor(Math.random()* gameFile.wordsForGames.wordBank.length)].toUpperCase());
	//
		this.currentWrd.populateLetterObjectArray(); //populate currentWrd (made from Word constructor function) object with letters

		this.keepPromptingUser();

	},
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
			clear();
			var promptInputEntered = result.guessLetter.toUpperCase();
			//trap for repeat letters ad more then one character entered
			if (result.guessLetter.length>1 || self.lettersAlreadyGuessed.includes(promptInputEntered) || /[^A-Z]/.test(promptInputEntered)) {
				console.log('\nUSER ERROR!!!\n');
				console.log('Please enter one letter only and only a letter that has not been used already');
				console.log('The letter or space you guessed is: ' + promptInputEntered);
				console.log('Letters already guessed are '+self.lettersAlreadyGuessed);
			    console.log('\n\nGuesses remaining: ', self.guessesRemaining);
		    	console.log(self.currentWrd.wordRender());
		    	console.log('here are the letters you guessed already: ');
		    	console.log(self.lettersAlreadyGuessed);
				self.keepPromptingUser();
			}
			else{

		    // result is an object like this: { guessLetter: 'f' }
		    console.log('The letter or space you guessed is: ' + promptInputEntered);

		    self.lettersAlreadyGuessed += promptInputEntered;
		    //this checks if the letter was found and if it is then it sets that specific letter in the word to be found
		    var howManyLettersInWordMatched = self.currentWrd.checkIfLetterFound(promptInputEntered);

		    //if the user guessed incorrectly minus the number of guesses they have left
		    if (howManyLettersInWordMatched == 0){
		    	console.log('You guessed wrong!');
		    	self.guessesRemaining--;
		    }
		    else{
		    	console.log('You guessed right!');

		    	//check if you win only when you are right
	    		if(self.currentWrd.didWeFindTheWord()){
	    			console.log(self.currentWrd.wordRender());
			    	console.log('You Won!!!');
			    	return; //end game
			    }
		    }

		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
		    console.log('here are the letters you guessed already: ');
		    console.log(self.lettersAlreadyGuessed);

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	clear();
		    	console.log('GAME OVER THE WORD WAS', self.currentWrd.word);
		    	console.log('Try again by typing in node main.js');
		    }
		    else{
		    	console.log(self.currentWrd.wordRender());
		    }
		}
		});

	}


};

game.startGame();
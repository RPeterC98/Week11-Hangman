var letter = require('./letter.js');
//import Letter above with requiring the letter.js file

var Word = function(wordForThisGamePassedIntoFunction){

	//set a property called word and set it equal to what you think it should be
	this.word = wordForThisGamePassedIntoFunction;

	//set a property called letterObjectArray to an empty array. We will eventually push letter objects in here
	//mlh make an empty array named letterObjectArray that will get set to the leters from wrd that was split above
	this.letterObjectArray = [];

	//set a property called found to false
	//mlh initalize to false and get set to true in function below
	this.found = false;

	//make a property called populateLetterObjectArray, set it to a function and inside the function loop over the word property and
        //push letter objects into the letterObjectArray property.
	this.populateLetterObjectArray = function(){
		for (var i = 0; i <this.word.length; i++) {
			this.letterObjectArray.push(new letter.Letter(this.word[i].toUpperCase()));
		}
	}
	//returns ture or false whether we found the current word or not
	this.didWeFindTheWord = function() {
		var returnCounter = 0;
		//set the found property to true or false based on whether all the letters have been found or not
		for (var i = 0; i < this.letterObjectArray.length; i++) {
			if(this.letterObjectArray[i].appear !== true){
				return false //this first false mean word not complete and return false
			}
			else if (this.letterObjectArray[i].appear === true){
				returnCounter ++; //this will count up the trues
			}
		}
		if (returnCounter === this.letterObjectArray.length){
			return true; //only return true if all the letters have appear set to true
		}
		else{
			return false; //this should only happen if some of the appear properties are corrupted
		}
	}


	this.checkIfLetterFound = function(guessLetter) {
		console.log('checkIfLetterFound guessLetter = '+guessLetter);
		//set a variable numberofLettersMarchedToReturn to 0
		var numberofLettersMarchedToReturn = 0;

		//loop over the letterObjectArray property and if the letter object's character property equals the guessletter then
            //set the appear property of the letter object to be true. Also increment numberofLettersMarchedToReturn.
        for (var i = 0; i < this.letterObjectArray.length; i++) {
        	if (this.letterObjectArray[i].character.toUpperCase() === guessLetter) {
        		this.letterObjectArray[i].appear = true;
        		numberofLettersMarchedToReturn ++;
        	}
        }

		//return numberofLettersMarchedToReturn
		return numberofLettersMarchedToReturn;
	};

	this.wordRender = function() {
		//make a variable named str and set it to empty quotes
		var str = "";
		//loop over this.letterObjectArray and call the chooseCharacterToDisplay property of the letter object that you're looping over,
			//and add it to str
			for (var i = 0; i < this.letterObjectArray.length; i++) {
				str += this.letterObjectArray[i].chooseCharacterToDisplay();
			}
		//return str
		return str;
	};
};

//export the Word constructor here at the end
exports.Word = Word;

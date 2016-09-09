 function Letter(letterPassedIntoFunction) {
    //make a character property and set it to what you think makes sense
    this.character = letterPassedIntoFunction;

    //make an appear property and set it to what makes sense
    this.appear = false;

    //make a chooseCharacterToDisplay property and set it to a function that does what you think makes sense
    this.chooseCharacterToDisplay = function(){
        if (this.appear === true){
            return this.character;
        }
        else{
            return " _ "
        }
    }
};


//export the Letter constructor here
exports.Letter = Letter;
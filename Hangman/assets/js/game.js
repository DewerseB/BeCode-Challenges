let game;

class Game {
    constructor(secretWord) {
        this.secretWord = secretWord.split('');
        this.guesses = [];
        this.word = this.updateWord();
        this.lifes = 6;
        this.btns = Button.generateBtns(Game.alphabet);
        this.btns.forEach((btn) => btn.addEventListener('click', this.mouseOrKey));
        this.keyboard = document.addEventListener('keypress', this.mouseOrKey);
    }
    static alphabet = 'abcdefghijklmnopqrstuvwxyz';

    mouseOrKey() {
        if (event.key !== undefined) {
            let key = event.key.toLowerCase();
            (key.match(/[a-z]/g) && !game.guesses.includes(key)) && game.submitLetter(key);
        } else {
            game.submitLetter(event.currentTarget.innerHTML);
        }
    }

    submitLetter(letter) {
        this.guesses.push(letter);
        this.btns.forEach((btn) => {
            btn.innerHTML === letter && (btn.disabled = true, btn.removeEventListener('keypress', this.mouseOrKey));
        })
        !this.secretWord.includes(letter) && this.loseLife();
        this.updateWord();
        (JSON.stringify(this.word) === JSON.stringify(this.secretWord) || this.lifes === 0) && this.endGame();
    }

    loseLife() {
        this.lifes--;
        switch(this.lifes) {
            case 5:
                Hangman.drawHead();
                break;
            case 4:
                Hangman.drawBody();
                break;
            case 3:
                Hangman.drawRArm();
                break;
            case 2:
                Hangman.drawLArm();
                break;
            case 1:
                Hangman.drawRLeg();
                break;
            case 0:
                Hangman.drawLLeg();
                break;
        }
    }

    updateWord() {
        if (this.word === undefined) {
            let tempWord = [];
            for (let i = 0; i < this.secretWord.length ; i++) {
                    tempWord[i] = '_';
            }
            //console.log(tempWord.join(' '));
            //UI.drawWord(tempWord.join(' '));
            return tempWord;
        } else {
            for (let i = 0; i < this.secretWord.length ; i++) {
                if (this.guesses.includes(this.secretWord[i])) {
                    this.word[i] = this.secretWord[i];
                } else {
                    this.word[i] = '_';
                }
            }
            UI.drawWord(this.word.join(' '));
        }
    }

    endGame() {
        this.btns.forEach((btn) => (btn.disabled = true, btn.removeEventListener('keypress', this.mouseOrKey)));
        this.keyboard = document.removeEventListener('keypress', this.mouseOrKey);
        this.lifes === 0 ? (UI.drawEnd(false), UI.drawWord(this.secretWord.join(' '))) : UI.drawEnd(true);
    }
}

/**
 * Import the categories from wordslib.js to initialize the dropdown list.
 */
(function initList() {
    let categoriesList = document.getElementById('categoriesList');
    let categories = Object.keys(Words);
    categories.forEach((category) => categoriesList.innerHTML = categoriesList.innerHTML + '<option>' + category + '</option>');
})();


/**
 * (Re)starts a new game when the user click on the button.
 * Chooses a random word from the category selected in the dropdown list
 * and draws the main UI to initialize the game.
 */
document.getElementById('start').addEventListener('click', start);

function start() {
    const category = document.getElementById('categoriesList').value;
    const word = Words.getWord(category);
    game = new Game(word);
    console.log(game.secretWord);
    document.getElementById('start').value = 'Restart';
    UI.drawUI();
    UI.drawWord(game.word.join(' '));
    Hangman.drawGallows();    
}
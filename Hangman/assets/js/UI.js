/**
 * Draws the hangman on the canvasHangman.
 * Each method draws a specific part of the hangman.
 * Uses xPos and yPos as relative coordinates to allow moving the whole drawing.
 */
class Hangman {
    static canvasHangman = document.getElementById('canvasHangman');
    static ctxHangman = canvasHangman.getContext("2d");
    static xPos = 660;
    static yPos = 287;

    static drawGallows() {
        this.ctxHangman.clearRect(0, 0, 900, 507);
        this.ctxHangman.fillRect(this.xPos, this.yPos, 200, 20);
        this.ctxHangman.fillRect(this.xPos+90, this.yPos, 20, -250);
        this.ctxHangman.fillRect(this.xPos+90, this.yPos-250, -150, 20);
        this.ctxHangman.fillRect(this.xPos-55, this.yPos-250, 5, 50);
    }

    static drawHead() {
        this.ctxHangman.lineWidth = 3;
        this.ctxHangman.beginPath();
        this.ctxHangman.arc(this.xPos-52, this.yPos-180, 20, 0, 2*Math.PI);
        this.ctxHangman.closePath();
        this.ctxHangman.stroke();
    }

    static drawBody() {
        this.ctxHangman.fillRect(this.xPos-54, this.yPos-160, 4, 50);
    }

    static drawRArm() {
        this.ctxHangman.beginPath();
        this.ctxHangman.moveTo(this.xPos-52, this.yPos-140);
        this.ctxHangman.lineTo(this.xPos-82, this.yPos-150);
        this.ctxHangman.closePath();
        this.ctxHangman.stroke();
    }

    static drawLArm() {
        this.ctxHangman.beginPath();
        this.ctxHangman.moveTo(this.xPos-52, this.yPos-140);
        this.ctxHangman.lineTo(this.xPos-22, this.yPos-150);
        this.ctxHangman.closePath();
        this.ctxHangman.stroke();
    }

    static drawRLeg() {
        this.ctxHangman.beginPath();
        this.ctxHangman.moveTo(this.xPos-52, this.yPos-110);
        this.ctxHangman.lineTo(this.xPos-72, this.yPos-70);
        this.ctxHangman.closePath();
        this.ctxHangman.stroke();
    }

    static drawLLeg() {
        this.ctxHangman.beginPath();
        this.ctxHangman.moveTo(this.xPos-52, this.yPos-110);
        this.ctxHangman.lineTo(this.xPos-32, this.yPos-70);
        this.ctxHangman.closePath();
        this.ctxHangman.stroke();
    }
}


/**
 * Draws the main UI on the canvasUI.
 */
class UI {
    static canvasUI = document.getElementById('canvasUI');
    static ctxUI = canvasUI.getContext("2d");

    /**
     * Draws the backbone of the UI and displays the instructions.
     */
    static drawUI() {
        this.ctxUI.clearRect(0, 0, 900, 507);
        this.ctxUI.beginPath();
        this.ctxUI.moveTo(0,350);
        this.ctxUI.lineTo(canvasUI.width,350);
        this.ctxUI.closePath();
        this.ctxUI.stroke();
        this.ctxUI.beginPath();
        this.ctxUI.moveTo(canvasUI.width/2,0);
        this.ctxUI.lineTo(canvasUI.width/2,canvasUI.height-157);
        this.ctxUI.closePath();
        this.ctxUI.stroke();
        this.ctxUI.font = "20px Arial";
        this.ctxUI.textAlign = "center";
        this.ctxUI.fillText('"Enter a letter with your keyboard', 225, 50);
        this.ctxUI.fillText('or use the buttons below"', 225, 100);
    }

    /**
     * Draws the word to guess.
     * 
     * @param {String} word the word to guess
     */
    static drawWord(word) {
        this.ctxUI.font = "40px Arial";
        this.ctxUI.textAlign = "center";
        this.ctxUI.clearRect(5, 150, 440, 150);
        this.ctxUI.fillText(word, 225, 250);
    }

    /**
     * Draws the winning/loosing text.
     * 
     * @param {Boolean} won won (true) / lost (false) state
     */
    static drawEnd(won) {
        this.ctxUI.font = "20px Arial";
        this.ctxUI.textAlign = "center";
        this.ctxUI.clearRect(5, 5, 440, 200);
        if (won) {
            this.ctxUI.fillText('You win !', 225, 50);
        } else {
            this.ctxUI.fillText('You lose !', 225, 50);
        }
    }
}


class Button {
    static buttons = document.getElementById('btns');

    /**
     * Creates a button displaying a single letter.
     * Adds a class for the style and a dynamic id based on the letter.
     * 
     * @param {Character} letter the letter to display
     * 
     * @return {HTMLElement} the button
     */
    static createBtn(letter) {
        let element = document.createElement('button');
        element.setAttribute('type', 'button');
        element.setAttribute('class', 'letterBtn');
        element.setAttribute('id', 'btn' + letter);
        element.innerHTML = letter;
        return element;
    }

    /**
     * Generates a button for each character in a string.
     * Appends each button to the #btns div.
     * 
     * @param {String} alphabet the string containing the characters to display
     * 
     * @return {Array} an array containing all the buttons
     */
    static generateBtns(alphabet) {
        this.buttons.innerHTML = '';
        let buttonsList = [];
        for (let i = 0; i < alphabet.length; i++) {
            let btn = this.createBtn(alphabet[i]);
            this.buttons.appendChild(btn);
            buttonsList.push(btn);
        }
        return buttonsList;
    }
}
/**
 * A library of words.
 * Each property corresponds to a category and contains an array of words.
 */
class Words {

    static animals = [
        'ant',
        'bear',
        'cat',
        'dog',
        'elephant',
        'frog',
        'goat',
        'horse',
        'lion',
        'mouse',
        'penguin',
        'rabbit',
        'snake',
        'tiger'
    ];

    static fruits = [
        'apple',
        'apricot',
        'banana',
        'cherry',
        'coconut',
        'grape',
        'lemon',
        'orange',
        'peach',
        'pineapple',
        'strawberry'
    ];

    static vehicules = [
        'bike',
        'boat',
        'car',
        'helicopter',
        'moto',
        'plane',
        'train',
        'truck',
    ];

    /**
     * Gets a random word from a given category.
     * Uses the fruits category as default.
     * 
     * @param {String} category the name of the category to choose from
     * 
     * @return {String} the choosen word
     */
    static getWord(category) {
        let wordList = Words[category] ? Words[category] : Words.fruits;
        let randomIndex = Math.floor(Math.random()*(category.length));
        return wordList[randomIndex];

    }

}
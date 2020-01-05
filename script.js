let heroNames = [];
let randomHeroName = '';
let mistakes = 0;
let maxWrong = 6;
let guessed = [];
let wordStatus = null;

let wordToGuessElem = document.querySelector('.hero-name');
let mistakesElem = document.querySelector('#mistakes');
let hangmanPicElem = document.querySelector('#hangmanPic');

const start = document.querySelector('#start');
start.addEventListener('click', reset);

function fetchHeroNames() {
    dotaHeroes().then(results => {
        results.forEach(res => {
            heroNames.push(res.localized_name);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

async function dotaHeroes() {
    let apiUrl = 'https://api.opendota.com/api/heroes';

    let response = await fetch(apiUrl);
    let data = await response.json();

    return data;
}

function getRandomHeroName() {
    randomHeroName = (heroNames[Math.floor(Math.random() * heroNames.length)]).toUpperCase();
    if (randomHeroName.includes(' ')) {
        randomHeroName = randomHeroName.replace(' ', '_');
    }

    guessedWord();
    console.log(randomHeroName);    
}

function generateButtons() {
    document.querySelector('.letters').innerHTML = '';

    let characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', " ' ", ' _ '];
    characters.forEach(char => {

        let btn = document.createElement('button');

        btn.innerText = char;
        btn.addEventListener('click', handleGuess);
        document.querySelector('.letters').appendChild(btn);
    });
}

function handleGuess() {
    guessed.indexOf(this.innerText) === -1 ? guessed.push(this.innerText) : null;
    this.setAttribute('disabled', true);

    if (randomHeroName.indexOf(this.innerText) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (randomHeroName.indexOf(this.innerText) === -1) {
        mistakes++;
        updateMistakes();
        updateHangmanPicture();
        checkIfGameLost();
    }
}

function guessedWord() {
    wordStatus = randomHeroName.split('').map(letter => 
        (guessed.indexOf(letter) >= 0 ? letter : ' _ ')).join('');
  
    document.querySelector('.hero-name').innerHTML = wordStatus;
}

function updateMistakes() {
    mistakesElem.innerHTML = mistakes;
}

function updateHangmanPicture() {
    hangmanPicElem.src = `./images/hangman-${mistakes}.png`;
}

function checkIfGameWon() {
    if (randomHeroName == wordStatus) {
        wordToGuessElem.innerHTML = `Correct! <br> 
                                    You Win!`;   
    }
}

function checkIfGameLost() {
    if (mistakes == maxWrong) {
        wordToGuessElem.innerHTML = `You lost!<br>
                                    Hero name was: ${randomHeroName}`;
    }
}

function reset() {
    mistakes = 0;
    guessed = [];
    hangmanPicElem.src = './images/hangman-0.png';
    start.innerText = 'Restart';
  
    getRandomHeroName();
    generateButtons();
    guessedWord();
    updateMistakes();
    generateButtons();
  }

fetchHeroNames();
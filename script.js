let heroNames = [];
let randomHeroName = '';
let mistakes = 0;
let maxWrong;
let guessed = [];
let wordStatus = null;

let maxWrongElem = document.querySelector('#maxWrong');

const start = document.querySelector('#start');
start.addEventListener('click', getRandomHeroName);

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

    triesSetur();

    guessedWord();
    console.log(randomHeroName);    
}

function generateButtons() {
    document.querySelector('.letters').innerHTML = '';

    let characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_', " ' "];
    characters.forEach(char => {

        let btn = document.createElement('button');

        btn.innerText = char;
        btn.addEventListener('click', handleGuess);
        document.querySelector('.letters').appendChild(btn);
    });
}

function handleGuess() {
    console.log(this.innerText);

    guessed.indexOf(this.innerText) === -1 ? guessed.push(this.innerText) : null;
    this.setAttribute('disabled', true);

    if (randomHeroName.indexOf(this.innerText) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (randomHeroName.indexOf(this.innerText) === -1) {
        // mistakes++;
        // updateMistakes();
        // checkIfGameLost();
        // updateHangmanPicture();
    }
}

function triesSetur() {
    if (randomHeroName.length < 5) {
        maxWrong = 3;
        maxWrongElem.innerText = maxWrong;
    }
    else if (randomHeroName.length < 10) {
        maxWrong = 5;
        maxWrongElem.innerText = maxWrong;
    }
    else {
        maxWrong = 7;
        maxWrongElem.innerText = maxWrong;
    }
}

function guessedWord() {
    wordStatus = randomHeroName.split('').map(letter => 
        (guessed.indexOf(letter) >= 0 ? letter : ' _ ')).join('');
  
    document.querySelector('.hero-name').innerHTML = wordStatus;
}

function checkIfGameWon() {
    if (randomHeroName == wordStatus) {
        guessed = [];
        generateButtons();
        console.log('Correct');        
    }
}

fetchHeroNames();
// getRandomHeroName();
generateButtons();
guessedWord();


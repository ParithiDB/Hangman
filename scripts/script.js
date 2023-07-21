const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord;
let correctLetters;
let wrongGuess;
const maxGuesses = 6;

function resetGame() {
    correctLetters = [];
    wrongGuess = 0;
    hangmanImage.src = `images/hangman-${wrongGuess}.svg`
    guessesText.innerText = `${wrongGuess} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll('button').forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

function getRandomWord () {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
   
}

function gameOver(isVictory) {
    setTimeout(() => {
        const modalText = isVictory ? `Wow! You found the word:` : `You Dumb ~ The correct word is:`;
        gameModal.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector('h4').innerText = `${isVictory ? 'Wonderful!!!' : 'Game Over!'}`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

function initGame(button, clickedLetter) {
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuess++;
        hangmanImage.src = `images/hangman-${wrongGuess}.svg`
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuess} / ${maxGuesses}`;

    if(wrongGuess == maxGuesses) { 
        return gameOver(false);
    }
    if(correctLetters.length == currentWord.length) {
        return gameOver(true);
    }
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)) );
    
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
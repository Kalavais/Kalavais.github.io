// script.js
const targetWord = "apple";  // In a real game, this would be randomly selected from a list
let currentGuess = "";
const board = document.getElementById("board");
const message = document.getElementById("message");

function createBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            board.appendChild(cell);
        }
    }
}

function updateBoard() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < currentGuess.length; i++) {
        cells[i].textContent = currentGuess[i];
    }
}

function checkGuess() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < 5; i++) {
        if (currentGuess[i] === targetWord[i]) {
            cells[i].classList.add("correct");
        } else if (targetWord.includes(currentGuess[i])) {
            cells[i].classList.add("present");
        } else {
            cells[i].classList.add("absent");
        }
    }
}

function submitGuess() {
    currentGuess = document.getElementById("guess").value.toLowerCase();
    if (currentGuess.length !== 5) {
        message.textContent = "Please enter a 5-letter word.";
        return;
    }

    updateBoard();
    checkGuess();
    
    if (currentGuess === targetWord) {
        message.textContent = "Congratulations! You've guessed the word!";
    } else {
        message.textContent = "Try again!";
    }
}

createBoard();

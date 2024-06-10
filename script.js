let answer = "tapir"; // Change to lowercase for consistency
let currentRow = 0;
let currentTile = 0;
let gameActive = true;

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

function createBoard() {
    for (let i = 0; i < 5; i++) { // Adjusted to 5 rows for Wordle
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("id", `tile-${i}`);
        board.appendChild(tile);
    }
}

function createKeyboard() {
    const keys = "abcdefghijklmnopqrstuvwxyz"; // Added missing letters
    keys.split("").forEach((key) => {
        const keyButton = document.createElement("button");
        keyButton.textContent = key.toUpperCase(); // Uppercase letters
        keyButton.classList.add("key");
        keyButton.setAttribute("data-key", key);
        keyButton.addEventListener("click", () => handleKeyPress(key));
        keyboard.appendChild(keyButton);
    });

    const enterButton = document.createElement("button");
    enterButton.textContent = "Enter";
    enterButton.classList.add("key", "wide");
    enterButton.addEventListener("click", handleEnterPress);
    keyboard.appendChild(enterButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Del";
    deleteButton.classList.add("key", "wide");
    deleteButton.addEventListener("click", handleDeletePress);
    keyboard.appendChild(deleteButton);
}

function handleKeyPress(key) {
    if (!gameActive || currentTile >= 5) return;
    const tile = document.getElementById(`tile-${currentTile}`);
    tile.textContent = key.toUpperCase(); // Uppercase letters
    currentTile++;
}

function handleDeletePress() {
    if (!gameActive || currentTile === 0) return;
    currentTile--;
    const tile = document.getElementById(`tile-${currentTile}`);
    tile.textContent = "";
}

function handleEnterPress() {
    if (!gameActive || currentTile < 5) return;

    const guess = [];
    for (let i = 0; i < 5; i++) {
        guess.push(document.getElementById(`tile-${i}`).textContent.toLowerCase());
    }
    const guessWord = guess.join("");

    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${i}`);
        const key = tile.textContent.toLowerCase();
        const keyButton = document.querySelector(`button[data-key="${key}"]`);
        if (answer[i] === key) {
            tile.classList.add("correct");
            keyButton.classList.add("correct");
        } else if (answer.includes(key)) {
            tile.classList.add("present");
            keyButton.classList.add("present");
        } else {
            tile.classList.add("absent");
            keyButton.classList.add("absent");
        }
    }

    if (guessWord === answer) {
        displayMessage("Congratulations! You guessed the word!");
        gameActive = false;
        restartButton.style.display = "block";
        return;
    }

    currentTile = 0;

    if (currentRow >= 6) {
        displayMessage(`Game over! The word was: ${answer}`);
        gameActive = false;
        restartButton.style.display = "block";
    }

    // Reset circles
    setTimeout(() => {
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile) => {
            tile.textContent = "";
            tile.classList.remove("correct", "present", "absent");
        });
        const keys = document.querySelectorAll(".key");
        keys.forEach((key) => key.classList.remove("correct", "present", "absent"));

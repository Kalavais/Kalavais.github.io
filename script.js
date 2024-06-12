// Define the target word
const targetWord = "tapir";

// Initialize guesses and feedback
let guesses = 0;
let feedback = [];

// Select DOM elements
const letterBoxes = document.querySelectorAll('.letter-box');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-btn');
const feedbackContainer = document.getElementById('feedback-container');

// Add event listener to submit button
submitButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase().trim();
    
    // Check if guess is valid
    if (isValidGuess(guess)) {
        // Increase guess count
        guesses++;

        // Calculate feedback
        const currentFeedback = calculateFeedback(guess);

        // Display feedback
        displayFeedback(currentFeedback);

        // Check if player has won
        if (currentFeedback.every(feedback => feedback === 'correct')) {
            displayWinMessage();
        }

        // Clear input
        guessInput.value = '';

        // Focus on input
        guessInput.focus();
    } else {
        alert('Please enter a valid 5-letter word with no repeated letters.');
    }
});

// Function to check if guess is valid
function isValidGuess(guess) {
    return /^[a-zA-Z]{5}$/.test(guess) && new Set(guess).size === 5;
}

// Function to calculate feedback for a guess
function calculateFeedback(guess) {
    const feedback = [];
    const guessArray = guess.split('');
    const targetArray = targetWord.split('');

    guessArray.forEach((letter, index) => {
        if (letter === targetArray[index]) {
            feedback.push('correct');
        } else if (targetArray.includes(letter)) {
            feedback.push('close');
        } else {
            feedback.push('incorrect');
        }
    });

    return feedback;
}

// Function to display feedback
function displayFeedback(currentFeedback) {
    letterBoxes.forEach((letterBox, index) => {
        const feedbackClass = currentFeedback[index];
        letterBox.textContent = targetWord[index].toUpperCase();
        letterBox.classList.add(feedbackClass);
    });

    const feedbackMessage = currentFeedback.map(feedback => {
        if (feedback === 'correct') {
            return '<span class="correct">●</span>';
        } else if (feedback === 'close') {
            return '<span class="close">●</span>';
        } else {
            return '<span class="incorrect">●</span>';
        }
    }).join('');

    const guessCountMessage = guesses === 1 ? '1 guess' : `${guesses} guesses`;

    feedbackContainer.innerHTML = `<p>${feedbackMessage}</p><p>(${guessCountMessage})</p>`;
}

// Function to display win message
function displayWinMessage() {
    feedbackContainer.innerHTML = `<p class="win-message">Congratulations! You guessed the word "${targetWord.toUpperCase()}" in ${guesses} guesses!</p>`;
    letterBoxes.forEach(letterBox => letterBox.classList.add('correct'));
}

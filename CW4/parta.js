// Game variables 
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessesLeft = 10;
let wins = 0;
let rounds = 1;
let soundEnabled = true; // 🔊 moved up so it's available everywhere

// Elements
const form = document.querySelector("form");
const guessInput = document.getElementById("UserGuess");

const guessesLeftText = document.getElementById("GuessLeft");
const winsText = document.getElementById("Wins");
const roundsText = document.getElementById("Round");

const messageText = document.getElementById("Message");
const clockText = document.getElementById("Clock");

const soundText = document.getElementById("Sound");
const sound = document.getElementById("guessSound"); // MUST exist in HTML

// Initialize UI
guessesLeftText.textContent = "Guesses Left: " + guessesLeft;
winsText.textContent = "Wins: " + wins;
roundsText.textContent = "Round: " + rounds;

// --------------------
// CLOCK FUNCTION
// --------------------
function updateClock() {
    const now = new Date();
    clockText.textContent = "Time: " + now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// --------------------
// SOUND TOGGLE
// --------------------
soundText.addEventListener("click", function () {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
        soundText.textContent = "Sound: On 🔊";
    } else {
        soundText.textContent = "Sound: Off 🔇";
    }
});

// --------------------
// GAME LOGIC
// --------------------
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let userGuess = Number(guessInput.value);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        messageText.textContent = "Enter a number between 1 and 100";
        return;
    }

    // 🔊 SOUND ONLY PLAYS HERE (FIXED)
    if (soundEnabled && sound) {
        sound.currentTime = 0;
        sound.play();
    }

    guessesLeft--;

    if (userGuess === randomNumber) {
        messageText.textContent = "✅ Correct! You win!";
        wins++;
        resetGame();
    } 
    else if (guessesLeft === 0) {
        messageText.textContent = "❌ Out of guesses! Number was " + randomNumber;
        resetGame();
    } 
    else if (userGuess < randomNumber) {
        messageText.textContent = "⬇️ Too low!";
    } 
    else {
        messageText.textContent = "⬆️ Too high!";
    }

    // Update stats
    guessesLeftText.textContent = "Guesses Left: " + guessesLeft;
    winsText.textContent = "Wins: " + wins;
    roundsText.textContent = "Round: " + rounds;

    guessInput.value = "";
});

// --------------------
// RESET GAME
// --------------------
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessesLeft = 10;
    rounds++;
}
let firstCard = null;
let secondCard = null;

let lockBoard = true;
let gameOver = false;

let matches = 0;
let totalPairs = 0;

let timeLeft = 0;
let timerInterval;

// START GAME
function startGame() {
    const pairs = parseInt(document.getElementById("pairs").value);
    const gameTime = parseInt(document.getElementById("difficulty").value);

    totalPairs = pairs;
    matches = 0;

    gameOver = false;
    lockBoard = true;
    firstCard = null;
    secondCard = null;

    document.getElementById("matches").innerText = matches;
    document.getElementById("Message").innerText = "";

    clearInterval(timerInterval);

    timeLeft = gameTime;
    document.getElementById("timer").innerText = timeLeft;

    createBoard(pairs);

    // MEMORIZATION PHASE
    const memorizationTime = 5000;

    setTimeout(() => {
        hideCards();
        lockBoard = false;
        startTimer();
    }, memorizationTime);
}

// CREATE BOARD
function createBoard(pairs) {
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";

    let values = [];

    for (let i = 1; i <= pairs; i++) {
        values.push(i, i);
    }

    values = shuffle(values);

    // ✅ FORCE 4x6 GRID when 12 pairs (24 cards)
    if (pairs === 12) {
        board.style.gridTemplateColumns = "repeat(6, 70px)";
    } else {
        const totalCards = pairs * 2;
        const columns = Math.ceil(Math.sqrt(totalCards));
        board.style.gridTemplateColumns = `repeat(${columns}, 70px)`;
    }

    values.forEach(val => {
        const card = document.createElement("div");
        card.classList.add("card", "flipped");
        card.dataset.value = val;
        card.innerText = val;

        card.addEventListener("click", () => flipCard(card));

        board.appendChild(card);
    });
}

// HIDE CARDS
function hideCards() {
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("flipped");
        card.innerText = "?";
    });
}

// FLIP CARD
function flipCard(card) {
    // ✅ BLOCK ALL ACTIONS IF GAME OVER OR LOCKED
    if (lockBoard || gameOver || card.classList.contains("matched") || card === firstCard) return;

    card.classList.add("flipped");
    card.innerText = card.dataset.value;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkMatch();
}

// CHECK MATCH
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matches++;
        document.getElementById("matches").innerText = matches;

        resetTurn();

        if (matches === totalPairs) {
            endGame("You Win!");
        }
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "?";
            secondCard.innerText = "?";
            resetTurn();
        }, 800);
    }
}

// RESET TURN
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// TIMER
function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;

        document.getElementById("timer").innerText = timeLeft;

        // ✅ HARD STOP AT 0
        if (timeLeft <= 0) {
            timeLeft = 0;
            document.getElementById("timer").innerText = timeLeft;

            endGame("Time's up!");
            return;
        }
    }, 10);
}

// END GAME
function endGame(message) {
    clearInterval(timerInterval);

    gameOver = true;   // ✅ disables all clicking
    lockBoard = true;

    document.getElementById("Message").innerText = message;
}

// SHUFFLE
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
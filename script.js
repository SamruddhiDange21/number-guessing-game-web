let randomNumber;
let attempts;
let isGameOver = false;

const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attemptsText");
const guessHistory = document.getElementById("guessHistory");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const mainCard = document.querySelector(".main-game-card");

// Initialize game on load
initGame();

// Add Enter key event listener to input
guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess();
    }
});

function initGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    isGameOver = false;
    
    // Reset UI
    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    message.innerText = "";
    message.style.color = "var(--text-main)";
    attemptsText.innerText = "Attempts: 0";
    guessHistory.innerHTML = "";
    resetBtn.classList.add("hidden");
    
    // Focus input
    guessInput.focus();
}

function checkGuess() {
    if (isGameOver) return;

    let guess = parseInt(guessInput.value);

    // Input Validation
    if (isNaN(guess) || guess < 1 || guess > 100) {
        showError("Please enter a valid number between 1 and 100.");
        return;
    }

    attempts++;
    attemptsText.innerText = "Attempts: " + attempts;

    let historyItem = document.createElement("li");
    let spanNumber = document.createElement("span");
    spanNumber.innerText = "Guess: " + guess;
    
    let spanBadge = document.createElement("span");
    spanBadge.classList.add("badge");

    if (guess < randomNumber) {
        message.innerText = "Too low! Try a higher number.";
        message.style.color = "var(--warning)";
        spanBadge.innerText = "Too Low";
        spanBadge.classList.add("low");
        triggerShake();
    }
    else if (guess > randomNumber) {
        message.innerText = "Too high! Try a lower number.";
        message.style.color = "var(--danger)";
        spanBadge.innerText = "Too High";
        spanBadge.classList.add("high");
        triggerShake();
    }
    else {
        message.innerText = "🎉 Correct! You guessed the number in " + attempts + " attempts!";
        message.style.color = "var(--success)";
        spanBadge.innerText = "Correct";
        spanBadge.classList.add("correct");
        endGame();
    }

    // Add to history
    historyItem.appendChild(spanNumber);
    historyItem.appendChild(spanBadge);
    
    // Insert at the top of the history list
    if (guessHistory.firstChild) {
        guessHistory.insertBefore(historyItem, guessHistory.firstChild);
    } else {
        guessHistory.appendChild(historyItem);
    }

    // Clear input
    guessInput.value = "";
    if(!isGameOver) {
        guessInput.focus();
    }
}

function triggerShake() {
    mainCard.classList.remove("shake");
    // Trigger reflow to restart animation
    void mainCard.offsetWidth;
    mainCard.classList.add("shake");
}

function showError(msg) {
    message.innerText = msg;
    message.style.color = "var(--danger)";
    triggerShake();
}

function endGame() {
    isGameOver = true;
    guessInput.disabled = true;
    submitBtn.disabled = true;
    
    // Show reset button
    resetBtn.classList.remove("hidden");
    resetBtn.classList.add("pulse");
    
    // Focus reset button for quick replay
    setTimeout(() => resetBtn.focus(), 100);
}

function resetGame() {
    resetBtn.classList.remove("pulse");
    initGame();
}
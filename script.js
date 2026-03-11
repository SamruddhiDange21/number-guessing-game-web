let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {

    let guess = document.getElementById("guessInput").value;
    let message = document.getElementById("message");
    let attemptsText = document.getElementById("attempts");

    attempts++;

    if (guess < randomNumber) {
        message.innerText = "Too low!";
    }
    else if (guess > randomNumber) {
        message.innerText = "Too high!";
    }
    else {
        message.innerText = "Correct! You guessed the number!";
    }

    attemptsText.innerText = "Attempts: " + attempts;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    document.getElementById("message").innerText = "";
    document.getElementById("attempts").innerText = "";
    document.getElementById("guessInput").value = "";
}
const target = document.getElementById('target');
const scoreElement = document.getElementById('scoreValue');
const highScoreElement = document.getElementById('highScoreValue');
const timerElement = document.getElementById('timerValue');
const gameContainer = document.getElementById('game');
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let targetX = target.offsetLeft;
let targetY = target.offsetTop;
let intervalTime = 1000; // Initial interval time in milliseconds
let timer = 60; // Initial timer value in seconds

function moveTarget() {
    targetX = Math.floor(Math.random() * 450);
    targetY = Math.floor(Math.random() * 450);

    // Adjust target size based on the score
    const targetSize = Math.max(20, 80 - score * 2); // Minimum size of 20px
    target.style.width = targetSize + 'px';
    target.style.height = targetSize + 'px';

    target.style.left = targetX + 'px';
    target.style.top = targetY + 'px';

    // Adjust interval time based on the score with a higher multiplier
    intervalTime = Math.max(50, 1000 - score * 20);
}

function updateScore() {
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
}

function updateTimer() {
    timerElement.textContent = timer;
}

function endGame() {
    const gameOverMessage = document.createElement('div');
    gameOverMessage.innerHTML = `<p>Game Over!</p><p>Your Score: ${score}</p><p>High Score: ${highScore}</p>`;
    gameOverMessage.classList.add('game-over-message');
    gameContainer.appendChild(gameOverMessage);

    // Reset the score and timer
    score = 0;
    timer = 60;
    updateScore();
    updateTimer();

    // Remove the game over message after a delay
    setTimeout(() => {
        gameContainer.removeChild(gameOverMessage);
    }, 3000); // 3 seconds (adjust as needed)
}

function countdown() {
    if (timer > 0) {
        timer--;
        updateTimer();
    } else {
        endGame();
    }
}

setInterval(moveTarget, intervalTime);
setInterval(countdown, 1000); // Update the countdown every second

target.addEventListener('click', () => {
    score++;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    updateScore();
});

document.addEventListener('click', (event) => {
    if (event.target.id !== 'target') {
        endGame();
    }
});

// Initialize the score, high score, and timer on page load
updateScore();
updateTimer();

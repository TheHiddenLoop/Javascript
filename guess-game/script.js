
const input = document.querySelector("#txt");
const button = document.getElementById("btn");
const result = document.querySelector(".result");
const reset = document.getElementById("reset");
const hint = document.getElementById("hint");
const hintText = document.querySelector(".hint-text");
const attemptCount = document.getElementById("attempt-count");
const highScoreElement = document.getElementById("high-score");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const rangeText = document.querySelector(".range");
const progressBar = document.querySelector(".progress-bar");
const container = document.querySelector(".container");
const confettiContainer = document.getElementById("confetti-container");


let random;
let gameActive = true;
let attempts = 0;
let minRange = 1;
let maxRange = 100;
let difficulty = "easy";
let hintsUsed = 0;
let highScores = JSON.parse(localStorage.getItem("highScores")) || {
    easy: "-",
    medium: "-",
    hard: "-"
};


initGame();


button.addEventListener("click", checkGuess);
reset.addEventListener("click", resetGame);
hint.addEventListener("click", provideHint);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkGuess();
});

difficultyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!gameActive) return;
        
        difficultyButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        difficulty = btn.dataset.difficulty;
        setDifficulty(difficulty);
        resetGame();
    });
});

function initGame() {
    displayHighScores();
    setDifficulty(difficulty);
    generateRandomNumber();
    updateAttemptCount();
}

function setDifficulty(level) {
    switch(level) {
        case "easy":
            minRange = 1;
            maxRange = 100;
            break;
        case "medium":
            minRange = 1;
            maxRange = 500;
            break;
        case "hard":
            minRange = 1;
            maxRange = 1000;
            break;
    }
    
    rangeText.textContent = `Range: ${minRange}-${maxRange}`;
}

function generateRandomNumber() {
    random = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    console.log(`Secret number: ${random}`);
}

function checkGuess() {
    if (!gameActive) return;
    
    let num = Number(input.value);
    
    if (!num || num < minRange || num > maxRange) {
        result.innerHTML = `Please enter a valid number between ${minRange} and ${maxRange}!`;
        container.classList.add("shake");
        setTimeout(() => container.classList.remove("shake"), 500);
        return;
    }
    
    attempts++;
    updateAttemptCount();
    
    if (num === random) {
        handleCorrectGuess();
    } else if (num > random) {
        result.innerHTML = `Too high! Try again.`;
        updateProgressBar(num);
    } else {
        result.innerHTML = `Too low! Try again.`;
        updateProgressBar(num);
    }
    
    input.value = '';
    input.focus();
}

function handleCorrectGuess() {
    gameActive = false;
    result.innerHTML = `<span style="color: #4CAF50">Success! You guessed the number ${random} in ${attempts} attempts!</span>`;
    container.classList.add("pulse");
    
    if (highScores[difficulty] === "-" || attempts < highScores[difficulty]) {
        highScores[difficulty] = attempts;
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
        highScoreElement.style.color = "#4CAF50";
        setTimeout(() => highScoreElement.style.color = "", 2000);
    }
    
    createConfetti();
    
    progressBar.style.width = "100%";
    
    setTimeout(() => container.classList.remove("pulse"), 500);
}

function provideHint() {
    if (!gameActive) return;
    
    hintsUsed++;
    let hintRange = Math.floor((maxRange - minRange) / 10);
    
    hintRange = hintRange * hintsUsed;
    
    let lowerHint = Math.max(minRange, random - hintRange);
    let upperHint = Math.min(maxRange, random + hintRange);
    
    hintText.textContent = `The number is between ${lowerHint} and ${upperHint}`;
    
    if (hintsUsed >= 3) {
        hint.disabled = true;
        hint.style.opacity = "0.5";
    }
}

function resetGame() {
    gameActive = true;
    attempts = 0;
    hintsUsed = 0;
    
    input.value = '';
    result.innerHTML = '';
    hintText.textContent = '';
    
    generateRandomNumber();
    updateAttemptCount();
    
    progressBar.style.width = "0%";
    
    hint.disabled = false;
    hint.style.opacity = "1";
    
    input.focus();
}

function updateAttemptCount() {
    attemptCount.textContent = attempts;
}

function displayHighScores() {
    highScoreElement.textContent = highScores[difficulty] === "-" ? "-" : `${highScores[difficulty]} attempts`;
}

function updateProgressBar(guess) {
    let percentage;
    
    if (guess < random) {
        percentage = ((guess - minRange) / (random - minRange)) * 50;
    } else {
        percentage = 50 + (1 - ((guess - random) / (maxRange - random))) * 50;
    }
    
    percentage = Math.max(0, Math.min(100, percentage));
    
    progressBar.style.width = `${percentage}%`;
}

function createConfetti() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                   '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
                   '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 3 + 2;
        
        confetti.style.left = `${left}%`;
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.animationDuration = `${duration}s`;
        
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else if (Math.random() > 0.5) {
            confetti.style.borderRadius = '2px';
        }
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}
const gameArea = document.getElementById("game");
const overlay = document.getElementById("overlay");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("final-score");

let letters = [];
let score = 0;
let gameOver = false;
let spawnInterval, moveInterval;

function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function spawnLetter() {
  const letter = document.createElement("div");
  letter.classList.add("letter");
  letter.textContent = getRandomLetter();
  letter.style.left = Math.floor(Math.random() * 90) + "%";
  letter.style.top = "0%";
  letter.dataset.char = letter.textContent;
  letter.dataset.top = "0";
  gameArea.appendChild(letter);
  letters.push(letter);
}

function moveLetters() {
  letters.forEach((letter, index) => {
    let currentTop = parseFloat(letter.dataset.top);
    currentTop += 5;
    letter.dataset.top = currentTop;
    letter.style.top = currentTop + "%";

    if (currentTop > 90 && !gameOver) {
      endGame();
    }
  });
}

function handleKeyPress(e) {
  const key = e.key.toUpperCase();
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].dataset.char === key) {
      gameArea.removeChild(letters[i]);
      letters.splice(i, 1);
      score++;
      scoreDisplay.textContent = score;
      return;
    }
  }
}

function startGame() {
  spawnInterval = setInterval(spawnLetter, 1000);
  moveInterval = setInterval(moveLetters, 300);
  window.addEventListener("keydown", handleKeyPress);
}

function endGame() {
  gameOver = true;
  clearInterval(spawnInterval);
  clearInterval(moveInterval);
  window.removeEventListener("keydown", handleKeyPress);
  overlay.style.display = "block";
  finalScoreDisplay.textContent = score;
}

function restartGame() {
  letters.forEach((letter) => gameArea.removeChild(letter));
  letters = [];
  score = 0;
  gameOver = false;
  scoreDisplay.textContent = "0";
  overlay.style.display = "none";
  startGame();
}

startGame();

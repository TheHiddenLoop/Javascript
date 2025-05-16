const gridSize = 5;
const totalCells = gridSize * gridSize;
let remaining = 0;
let score = 0;
let gameOver = false;

const gridElement = document.getElementById("grid");
const scoreElement = document.getElementById("score");
const remainingElement = document.getElementById("remaining");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");

let cells = [];
function initGame() {
  score = 0;
  gameOver = false;
  gridElement.innerHTML = "";
  messageElement.textContent = "";
  restartButton.style.display = "none";
  cells = [];

  let cellTypes = Array(7).fill("trap").concat(Array(18).fill("reward"));
  cellTypes = shuffleArray(cellTypes);
  remaining = cellTypes.filter((t) => t === "reward").length;
  updateUI();

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.type = cellTypes[i];
    cell.addEventListener("click", () => handleCellClick(cell));
    gridElement.appendChild(cell);
    cells.push(cell);
  }
}

function handleCellClick(cell) {
  if (cell.classList.contains("revealed") || gameOver) return;

  const type = cell.dataset.type;
  cell.classList.add("revealed");

  if (type === "reward") {
    cell.textContent = "💎";
    score += 10;
    remaining--;
    updateUI();
    if (remaining === 0) {
      messageElement.textContent = "You found all rewards!";
      gameOver = true;
      restartButton.style.display = "inline-block";
    }
  } else if (type === "trap") {
    cell.textContent = "💣";
    messageElement.textContent = "You hit a trap! Game Over.";
    gameOver = true;
    revealAll();
    restartButton.style.display = "inline-block";
  }
}

function updateUI() {
  scoreElement.textContent = score;
  remainingElement.textContent = remaining;
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
  console.log(arr);
  
}

function revealAll() {
  for (const cell of cells) {
    if (!cell.classList.contains("revealed")) {
      const type = cell.dataset.type;
      cell.classList.add("revealed");
      cell.textContent = type === "trap" ? "💣" : "💎";
    }
  }
}

initGame();

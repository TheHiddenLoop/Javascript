document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell-index]');
    const statusDisplay = document.getElementById('status');
    const resetGameButton = document.getElementById('reset-game');
    const resetScoreButton = document.getElementById('reset-score');
    const restartButton = document.getElementById('restart-button');
    const winningMessage = document.getElementById('winning-message');
    const winningMessageText = document.getElementById('winning-message-text');
    const scoreX = document.getElementById('score-x');
    const scoreO = document.getElementById('score-o');
    const playerX = document.querySelector('.player-x');
    const playerO = document.querySelector('.player-o');

    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let scores = { X: 0, O: 0 };

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winningMessageTextContent = () => `Player ${currentPlayer} wins!`;
    const drawMessage = () => 'Game ended in a draw!';
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

    statusDisplay.textContent = currentPlayerTurn();

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        clickedCell.classList.add('played');
        
        setTimeout(() => {
            clickedCell.classList.remove('played');
        }, 300);
    }

    function handleResultValidation() {
        let roundWon = false;
        let winningLine = null;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
            
            if (condition) {
                roundWon = true;
                winningLine = winningConditions[i];
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = winningMessageTextContent();
            gameActive = false;

            winningLine.forEach(index => {
                cells[index].classList.add('win');
            });
            
            scores[currentPlayer]++;
            updateScoreDisplay();
            
            // Show winning message with delay
            setTimeout(() => {
                winningMessageText.textContent = winningMessageTextContent();
                winningMessage.classList.add('show');
            }, 1000);
            
            return;
        }

        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.textContent = drawMessage();
            gameActive = false;
            
            // Show draw message with delay
            setTimeout(() => {
                winningMessageText.textContent = drawMessage();
                winningMessage.classList.add('show');
            }, 1000);
            
            return;
        }

        changePlayer();
    }

    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = currentPlayerTurn();
        
        // Update active player indicator
        if (currentPlayer === 'X') {
            playerX.classList.add('active');
            playerO.classList.remove('active');
        } else {
            playerO.classList.add('active');
            playerX.classList.remove('active');
        }
    }

    function updateScoreDisplay() {
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
    }

    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = currentPlayerTurn();
        
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'win');
        });
        
        playerX.classList.add('active');
        playerO.classList.remove('active');
        
        winningMessage.classList.remove('show');
    }

    function resetScore() {
        scores = { X: 0, O: 0 };
        updateScoreDisplay();
    }

    // Event Listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetGameButton.addEventListener('click', resetGame);
    resetScoreButton.addEventListener('click', resetScore);
    restartButton.addEventListener('click', resetGame);
});
const allEmojis = [
      "🍕", "🚀", "🎈", "🐶", "🍩", "🎮", "🍎", "🐱", "🌟", "🏀",
      "🌈", "🍔", "📱", "🦊", "🧊", "🎧", "🚲", "📸"
    ];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function shuffle(array) {
      return array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
      const board = document.getElementById("gameBoard");
      board.innerHTML = "";

      const emojiPairs = shuffle([...allEmojis, ...allEmojis]); 
      emojiPairs.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.innerText = "";
        card.addEventListener("click", flipCard);
        board.appendChild(card);
      });
    }

    function flipCard() {
      if (lockBoard || this.classList.contains("flipped") || this.classList.contains("matched")) return;

      this.innerText = this.dataset.emoji;
      this.classList.add("flipped");

      if (!firstCard) {
        firstCard = this;
        return;
      }

      secondCard = this;
      lockBoard = true;

      checkMatch();
    }

    function checkMatch() {
      const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

      if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetTurn();
      } else {
        setTimeout(() => {
          firstCard.innerText = "";
          secondCard.innerText = "";
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          resetTurn();
        }, 800);
      }
    }

    function resetTurn() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
    }

    document.getElementById("resetBtn").addEventListener("click", createBoard);

    createBoard();
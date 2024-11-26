// Game Object
const game = {
    player: { totalScore: 0, roundScore: 0 },
    computer: { totalScore: 0, roundScore: 0 },
    round: 0,
    maxRounds: 3,
  
    rollDice() {
      return Math.floor(Math.random() * 6) + 1;
    },
  
    calculateScore(die1, die2) {
      if (die1 === 1 || die2 === 1) {
        return 0;
      } else if (die1 === die2) {
        return (die1 + die2) * 2;
      } else {
        return die1 + die2;
      }
    },
  
    resetGame() {
      this.player.totalScore = 0;
      this.computer.totalScore = 0;
      this.round = 0;
  
      updateUI();
      rollButton.disabled = false;
      resultMessage.textContent = "";
    },
  };
  
  // UI Elements
  const rollButton = document.getElementById("roll-button");
  const resetButton = document.getElementById("reset-button");
  const playerDie1 = document.getElementById("player-die1");
  const playerDie2 = document.getElementById("player-die2");
  const computerDie1 = document.getElementById("computer-die1");
  const computerDie2 = document.getElementById("computer-die2");
  const playerRoundScoreEl = document.getElementById("player-round-score");
  const computerRoundScoreEl = document.getElementById("computer-round-score");
  const playerTotalScoreEl = document.getElementById("player-total-score");
  const computerTotalScoreEl = document.getElementById("computer-total-score");
  const resultMessage = document.getElementById("result-message");
  
  // Update UI Function
  function updateUI() {
    playerRoundScoreEl.textContent = game.player.roundScore;
    computerRoundScoreEl.textContent = game.computer.roundScore;
    playerTotalScoreEl.textContent = game.player.totalScore;
    computerTotalScoreEl.textContent = game.computer.totalScore;
  
    playerDie1.src = `images/dice${game.player.die1}.png`;
    playerDie2.src = `images/dice${game.player.die2}.png`;
    computerDie1.src = `images/dice${game.computer.die1}.png`;
    computerDie2.src = `images/dice${game.computer.die2}.png`;
  
    // Add fade-in effect to dice
    playerDie1.classList.add("dice");
    playerDie2.classList.add("dice");
    computerDie1.classList.add("dice");
    computerDie2.classList.add("dice");
  
    setTimeout(() => {
      playerDie1.classList.remove("dice");
      playerDie2.classList.remove("dice");
      computerDie1.classList.remove("dice");
      computerDie2.classList.remove("dice");
    }, 300);
  }
  
  // Roll Dice Event
  rollButton.addEventListener("click", () => {
    if (game.round < game.maxRounds) {
      game.round++;
  
      // Player Rolls
      game.player.die1 = game.rollDice();
      game.player.die2 = game.rollDice();
      game.player.roundScore = game.calculateScore(game.player.die1, game.player.die2);
      game.player.totalScore += game.player.roundScore;
  
      // Computer Rolls
      game.computer.die1 = game.rollDice();
      game.computer.die2 = game.rollDice();
      game.computer.roundScore = game.calculateScore(game.computer.die1, game.computer.die2);
      game.computer.totalScore += game.computer.roundScore;
  
      updateUI();
  
      // End Game
      if (game.round === game.maxRounds) {
        rollButton.disabled = true;
        if (game.player.totalScore > game.computer.totalScore) {
          resultMessage.textContent = "Player Wins!";
        } else if (game.computer.totalScore > game.player.totalScore) {
          resultMessage.textContent = "Computer Wins!";
        } else {
          resultMessage.textContent = "It's a Tie!";
        }
      }
    }
  });
  
  // Reset Game Event
  resetButton.addEventListener("click", () => game.resetGame());
  
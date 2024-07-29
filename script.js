document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("resetButton");
    const startGameButton = document.getElementById("startGameButton");
    const backToHomeButton = document.getElementById("backToHomeButton");
    const statusText = document.getElementById("status");
    const nameForm = document.getElementById("nameForm");
    const board = document.querySelector(".board");
    let playerXName = "";
    let playerOName = "";
    let currentPlayer = "X";
    let gameActive = false;
    const boardState = ["", "", "", "", "", "", "", "", ""];

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

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute("data-index");

        if (boardState[cellIndex] !== "" || !gameActive) {
            return;
        }

        updateCell(cell, cellIndex);
        checkResult();
    }

    function updateCell(cell, index) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
    }

    function checkResult() {
        let roundWon = false;
        let winningCombination = [];
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                winningCombination = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `${currentPlayer === "X" ? playerXName : playerOName} has won!`;
            statusText.classList.add("winner-message");
            gameActive = false;
            highlightWinningCells(winningCombination);
            return;
        }

        if (!boardState.includes("")) {
            statusText.textContent = "It's a draw!";
            statusText.classList.remove("winner-message");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer === "X" ? playerXName : playerOName}'s Turn`;
        statusText.classList.remove("winner-message");
    }

    function highlightWinningCells(winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add("winner");
        });
    }

    function resetGame() {
        currentPlayer = "X";
        gameActive = true;
        boardState.fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O", "winner");
        });
        statusText.textContent = `Player ${playerXName}'s Turn`;
        statusText.classList.remove("winner-message");
    }

    function startGame() {
        playerXName = document.getElementById("playerXName").value.trim();
        playerOName = document.getElementById("playerOName").value.trim();

        if (!playerXName || !playerOName) {
            alert("Please enter names for both players.");
            return;
        }

        nameForm.style.display = "none";
        board.style.display = "grid";
        resetButton.style.display = "block";
        backToHomeButton.style.display = "block";
        statusText.style.display = "block";
        resetGame();
    }

    function goBackToHome() {
        nameForm.style.display = "block";
        board.style.display = "none";
        resetButton.style.display = "none";
        backToHomeButton.style.display = "none";
        statusText.style.display = "none";
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    startGameButton.addEventListener("click", startGame);
    backToHomeButton.addEventListener("click", goBackToHome);
});

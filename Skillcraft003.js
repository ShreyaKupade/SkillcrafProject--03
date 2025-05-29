const gameBoard = document.getElementById("game");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const createBoard = () => {
  gameBoard.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", index);
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", `Cell ${index + 1}`);
    cell.addEventListener("click", handleClick);
    gameBoard.appendChild(cell);
  });
};

const handleClick = (e) => {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
};

const checkWinner = () => {
  return winningCombos.some(combo => 
    combo.every(index => board[index] === currentPlayer)
  );
};

const restartGame = () => {
  board.fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
};

restartBtn.addEventListener("click", restartGame);

createBoard();
statusText.textContent = `Player ${currentPlayer}'s Turn`;

const gameGrid = document.getElementById("game-grid");
const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time");
const startBtn = document.getElementById("start-btn");

let score = 0;
let timeLeft = 30;
let gameInterval;
let moleInterval;
let holes = [];

function createGrid() {
  gameGrid.innerHTML = "";
  holes = [];
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");

    const mole = document.createElement("div");
    mole.classList.add("mole");
    hole.appendChild(mole);

    gameGrid.appendChild(hole);
    holes.push({ hole, mole });
  }
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreSpan.textContent = score;
  timeSpan.textContent = timeLeft;
  startBtn.disabled = true;

  createGrid();

  gameInterval = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  moleInterval = setInterval(() => {
    const i = Math.floor(Math.random() * holes.length);
    const { mole } = holes[i];
    mole.classList.add("show");

    setTimeout(() => {
      mole.classList.remove("show");
    }, 700);
  }, 800);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(moleInterval);
  startBtn.disabled = false;
  alert(`ゲーム終了！スコア: ${score}`);
}

gameGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("mole") && e.target.classList.contains("show")) {
    score++;
    scoreSpan.textContent = score;
    e.target.classList.remove("show");
  }
});

startBtn.addEventListener("click", startGame);

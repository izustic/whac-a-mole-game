const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const startButton = document.querySelector("#start-button");
const modal = document.getElementById("modal");
const modalHeading = document.getElementById("modal-heading");
const closeBtn = document.getElementsByClassName("close")[0];
const finalScore = document.getElementById("final-score");
const tryAgainButton = document.getElementById("try-again-button");
const para = document.querySelector("#modal-btn p");

const themeAudio = document.getElementById("theme-audio");
const touchAudio = document.getElementById("touch-audio");
const winAudio = document.getElementById("win-audio");
const loseAudio = document.getElementById("lose-audio");
const musicButton = document.createElement("button");
musicButton.classList.add("button");
musicButton.textContent = "Music: On";
musicButton.addEventListener("click", toggleMusic);

let isGameStarted = false;
let isGamePaused = false;
let isMusicOn = true;
let result = 0;
let molePosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;

function toggleMusic() {
  isMusicOn = !isMusicOn;
  if (isMusicOn) {
    musicButton.textContent = "Music: On";
    themeAudio.play();
  } else {
    musicButton.textContent = "Music: Off";
    themeAudio.pause();
  }
}

function startGame() {
  isGameStarted = true;
  result = 0;
  score.textContent = result;
  currentTime = 60;
  timeLeft.textContent = currentTime;
  startButton.textContent = "Pause";
  timerId = setInterval(randomSquare, 500);

  clearInterval(countDownTimerId);
  countDownTimerId = setInterval(countDown, 1000);

  if (isMusicOn) {
    themeAudio.currentTime = 0;
    themeAudio.play();
  }
}

function pauseGame() {
  isGamePaused = true;
  clearInterval(timerId);
  startButton.textContent = "Resume";
}

function resumeGame() {
  isGamePaused = false;
  timerId = setInterval(randomSquare, 500);
  startButton.textContent = "Pause";
}

function toggleGame() {
  if (!isGameStarted) {
    startGame();
  } else if (!isGamePaused) {
    pauseGame();
  } else {
    resumeGame();
  }
}

function countDown() {
  if (isGameStarted && !isGamePaused) {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);
      if (result >= 30) {
        showModal(`Congratulations! You won the game! Your score is ${result}`);
      } else {
        showModal(`Game over`);
      }
    }
  }
}

function showModal(message) {
  modalHeading.textContent = message;
  finalScore.textContent = result;
  if (result >= 30) {
    modalHeading.classList.remove("neon-red");
    modalHeading.classList.add("neon-green");
    winAudio.currentTime = 0;
    winAudio.play();
  } else {
    modalHeading.classList.remove("neon-green");
    modalHeading.classList.add("neon-red");
    loseAudio.currentTime = 0;
    loseAudio.play();
  }
  modal.style.display = "block";
  themeAudio.pause();
}

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  let randomPosition = Math.floor(Math.random() * 9);
  molePosition = randomPosition;
  squares[molePosition].classList.add("mole");
}

function handleSquareClick(index) {
  if (index === molePosition && isGameStarted && !isGamePaused) {
    result++;
    score.textContent = result;

    if (result >= 30) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);
      showModal(`Congratulations! You won the game!`);
    }
  }
}

startButton.addEventListener("click", toggleGame);

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  isGameStarted = false;
  startButton.textContent = "Restart";
  startButton.removeEventListener("click", toggleGame);
  startButton.addEventListener("click", startGame);
});

tryAgainButton.addEventListener("click", () => {
  modal.style.display = "none";
  startGame();
});

squares.forEach((square, index) => {
  square.addEventListener("click", () => handleSquareClick(index));
});

window.addEventListener("load", () => {
  if (isMusicOn) {
    themeAudio.play();
  }
});
























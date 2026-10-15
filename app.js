import { initialScore, nextScore } from "./score.js";

const maxInput = document.querySelector("#max-score");
const currentScore = document.querySelector("#current-score");
const scoreTotal = document.querySelector("#score-total");
const progressBar = document.querySelector("#progress-bar");
const modeLabel = document.querySelector("#mode-label");
const hint = document.querySelector("#hint");

let mode = "earned";
let score = 0;

function maxScore() {
  return Math.min(999, Math.max(1, Number.parseInt(maxInput.value, 10) || 100));
}

function render() {
  const max = maxScore();
  currentScore.textContent = score;
  scoreTotal.textContent = `/ ${max}점`;
  progressBar.style.width = `${(score / max) * 100}%`;
  modeLabel.textContent = mode === "earned" ? "쌓인 점수" : "남은 점수";
  hint.textContent = mode === "earned" ? "득점 모드 · 0점에서 시작" : `감점 모드 · ${max}점에서 시작`;
}

function reset() {
  score = initialScore(maxScore(), mode);
  render();
}

document.querySelectorAll("[data-points]").forEach((button) => {
  button.addEventListener("click", () => {
    score = nextScore(score, Number(button.dataset.points), maxScore(), mode);
    render();
  });
});

document.querySelectorAll("[name=mode]").forEach((radio) => {
  radio.addEventListener("change", () => {
    mode = radio.value;
    reset();
  });
});

maxInput.addEventListener("change", () => {
  maxInput.value = maxScore();
  reset();
});

document.querySelector("#reset").addEventListener("click", reset);
render();

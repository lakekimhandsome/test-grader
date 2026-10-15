import { scoreFromEntries, shortcutPoints } from "./score.js";

const maxInput = document.querySelector("#max-score");
const currentScore = document.querySelector("#current-score");
const scoreTotal = document.querySelector("#score-total");
const progressBar = document.querySelector("#progress-bar");
const modeLabel = document.querySelector("#mode-label");

let mode = "earned";
let entries = [];

function maxScore() {
  return Math.min(999, Math.max(1, Number.parseInt(maxInput.value, 10) || 100));
}

function render() {
  const max = maxScore();
  const score = scoreFromEntries(entries, max, mode);
  currentScore.textContent = score;
  scoreTotal.textContent = `/ ${max}점`;
  progressBar.style.width = `${(score / max) * 100}%`;
  modeLabel.textContent = mode === "earned" ? "쌓인 점수" : "남은 점수";
  document.querySelectorAll("[data-count]").forEach((count) => {
    count.textContent = entries.filter((points) => points === Number(count.dataset.count)).length;
  });
  document.querySelector("#undo").disabled = entries.length === 0;
}

function reset() {
  entries = [];
  render();
}

document.querySelectorAll("[data-points]").forEach((button) => {
  button.addEventListener("click", () => {
    entries.push(Number(button.dataset.points));
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
document.querySelector("#undo").addEventListener("click", () => {
  entries.pop();
  render();
});

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.target instanceof HTMLInputElement) return;
  const points = shortcutPoints(event.key);
  if (points) document.querySelector(`[data-points="${points}"]`).click();
});

render();

export function nextScore(score, points, maxScore, mode) {
  const next = mode === "earned" ? score + points : score - points;
  return Math.min(maxScore, Math.max(0, next));
}

export function initialScore(maxScore, mode) {
  return mode === "earned" ? 0 : maxScore;
}

export function shortcutPoints(key) {
  return ["2", "3", "4"].includes(key) ? Number(key) : null;
}

export function scoreFromEntries(entries, maxScore, mode) {
  return entries.reduce((score, points) => nextScore(score, points, maxScore, mode), initialScore(maxScore, mode));
}

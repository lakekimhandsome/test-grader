import test from "node:test";
import assert from "node:assert/strict";
import { initialScore, nextScore } from "./score.js";

test("득점은 0에서 시작해 만점을 넘지 않는다", () => {
  assert.equal(initialScore(10, "earned"), 0);
  assert.equal(nextScore(8, 4, 10, "earned"), 10);
});

test("감점은 만점에서 시작해 0점 아래로 내려가지 않는다", () => {
  assert.equal(initialScore(10, "deducted"), 10);
  assert.equal(nextScore(2, 3, 10, "deducted"), 0);
});

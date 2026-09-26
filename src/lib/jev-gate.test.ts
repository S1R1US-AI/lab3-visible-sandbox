import assert from "node:assert/strict";
import test from "node:test";
import { JEV_CUTOFF, questionIsForbidden, verdictFromProbability } from "./jev-gate.ts";

test("a score under the cutoff is HOLD and keeps the probability", () => {
  const verdict = verdictFromProbability(0.62);
  assert.equal(verdict.action, "HOLD");
  assert.equal(verdict.probability, 0.62);
  assert.equal(verdict.cutoff, JEV_CUTOFF);
  assert.equal("navPct" in verdict, false);
});

test("a score at the cutoff may propose and still has no size", () => {
  const verdict = verdictFromProbability(JEV_CUTOFF);
  assert.equal(verdict.action, "PASS");
  assert.match(verdict.reason, /no size/);
  assert.match(verdict.reason, /no sell/);
});

test("sell, size, and faq questions are forbidden", () => {
  assert.equal(questionIsForbidden("sell_core"), true);
  assert.equal(questionIsForbidden("pick_size"), true);
  assert.equal(questionIsForbidden("write_faq"), true);
  assert.equal(questionIsForbidden("sleeve_add_allowed"), false);
});

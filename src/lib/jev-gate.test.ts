import assert from "node:assert/strict";
import test from "node:test";
import { JEV_CUTOFF, hold, holdWhenKeyMissing, questionIsForbidden, verdictFromProbability } from "./jev-gate.ts";

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

test("when TYPESAFE_API_KEY is unset, scoring path stays HOLD unconfigured", () => {
  const prev = process.env.TYPESAFE_API_KEY;
  delete process.env.TYPESAFE_API_KEY;
  try {
    const missing = holdWhenKeyMissing(process.env.TYPESAFE_API_KEY);
    assert.ok(missing);
    assert.equal(missing!.action, "HOLD");
    assert.equal(missing!.source, "unconfigured");
    assert.match(missing!.reason, /key missing/i);
    // Same shape as live scoring without inventing a key or calling the API
    const viaHold = hold("unconfigured", "Jev key missing · HOLD");
    assert.equal(viaHold.action, "HOLD");
    assert.equal(viaHold.source, "unconfigured");
  } finally {
    if (prev === undefined) delete process.env.TYPESAFE_API_KEY;
    else process.env.TYPESAFE_API_KEY = prev;
  }
});

test("holdWhenKeyMissing passes through when a key string is present", () => {
  assert.equal(holdWhenKeyMissing("not-a-real-key-for-live-calls"), null);
  assert.ok(holdWhenKeyMissing(""));
  assert.ok(holdWhenKeyMissing(null));
});

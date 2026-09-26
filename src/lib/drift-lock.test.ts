import assert from "node:assert/strict";
import test from "node:test";
import { driftLocks } from "./drift-lock.ts";

const base = {
  riskProfile: 10,
  riskMax: 30,
  liveTape: true,
  high: true,
  coreStance: "ACCUMULATE",
  coreNav: 0.01,
  nineAction: "WAIT",
  nineNeedsCoord: false,
  canArm: true,
};

test("locks are 100 or 0, never a painted mid score", () => {
  const { locks } = driftLocks(base);
  for (const n of Object.values(locks)) assert.ok(n === 0 || n === 100);
});

test("an accumulate without Approve fails the maker lock", () => {
  const { locks, hardFails } = driftLocks({ ...base, nineAction: "ACCUMULATE", nineNeedsCoord: false });
  assert.equal(locks.makerChecker, 0);
  assert.ok(hardFails.some((f) => f.includes("Approve")));
});

test("a sell stance fails never-sell", () => {
  const { locks, hardFails } = driftLocks({ ...base, coreStance: "SELL" });
  assert.equal(locks.neverSell, 0);
  assert.ok(hardFails.some((f) => f.includes("sell")));
});

test("two-lane HIGH with no core add is a hard fail", () => {
  const { hardFails } = driftLocks({ ...base, high: true, coreNav: 0, coreStance: "WAIT" });
  assert.ok(hardFails.some((f) => f.includes("two-lane")));
});

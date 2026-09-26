import assert from "node:assert/strict";
import test from "node:test";
import { parseByoPaste } from "./byo-data.ts";
import { runVerify, verifyMayRun } from "./verify-checkpoint.ts";
import { twoLaneHigh, lanesWithGap } from "./desk-logic.ts";
import { S1R1US_PUBLISHED_RECEIVES, PUMP_FUTURE_ROADMAP_NOTE } from "./pump-sol.ts";

test("VERIFY refuses non-checkpoint triggers", () => {
  assert.equal(verifyMayRun("desk-poll"), false);
  assert.equal(verifyMayRun("refresh"), false);
  assert.equal(verifyMayRun("checkpoint-save"), true);
  assert.equal(verifyMayRun("build-checkpoint"), true);
});

test("VERIFY run on checkpoint-save keeps HIGH lock", async () => {
  await assert.rejects(() => runVerify("desk-poll"), /only on checkpoint/);
  const r = await runVerify("checkpoint-save");
  assert.equal(r.logicLocked, true);
  assert.equal(twoLaneHigh(lanesWithGap("mixed")), false);
  assert.ok(r.checks.some((c) => c.id === "clip-on" && c.pass));
  assert.ok(r.checks.some((c) => c.id === "overlay-lock" && c.pass));
  assert.ok(r.checks.some((c) => c.id === "official-receives" && c.pass));
  assert.ok(r.markdown.toLowerCase().includes("overlay never votes high"));
  assert.ok(r.markdown.toLowerCase().includes("never sell"));
  assert.ok(r.markdown.includes("33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8"));
  assert.ok(r.markdown.includes("0x551163f5d4c0361155d16131459afa5c936a60ad"));
  assert.equal(r.markdown.includes("7YmSVp"), false);
  assert.equal(r.markdown.includes("4tPFR"), false);
});

test("official public receives are BTC + EVM only", () => {
  assert.equal(S1R1US_PUBLISHED_RECEIVES.btc, "33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8");
  assert.equal(S1R1US_PUBLISHED_RECEIVES.ethEvmUsdc, "0x551163f5d4c0361155d16131459afa5c936a60ad");
  assert.equal("sol" in S1R1US_PUBLISHED_RECEIVES, false);
  assert.ok(PUMP_FUTURE_ROADMAP_NOTE.includes("never publishes a SOL receive"));
  assert.ok(PUMP_FUTURE_ROADMAP_NOTE.includes("LAUNCH PLAN"));
  assert.equal(PUMP_FUTURE_ROADMAP_NOTE.includes("7YmSVp"), false);
  assert.equal(PUMP_FUTURE_ROADMAP_NOTE.includes("4tPFR"), false);
});

test("BYO paste rejects keys and does not vote HIGH", () => {
  const bad = parseByoPaste('{"source":"x","apiSecret":"nope"}');
  assert.equal("err" in bad, true);
  const ok = parseByoPaste('{"source":"admin","ibitPct":-0.2,"ethaPct":0.4,"gldPct":0.3}');
  assert.equal("err" in ok, false);
  assert.equal(twoLaneHigh(lanesWithGap("mixed")), false);
});

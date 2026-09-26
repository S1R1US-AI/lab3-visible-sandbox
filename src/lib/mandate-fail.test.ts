import assert from "node:assert/strict";
import test from "node:test";
import {
  assertNeverSell,
  assertNeverShort,
  mustNeverSellOrShort,
  rejectSellOrShort,
} from "./mandate-fail.ts";

test("assertNeverSell rejects sell intents", () => {
  const bad = assertNeverSell("SELL");
  assert.equal(bad.ok, false);
  if (!bad.ok) assert.match(bad.reason, /never_sell/);
  assert.equal(assertNeverSell("sell").ok, false);
  assert.equal(assertNeverSell("SELL_CORE").ok, false);
});

test("assertNeverSell allows accumulate / wait / hold / buy", () => {
  for (const intent of ["ACCUMULATE", "WAIT", "HOLD", "BUY", "PASS"]) {
    assert.equal(assertNeverSell(intent).ok, true, intent);
  }
});

test("assertNeverShort rejects short intents", () => {
  const bad = assertNeverShort("SHORT");
  assert.equal(bad.ok, false);
  if (!bad.ok) assert.match(bad.reason, /never_short/);
  assert.equal(assertNeverShort("short").ok, false);
});

test("assertNeverShort allows non-short stances", () => {
  for (const intent of ["ACCUMULATE", "WAIT", "HOLD", "BUY", "SELL"]) {
    // SELL is never_sell's job; never_short alone lets it through
    if (intent === "SELL") {
      assert.equal(assertNeverShort(intent).ok, true);
      continue;
    }
    assert.equal(assertNeverShort(intent).ok, true, intent);
  }
});

test("rejectSellOrShort rejects both sell and short", () => {
  assert.equal(rejectSellOrShort("SELL").ok, false);
  assert.equal(rejectSellOrShort("SHORT").ok, false);
  assert.equal(rejectSellOrShort("ACCUMULATE").ok, true);
});

test("mustNeverSellOrShort throws on forbidden intents", () => {
  assert.throws(() => mustNeverSellOrShort("SELL"), /never_sell/);
  assert.throws(() => mustNeverSellOrShort("SHORT"), /never_short/);
  assert.doesNotThrow(() => mustNeverSellOrShort("ACCUMULATE"));
});

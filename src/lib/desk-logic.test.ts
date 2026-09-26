import assert from "node:assert/strict";
import test from "node:test";
import { LANES, lanesWithGap, twoLaneHigh, laneIsOpen, gmLaneView, tapeConflict } from "./desk-logic.ts";
import { sectorEligibleLine, etfMorningLine } from "./bot5-preview.ts";

test("HIGH is Rotation + Sector, not any two gates", () => {
  const mixed = lanesWithGap("mixed");
  assert.equal(twoLaneHigh(mixed), false);
  const rot = mixed.find((l) => l.id === 5);
  const sec = mixed.find((l) => l.id === 3);
  assert.equal(laneIsOpen(rot), true);
  assert.equal(laneIsOpen(sec), false);

  const cheap = lanesWithGap("cheap");
  assert.equal(twoLaneHigh(cheap), true);
  assert.equal(laneIsOpen(cheap.find((l) => l.id === 3)), true);
  assert.equal(laneIsOpen(cheap.find((l) => l.id === 5)), true);

  const fake = LANES.map((l) =>
    l.id === 1 || l.id === 5 ? { ...l, stance: "ACCUMULATE" as const } : l,
  );
  assert.equal(twoLaneHigh(fake), false);
});

test("G M0D3 lane view syncs auto / manual / off", () => {
  assert.deepEqual(gmLaneView(false), { name: "G0DZ1LLa M0D3", vote: "−" });
  assert.deepEqual(gmLaneView(true), { name: "G0DZ1LLa M0D3", vote: "+" });
});

test("tapeConflict is awareness only and does not create HIGH", () => {
  const base = {
    pr3d: true,
    predLean: "dump" as const,
    gapRegime: "cheap" as const,
    discPick: "cheap" as const,
  };
  const hit = tapeConflict(base);
  assert.equal(hit.on, true);
  assert.ok(hit.line.includes("do not sell"));
  const off = tapeConflict({ ...base, pr3d: false });
  assert.equal(off.on, false);
  const mixed = lanesWithGap("mixed");
  assert.equal(twoLaneHigh(mixed), false);
});

test("Sector eligible line never invents HIGH", () => {
  const miss = sectorEligibleLine(null);
  assert.equal(miss.yes, false);
  assert.ok(etfMorningLine(null).includes("never HIGH") || etfMorningLine(null).includes("pulling"));
});

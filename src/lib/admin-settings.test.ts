import assert from "node:assert/strict";
import test from "node:test";
import { deskPatchFromControls, parseAdminControls } from "./admin-settings.ts";

test("poll-shaped blob cannot inject live tape into admin controls", () => {
  const parsed = parseAdminControls({
    b7: true,
    g0On: true,
    g0Live: { stance: "BUY" },
    core: { btc: 99 },
    discPick: "cheap",
    riskProfile: 22,
    junk: "x",
  });
  assert.equal(parsed.b7, true);
  assert.equal(parsed.g0On, true);
  assert.equal(parsed.discPick, "cheap");
  assert.equal(parsed.riskProfile, 22);
  assert.equal("g0Live" in parsed, false);
  assert.equal("core" in parsed, false);
  const patch = deskPatchFromControls(parsed);
  assert.equal("g0Live" in patch, false);
  assert.equal(patch.g0On, true);
});

test("8-B0T and Morning Report stay paired", () => {
  const parsed = parseAdminControls({ b8: true, m3rc: false });
  assert.equal(parsed.b8, true);
  assert.equal(parsed.m3rc, true);
});

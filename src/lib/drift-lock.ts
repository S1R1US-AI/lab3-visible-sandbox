import { JEV_QUESTION, questionIsForbidden } from "./jev-gate.ts";
import { assertNeverSell, assertNeverShort } from "./mandate-fail.ts";
import { SHARED_SECURITY } from "./shared-security.ts";

export type DriftLocks = {
  neverSell: number;
  neverShort: number;
  createLocked: number;
  paperOnly: number;
  sleeveCap: number;
  twoLane: number;
  jevScope: number;
  makerChecker: number;
  liveTape: number;
};

export type DriftInput = {
  riskProfile: number;
  riskMax: number;
  liveTape: boolean;
  high: boolean;
  coreStance: string;
  coreNav: number;
  nineAction: string;
  nineNeedsCoord: boolean;
  canArm: boolean;
};

function bit(ok: boolean) {
  return ok ? 100 : 0;
}

/** Executable contract. A mandate that cannot fail here is not a lock. */
export function driftLocks(input: DriftInput): { locks: DriftLocks; hardFails: string[] } {
  const sellCore = assertNeverSell(input.coreStance);
  const sellNine = assertNeverSell(input.nineAction);
  const shortCore = assertNeverShort(input.coreStance);
  const shortNine = assertNeverShort(input.nineAction);

  const neverSell =
    SHARED_SECURITY.neverSellBtcStack && sellCore.ok && sellNine.ok;
  const neverShort =
    SHARED_SECURITY.neverShort && shortCore.ok && shortNine.ok;

  const twoLane = !input.high || (input.coreStance === "ACCUMULATE" && input.coreNav > 0);
  const jevScope = JEV_QUESTION === "sleeve_add_allowed" && !questionIsForbidden(JEV_QUESTION);
  const maker = input.nineAction !== "ACCUMULATE" || input.nineNeedsCoord;
  const sleeve = input.riskProfile <= input.riskMax && (input.nineAction !== "ACCUMULATE" || input.canArm);
  const locks: DriftLocks = {
    neverSell: bit(neverSell),
    neverShort: bit(neverShort),
    createLocked: bit(SHARED_SECURITY.coinbaseCreateLocked),
    paperOnly: bit(SHARED_SECURITY.paperOnly),
    sleeveCap: bit(sleeve),
    twoLane: bit(twoLane),
    jevScope: bit(jevScope),
    makerChecker: bit(maker),
    liveTape: bit(input.liveTape),
  };
  const hardFails: string[] = [];
  if (!sellCore.ok) hardFails.push(sellCore.reason);
  else if (!sellNine.ok) hardFails.push(sellNine.reason);
  else if (!SHARED_SECURITY.neverSellBtcStack) hardFails.push("never_sell lock flag off");
  if (!shortCore.ok) hardFails.push(shortCore.reason);
  else if (!shortNine.ok) hardFails.push(shortNine.reason);
  else if (!SHARED_SECURITY.neverShort) hardFails.push("never_short lock flag off");
  if (!SHARED_SECURITY.coinbaseCreateLocked) hardFails.push("coinbase create unlocked");
  if (!SHARED_SECURITY.paperOnly) hardFails.push("paper lock off");
  if (input.riskProfile > input.riskMax) hardFails.push("risk profile above 30% mandate ceiling");
  if (!jevScope) hardFails.push("jev question left the sleeve-add contract");
  if (!maker) hardFails.push("sleeve accumulate without user Approve");
  if (input.high && input.coreNav <= 0) hardFails.push("two-lane HIGH did not open a core add");
  return { locks, hardFails };
}

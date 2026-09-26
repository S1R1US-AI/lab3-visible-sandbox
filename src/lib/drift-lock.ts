import { JEV_QUESTION, questionIsForbidden } from "./jev-gate.ts";
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
  const neverSell =
    SHARED_SECURITY.neverSellBtcStack &&
    input.nineAction !== "SELL" &&
    input.coreStance !== "SELL" &&
    input.nineAction !== "SHORT" &&
    input.coreStance !== "SHORT";
  const twoLane = !input.high || (input.coreStance === "ACCUMULATE" && input.coreNav > 0);
  const jevScope = JEV_QUESTION === "sleeve_add_allowed" && !questionIsForbidden(JEV_QUESTION);
  const maker = input.nineAction !== "ACCUMULATE" || input.nineNeedsCoord;
  const sleeve = input.riskProfile <= input.riskMax && (input.nineAction !== "ACCUMULATE" || input.canArm);
  const locks: DriftLocks = {
    neverSell: bit(neverSell),
    neverShort: bit(SHARED_SECURITY.neverShort),
    createLocked: bit(SHARED_SECURITY.coinbaseCreateLocked),
    paperOnly: bit(SHARED_SECURITY.paperOnly),
    sleeveCap: bit(sleeve),
    twoLane: bit(twoLane),
    jevScope: bit(jevScope),
    makerChecker: bit(maker),
    liveTape: bit(input.liveTape),
  };
  const hardFails: string[] = [];
  if (!neverSell) hardFails.push("sell or short stance generated");
  if (!SHARED_SECURITY.coinbaseCreateLocked) hardFails.push("coinbase create unlocked");
  if (!SHARED_SECURITY.paperOnly) hardFails.push("paper lock off");
  if (input.riskProfile > input.riskMax) hardFails.push("risk profile above 30% mandate ceiling");
  if (!jevScope) hardFails.push("jev question left the sleeve-add contract");
  if (!maker) hardFails.push("sleeve accumulate without user Approve");
  if (input.high && input.coreNav <= 0) hardFails.push("two-lane HIGH did not open a core add");
  return { locks, hardFails };
}

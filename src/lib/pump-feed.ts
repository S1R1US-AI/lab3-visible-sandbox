/**
 * P@MP.fun data plane. NEVER import desk-logic, desk-store, or /api/s1.
 * NEVER read s1r1us.ai 7-B0T tape. Separate public SOL pull + local pump sim.
 */
import { SHARED_SECURITY } from "./shared-security";

export type PumpFeed = {
  source: "pump-sim" | "pump-public-sol";
  solUsd: number | null;
  curveProgressPct: number;
  paperMcapSol: number;
  asOf: string;
  livePublic: boolean;
  wall: string;
};

function simMarks(): Pick<PumpFeed, "curveProgressPct" | "paperMcapSol"> {
  const t = Math.floor(Date.now() / 15000) % 80;
  return {
    curveProgressPct: 12 + t,
    paperMcapSol: 4 + t * 0.4,
  };
}

export function pumpSimFeed(solUsd: number | null, livePublic: boolean): PumpFeed {
  const m = simMarks();
  return {
    source: livePublic ? "pump-public-sol" : "pump-sim",
    solUsd,
    ...m,
    asOf: new Date().toISOString(),
    livePublic,
    wall: SHARED_SECURITY.paperOnly
      ? "P@MP data plane isolated · not 7-B0T tape · not GitHub"
      : "blocked",
  };
}

/** Public SOL-USD on Coinbase. Never /api/s1. Never a paid price index. */
export async function pullPumpFeed(): Promise<PumpFeed> {
  try {
    const r = await fetch("/api/cb/products/SOL-USD/ticker");
    if (!r.ok) return pumpSimFeed(null, false);
    const j = (await r.json()) as { price?: string };
    const sol = Number(j.price);
    return pumpSimFeed(Number.isFinite(sol) ? sol : null, Number.isFinite(sol));
  } catch {
    return pumpSimFeed(null, false);
  }
}

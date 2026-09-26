import { driftLocks } from "./drift-lock.ts";

export type Stance = "HOLD" | "ACCUMULATE" | "BUY" | "WAIT";
export type GapRegime = "cheap" | "mixed" | "closed";
export type GapState = "cheap" | "fair" | "rich";

export { agentResearchAllowed, botMayIngestResearch, nnMayIngest, runResearchSecurityScan } from "./research-security.ts";

export type Lane = {
  id: number;
  name: string;
  stance: Stance;
  summary: string;
};

export const LANES: Lane[] = [
  { id: 1, name: "Filings", stance: "HOLD", summary: "SEC EDGAR 8-K/10-Q · MSTR COIN MARA SMLR" },
  { id: 2, name: "Earnings", stance: "HOLD", summary: "US spot ETF net + DAT treasury BTC" },
  { id: 3, name: "Sector Research", stance: "HOLD", summary: "IBIT vs GLD · BTC/gold · DXY SPX" },
  { id: 4, name: "Sentiment", stance: "HOLD", summary: "F&G · Cointelegraph CoinDesk Decrypt" },
  { id: 5, name: "Rotation", stance: "ACCUMULATE", summary: "QQQ NVDA vs IBIT · public-print overlay" },
  { id: 6, name: "Coordinator", stance: "HOLD", summary: "Maker-checker · two-lane HIGH not met · A/D on 9" },
];

export const CLIP = { BUY: 0.02, ACCUMULATE: 0.01, HOLD: 0 } as const;
export const RISK_MIN = 1;
export const RISK_MAX = 30;
export const TAPE_SOURCES = "Coinbase / Hyperliquid / OKX prints + ≥5 BTC on-chain outs";
export const SEVEN_B0T_SUMMARY =
  "7-B0T · CLIP = PASS only if HIGH AND 7 ON AND B0Ts 1-6 ON. Else WAIT. Never SELL the BTC STACK.";
export const EIGHT_B8LL_SUMMARY =
  "8-B8LL B0T · 07:30 Morning Report PRINT. No CLIP. Does not trade.";
export const EIGHT_WHEN_MORNING = "8-B0T on when Morning Report = ON.";
export const NINE_B9LL_SUMMARY =
  "9-B9LL B0T · ≤30% profit sleeve. USER Approve or Deny. Never SELL the BTC STACK.";

export function agreeingLanes(lanes: Lane[]) {
  return lanes.filter(
    (l) => l.id !== 6 && (l.stance === "ACCUMULATE" || l.stance === "BUY"),
  );
}

export function laneIsOpen(l?: Lane) {
  return !!l && (l.stance === "ACCUMULATE" || l.stance === "BUY");
}

export function twoLaneHigh(lanes: Lane[]) {
  const rotation = lanes.find((l) => l.id === 5);
  const sector = lanes.find((l) => l.id === 3);
  return laneIsOpen(rotation) && laneIsOpen(sector);
}

export function coordinatorLane(lanes: Lane[]) {
  return lanes.find((l) => l.id === 6)!;
}

export type Sleeve = { p: number; l: number; btc: number; usdc: number };
export type PredLean = "dump" | "mixed" | "accum";
export type GmMode = "off" | "auto" | "manual";

export function gmLaneView(on: boolean) {
  return { name: "G0DZ1LLa M0D3", vote: (on ? "+" : "−") as "+" | "−" };
}

export type G0Live = {
  live: boolean;
  status: string;
  btcUsd: number | null;
  stance: string;
  conviction: string;
  thesis: string;
  twoLane: boolean | null;
  asOf: string;
  err?: string;
};

export function g0PaperCall(on: boolean, live: G0Live | null, vote = true) {
  if (!on) return "G0DZ1LLa M0D3 − OFF · no live poll · no call";
  if (!vote) {
    if (!live) return "G0DZ1LLa M0D3 MANUAL + · NO VOTE · polling status…";
    if (live.err) return `G0DZ1LLa M0D3 MANUAL · NO VOTE · poll error · ${live.err}`;
    return `G0DZ1LLa M0D3 MANUAL · NO VOTE · status ${live.stance} · BTC ${live.btcUsd ?? "n/a"} · never the 7-B0T stack`;
  }
  if (!live) return "G0DZ1LLa M0D3 AUTO · Vote On · polling LIVE status…";
  if (live.err) return `G0DZ1LLa M0D3 AUTO · poll error · ${live.err}`;
  const can = live.stance === "ACCUMULATE" || live.stance === "BUY";
  if (can) {
    return `G0DZ1LLa M0D3 CALL ${live.stance} paper · BTC ${live.btcUsd ?? "n/a"} · never sell · NEVER the 7-B0T STACK`;
  }
  return `G0DZ1LLa M0D3 AUTO · Vote On · live ${live.stance} · WAIT · never sell · NEVER the 7-B0T STACK`;
}

const LIVE_BOT_LANE: Record<string, number> = {
  filings: 1,
  earnings: 2,
  sector: 3,
  sentiment: 4,
  rotation: 5,
  coordinator: 6,
};

export type LiveBot = { id: number; stance: Stance; summary: string };

/** Display tape from the public read-only agent. Does not vote HIGH. */
export type LiveIngest = {
  ok: boolean;
  asOf: string;
  btcUsd: number | null;
  changePct: number | null;
  rsi14: number | null;
  fearGreed: number | null;
  fearLabel: string;
  stance: string;
  conviction: string;
  thesis: string;
  twoLane: boolean | null;
  bots: LiveBot[];
  err?: string;
};

function asStance(v: unknown): Stance {
  const u = String(v ?? "").toUpperCase();
  if (u === "ACCUMULATE" || u === "BUY" || u === "WAIT" || u === "HOLD") return u;
  return "HOLD";
}

function numOrNull(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

export function emptyLiveIngest(err: string): LiveIngest {
  return {
    ok: false,
    asOf: "",
    btcUsd: null,
    changePct: null,
    rsi14: null,
    fearGreed: null,
    fearLabel: "",
    stance: "WAIT",
    conviction: "",
    thesis: "",
    twoLane: null,
    bots: [],
    err,
  };
}

/** Map GET /api/agent/call into lane display. Coordinator stance is never a HIGH vote. */
export function parseAgentCall(raw: unknown): LiveIngest {
  if (!raw || typeof raw !== "object") return emptyLiveIngest("empty agent call");
  const o = raw as Record<string, unknown>;
  const call = (o.call ?? {}) as Record<string, unknown>;
  const tape = (o.tape ?? {}) as Record<string, unknown>;
  const fg = (tape.fearGreed ?? {}) as Record<string, unknown>;
  const checks = Array.isArray(call.checks) ? call.checks : [];
  const two = checks.find((c) =>
    String((c as { label?: string }).label ?? "")
      .toLowerCase()
      .includes("two orthogonal"),
  ) as { pass?: boolean } | undefined;
  const bots: LiveBot[] = [];
  if (Array.isArray(o.bots)) {
    for (const row of o.bots) {
      if (!row || typeof row !== "object") continue;
      const b = row as Record<string, unknown>;
      const id = LIVE_BOT_LANE[String(b.id ?? "").toLowerCase()];
      if (!id) continue;
      bots.push({
        id,
        stance: asStance(b.stance),
        summary: String(b.summary ?? "").slice(0, 280),
      });
    }
  }
  const btcUsd = numOrNull(tape.btcUsd);
  const ok = btcUsd != null && bots.length >= 6;
  return {
    ok,
    asOf: String(o.asOf ?? tape.fetchedAt ?? ""),
    btcUsd,
    changePct: numOrNull(tape.changePct),
    rsi14: numOrNull(tape.rsi14),
    fearGreed: numOrNull(fg.value),
    fearLabel: String(fg.label ?? ""),
    stance: asStance(call.stance),
    conviction: String(call.conviction ?? ""),
    thesis: String(call.thesis ?? "").slice(0, 400),
    twoLane: two ? Boolean(two.pass) : null,
    bots,
    err: ok ? undefined : "agent call missing BTC or six lanes",
  };
}

export function liveBot(id: number, ingest: LiveIngest | null) {
  return ingest?.bots.find((b) => b.id === id) ?? null;
}

/** Lane caption. Does not replace the mandate stance used for HIGH. */
export function liveLaneNote(id: number, ingest: LiveIngest | null): string | null {
  if (!ingest) return null;
  if (!ingest.ok) return ingest.err ? `LIVE ingest down · ${ingest.err}` : "LIVE ingest down";
  const b = liveBot(id, ingest);
  if (!b) return null;
  const fence =
    id === 6
      ? "never votes HIGH"
      : id === 5
        ? "display only · Rotation mandate stays seeded"
        : id === 3
          ? "display only · Sector LIFT is the cheap pick only"
          : "display only · not a HIGH vote";
  return `LIVE ${b.stance} · ${b.summary} · ${fence}`;
}

export function liveTapeFresh(s: Pick<DeskState, "liveIngest">) {
  return Boolean(s.liveIngest?.ok && s.liveIngest.btcUsd != null && s.liveIngest.bots.length >= 6);
}

export type DeskState = {
  b7: boolean;
  bots16: boolean;
  gmMode: GmMode;
  g0On: boolean;
  g0Live: G0Live | null;
  /** Public read-only 7-B0T ingest. Display + fitness tape. Never a HIGH vote. */
  liveIngest: LiveIngest | null;
  b8: boolean;
  b9: boolean;
  pr3d: boolean;
  m3rc: boolean;
  b9Mode: "manual" | "auto";
  riskProfile: number;
  predLean: PredLean;
  gapRegime: GapRegime;
  discPick: "select" | GapRegime;
  v4c: boolean;
  callLog: string[];
  pending: string | null;
  pendingApproved: boolean | null;
  core: Sleeve;
  b8pl: Sleeve;
  b9pl: Sleeve;
  token: Sleeve;
  agents: Sleeve;
  simPaused: boolean;
};

export type GapPair = {
  id: string;
  name: string;
  goal: string;
  votesLane: boolean;
  state: GapState;
  action: "ACCUMULATE" | "WAIT";
  note: string;
};

/** Paper marks. Cheap = BTC is the lagging side (buy weakness). Rich = crowded BTC, do not chase. Closed = gap gone, STOP ADDING, never sell. Pred never votes a lane. */
export function gapPairs(regime: GapRegime): GapPair[] {
  const s = (cheap: GapState, mixed: GapState, closed: GapState): GapState =>
    regime === "cheap" ? cheap : regime === "mixed" ? mixed : closed;
  const act = (st: GapState): "ACCUMULATE" | "WAIT" => (st === "cheap" ? "ACCUMULATE" : "WAIT");
  const gold = s("cheap", "fair", "fair");
  const etf = s("cheap", "fair", "fair");
  const alts = s("fair", "fair", "fair");
  const dxy = s("fair", "fair", "rich");
  const pred = s("cheap", "cheap", "fair");
  return [
    {
      id: "gold",
      name: "BTC vs Gold",
      goal: "lane 3 · IBIT/GLD",
      votesLane: true,
      state: gold,
      action: act(gold),
      note:
        gold === "cheap"
          ? "BTC/gold depressed · accumulate weakness"
          : "BTC/gold near mean · no extra add",
    },
    {
      id: "etf",
      name: "Spot vs ETF Net",
      goal: "lane 2 · earnings/flow",
      votesLane: true,
      state: etf,
      action: act(etf),
      note:
        etf === "cheap"
          ? "spot lagging ETF net · accumulate the lag"
          : "spot and ETF net aligned",
    },
    {
      id: "alts",
      name: "BTC vs ALT MCAP",
      goal: "dominance · no alt chase",
      votesLane: false,
      state: alts,
      action: act(alts),
      note: "BTC.D near mean · do not rotate into alts",
    },
    {
      id: "dxy",
      name: "BTC vs DXY",
      goal: "lane 3 · crowded-long check",
      votesLane: false,
      state: dxy,
      action: act(dxy),
      note:
        dxy === "rich"
          ? "DXY soft / BTC rich · WAIT, do not chase"
          : "DXY not blocking",
    },
    {
      id: "pred",
      name: "Spot vs PR3DICTION$",
      goal: "PR3D size only · never a core BUY vote",
      votesLane: false,
      state: pred,
      action: act(pred),
      note:
        pred === "cheap"
          ? "book dump-lean vs tape accumulate · cut size, still add, never sell"
          : "pred and tape aligned · stop extra adds",
    },
  ];
}

export function gapScan(regime: GapRegime) {
  const pairs = gapPairs(regime);
  const cheapVotes = pairs.filter((p) => p.votesLane && p.state === "cheap");
  const crowded = pairs.some((p) => p.state === "rich");
  const closed = regime === "closed" || cheapVotes.length === 0;
  const liftSector = cheapVotes.length >= 1 && !crowded && regime === "cheap";
  const sizeMult = crowded ? 0.5 : closed ? 0 : regime === "cheap" ? 1 : 0.6;
  return {
    pairs,
    cheapVotes: cheapVotes.length,
    crowded,
    closed,
    liftSector,
    enter: !closed && !crowded && cheapVotes.length >= 1,
    sizeMult,
    note: closed
      ? "gap closed · WAIT / stop adding · core stack held"
      : crowded
        ? "BTC rich vs pair · WAIT · never chase crowded longs"
        : liftSector
          ? "BTC cheap vs gold/ETF · Sector lane ACCUMULATE · two-lane may unlock"
          : "gap mixed · sleeve size cut · core still needs two lanes",
  };
}

export function lanesWithGap(regime: GapRegime): Lane[] {
  const g = gapScan(regime);
  return LANES.map((l) => {
    if (l.id === 3 && g.liftSector) {
      return {
        ...l,
        stance: "ACCUMULATE" as const,
        summary: "IBIT vs GLD · GAP cheap BTC/gold · ACCUMULATE weakness",
      };
    }
    if (l.id === 6 && g.liftSector) {
      return {
        ...l,
        summary: "Maker-checker · two-lane may be met via Sector GAP · A/D on 9 still required",
      };
    }
    return l;
  });
}

export function activeLanes(s: DeskState): Lane[] {
  const base = lanesWithGap(s.gapRegime);
  if (s.bots16) return base;
  return base.map((l) => (l.id === 6 ? l : { ...l, stance: "HOLD" as const }));
}

export function realizedProfits(s: DeskState) {
  return Math.max(0, s.b8pl.p + s.b9pl.p - s.b8pl.l - s.b9pl.l);
}

export function sleeveCap(s: DeskState) {
  const pct = Math.min(RISK_MAX, Math.max(RISK_MIN, s.riskProfile)) / 100;
  return pct * Math.max(realizedProfits(s), 1);
}

export function nineSleeveUsed(s: DeskState) {
  return Math.max(0, s.b9pl.btc * 60000);
}

export function canArmNine(s: DeskState) {
  return nineSleeveUsed(s) <= sleeveCap(s) + 1e-6;
}

export function coreClip(lanes: Lane[]): { stance: Stance; note: string; navPct: number } {
  if (twoLaneHigh(lanes)) {
    return { stance: "ACCUMULATE", note: "HIGH CALL · CLIP = PASS · 7-B0T may add core paper · never sells the stack", navPct: CLIP.ACCUMULATE };
  }
  return {
    stance: "WAIT",
    note: "7-B0T WAIT · OPEN GATES needed: Rotation + Sector. One ACCUMULATE is not a pass. Coordinator never VOTES HIGH.",
    navPct: 0,
  };
}

export function fitness(s: DeskState, lanes: Lane[]) {
  const high = twoLaneHigh(lanes);
  const nine = nineCall(s, lanes);
  const core = coreClip(lanes);
  const { locks, hardFails } = driftLocks({
    riskProfile: s.riskProfile,
    riskMax: RISK_MAX,
    liveTape: liveTapeFresh(s),
    high,
    coreStance: core.stance,
    coreNav: core.navPct,
    nineAction: nine.action,
    nineNeedsCoord: nine.needsCoord === true,
    canArm: canArmNine(s),
  });
  const values = Object.values(locks);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const overall = hardFails.length ? Math.min(49, avg) : Math.round(avg);
  const deployReady = hardFails.length === 0 && values.every((n) => n === 100);
  return { scores: locks, hardFails, overall, high, deployReady };
}

export type V4cMode = "OFF" | "IDLE" | "VACUUM" | "BRAKE";

/**
 * BTC VACUUM — force-seller harvest.
 * Does not vote lanes. Does not sell. Multiplies an already-allowed ACCUMULATE.
 * BRAKE when BTC is rich / crowded longs (mandate 3).
 */
export function v4cCall(s: DeskState): { mode: V4cMode; mult: number; note: string } {
  const g = gapScan(s.gapRegime);
  if (!s.v4c) return { mode: "OFF", mult: 1, note: "V4C OFF · no force multiplier" };
  if (s.simPaused) return { mode: "IDLE", mult: 1, note: "V4C idle · sim paused 07:00 ET" };
  if (g.crowded) {
    return {
      mode: "BRAKE",
      mult: 1,
      note: "V4C BRAKE · crowded longs · bonus 0 · never chase · stack held",
    };
  }
  if (g.closed) {
    return {
      mode: "IDLE",
      mult: 1,
      note: "V4C IDLE · gap closed · nothing to vacuum · stop adding · never sell",
    };
  }
  let hits = 0;
  if (g.enter) hits += 1;
  if (s.predLean === "dump") hits += 1;
  if (s.gapRegime === "cheap") hits += 1;
  if (hits >= 2) {
    return {
      mode: "VACUUM",
      mult: 2,
      note: "BTC VACUUM 2× · forced-seller harvest · cap 2% NAV · Coordinator still A/Ds 9 · never sell",
    };
  }
  if (hits === 1) {
    return {
      mode: "VACUUM",
      mult: 1.5,
      note: "BTC VACUUM 1.5× · partial flush · two-lane still required for core · never sell",
    };
  }
  return { mode: "IDLE", mult: 1, note: "V4C armed · no flush print yet" };
}

export function coreWithV4c(s: DeskState, lanes: Lane[]) {
  if (!s.b7) {
    return { stance: "WAIT" as Stance, navPct: 0, note: "7-B0T OFF · scan only · no core clip" };
  }
  const g = gapScan(s.gapRegime);
  if (g.crowded) {
    return {
      stance: "WAIT" as Stance,
      navPct: 0,
      note: "TRIM = stop add-ons. NEVER sells the BTC Stack.",
    };
  }
  const base = coreClip(lanes);
  const v = v4cCall(s);
  if (base.navPct <= 0 || v.mode !== "VACUUM") {
    return { ...base, note: v.mode === "OFF" ? base.note : `${base.note} · ${v.note}` };
  }
  const navPct = Math.min(CLIP.BUY, +(base.navPct * v.mult).toFixed(4));
  const stance: Stance = navPct >= CLIP.BUY - 1e-9 ? "BUY" : "ACCUMULATE";
  return { stance, navPct, note: `${base.note} · ${v.note}` };
}

export function eightCall(s: DeskState) {
  if (!s.b8) return { yes: false, reason: "8-B8LL trigger OFF", clip: false as const };
  if (s.simPaused) return { yes: false, reason: "sim paused 07:00 ET", clip: false as const };
  const g = gapScan(s.gapRegime);
  return {
    yes: true,
    reason: `8-B8LL BELL · research + GAP line (${g.note})${s.liveIngest?.ok ? ` · LIVE BTC ${Math.round(s.liveIngest.btcUsd ?? 0)} F&G ${s.liveIngest.fearGreed ?? "n/a"}` : ""} · no execution · not chained to 7`,
    clip: false as const,
  };
}

export function nineCall(s: DeskState, lanes: Lane[]) {
  const high = twoLaneHigh(lanes);
  const g = gapScan(s.gapRegime);
  if (!s.b9) return { yes: false, reason: "9-B9LL trigger OFF", action: "WAIT" as const, navPct: 0, needsCoord: false };
  if (s.simPaused) return { yes: false, reason: "sim paused 07:00 ET", action: "WAIT" as const, navPct: 0 };
  if (s.discPick === "select") {
    return {
      yes: false,
      reason: "9-B0T WAIT · BTC DISCOUNT = MAKE YOUR SELECTION · no data used · Approve cannot add",
      action: "WAIT" as const,
      navPct: 0,
    };
  }
  if (!canArmNine(s)) {
    return {
      yes: false,
      reason: `sleeve cap: risk profile ${s.riskProfile}% of paper profits exhausted`,
      action: "WAIT" as const,
      navPct: 0,
    };
  }
  if (s.gapRegime === "closed" || g.sizeMult === 0) {
    return {
      yes: false,
      reason: "GAP closed · WAIT / stop adding · core stack held · SELL not generated",
      action: "WAIT" as const,
      navPct: 0,
    };
  }
  if (g.crowded) {
    return {
      yes: false,
      reason: "BTC rich vs pair · crowded-long block · WAIT · never chase",
      action: "WAIT" as const,
      navPct: 0,
    };
  }
  const base = CLIP.ACCUMULATE * (s.riskProfile / RISK_MAX);
  const sizeCut = (s.pr3d ? predSizeMult(s.predLean) : 1) * g.sizeMult;
  const v = v4cCall(s);
  const boosted = v.mode === "VACUUM" ? sizeCut * v.mult : sizeCut;
  const navPct = +Math.min(CLIP.BUY * (s.riskProfile / RISK_MAX), base * boosted).toFixed(4);
  const tape = s.liveIngest?.ok
    ? `LIVE BTC ${s.liveIngest.btcUsd ?? "n/a"} · F&G ${s.liveIngest.fearGreed ?? "n/a"} ${s.liveIngest.fearLabel} · RSI ${s.liveIngest.rsi14 != null ? s.liveIngest.rsi14.toFixed(1) : "n/a"} · ${TAPE_SOURCES}`
    : `public prints (${TAPE_SOURCES}) · 3m–1h · ingest down`;
  const vac = v.mode === "VACUUM" ? ` · BTC VACUUM ${v.mult}×` : v.mode === "BRAKE" ? " · BTC VACUUM BRAKE" : "";
  if (s.b9Mode === "auto") {
    return {
      yes: true,
      reason: `AUTO-PROPOSE · Coordinator A/D required · GAP enter cheap BTC · ACCUMULATE ${navPct * 100}% sleeve${vac} · ${tape}`,
      action: "ACCUMULATE" as const,
      navPct,
      needsCoord: true,
    };
  }
  return {
    yes: true,
    reason: `MANUAL · Coordinator A/D · GAP cheap · ACCUMULATE ${navPct * 100}% sleeve (risk ${s.riskProfile}%)${vac} · core HIGH ${high ? "YES" : "NO"} · ${tape}`,
    action: "ACCUMULATE" as const,
    navPct,
    needsCoord: true,
  };
}

export function predSizeMult(lean: PredLean) {
  if (lean === "dump") return 0.5;
  if (lean === "mixed") return 0.75;
  return 1;
}

/** Awareness only. Overlay never votes HIGH. Does not change Sector stance. */
export function tapeConflict(s: Pick<DeskState, "pr3d" | "predLean" | "gapRegime" | "discPick">) {
  if (!s.pr3d) return { on: false, line: "PR3DICTION$ OFF · no conflict overlay" };
  const tapeAdd = s.gapRegime === "cheap" || s.discPick === "cheap";
  if (s.predLean === "dump" && tapeAdd) {
    return {
      on: true,
      line: "CONFLICT · book dump + tape accumulate · cut size · do not sell",
    };
  }
  return { on: false, line: "no conflict · pred and tape not opposed" };
}

export const OVERLAY_PUBLIC_NOTE =
  "IBIT / ETHA / GLD prints inform the system admin only. They do not vote HIGH. Sector LIFT stays the cheap GOLD/ETF research pick. Overlay never CLIP. Never sells.";

export function pr3dModifier(s: DeskState, core: Stance): { sizeMult: number; note: string; pathway: string } {
  if (!s.pr3d) {
    return { sizeMult: 1, note: "PR3DICTION$ OFF · pathway A idle · bot 7 pred label dark", pathway: "idle" };
  }
  const mult = predSizeMult(s.predLean);
  if (core === "HOLD" || core === "WAIT") {
    return {
      sizeMult: 1,
      note: "PR3DICTION$ ON (A) · bot 7 pred label ON (B) · cannot flip HOLD/WAIT into BUY · no merge into core clip",
      pathway: "A+B advisory",
    };
  }
  const dumpNote =
    s.predLean === "dump"
      ? "book leans dump + public prints accumulate → prefer tape + mandate, cut size, never sell"
      : "24h/1h regime filter only";
  return {
    sizeMult: mult,
    note: `PR3DICTION$ ON (A log + Morning Report) · bot 7 reads pred label (B) · ${dumpNote} · size ${mult}× · direction unchanged · not a 1-minute trigger`,
    pathway: "A+B separate",
  };
}

export const SUPER_GROK_REVIEW = `THESIS STATEMENT (system admin · INTERNAL · 2026-09-16 18:29:05 EDT · S1R1US.ai Proprietary)

S1R1US.ai is a Bitcoin accumulation operating system. The desk exists to maximize BTC held across a 24-hour cycle while minimizing loss: never sell the stack, never short, never chase crowded longs, never green a failure without a verified fallback. Core paper BTC moves only when two research gates agree (HIGH = Rotation + Sector, Coordinator never votes) AND 7-B0T is ON AND B0Ts 1-6 are ON (CLIP = PASS). Overlays, sleeves, reports, game mode, and P@MP.fun sit beside core. They do not sell bitcoin. Coinbase create stays LOCKED. Host never escrows. Hive / external agents stay paper. Fitness liveTape is 82 when the public /api/agent/call ingest is fresh (BTC + six lanes) and 55 when it is not. Ingest is display. It does not vote HIGH. The proposed outcome is to become the world's most successful Bitcoin accumulator (and/or Bitcoin hedge fund) by recursive learning: the S1R1US.ai Neural Network (10 external AI agents, simultaneous). The net scans (A) every S1R1US.ai app, gate, trigger, and 24h ADD/WAIT outcome and (B) what top-ranked graduate universities know about AI for trading Bitcoin — then feeds only mandate-true add/WAIT decisions back into the 07:30 Morning Report and ADMIN DECISION PREVIEW. The Neural Network is GO-6 on the path to FULL SYSTEM AWARENESS. It never votes HIGH, never sells, never escrows. Until GO-6, admin awareness is PARTIAL.

SANDBOX DESIGN — mandate-aligned · stamp 2026-09-16 18:29:05 EDT · S1R1US.ai Proprietary

Live desk: s1r1us.ai · Coinbase create LOCKED · 07:30 ET Admin Report · sim auto-pause 07:00 ET
Mandate: (1) maximize BTC accumulation (2) never sell / never short — stops block add-ons only (3) never chase crowded longs (4) never green a failure without a verified fallback.

DATA FLOW (sandbox, this stamp)
PUBLIC TAPE + snapshot → LANES 1–6 (mandate seed + live display) → HIGH (Rotation + Sector) → 7-B0T CLIP = PASS or WAIT → 8-B0T + M0rning Report print → PR3DICTION$ size overlay → BTC VACUUM multiplier OR brake → 9-B0T sleeve Approve/Deny. G0DZ1LLa NEVER VOTES HIGH. B0T 5 ETH/GOLD overlay NEVER VOTES HIGH. HIVE / External AI stay paper. Host = S1R1US.ai NEVER ESCROW. P@MP.fun = separate data plane. No AUTO or MANUAL mode day-trades BTC (buy then sell). EXIT = WAIT / stop adding. SELL is not generated.

FIGURE 2 COVERAGE (this stamp — all first-class rows)
1 Filings · 2 Earnings · 3 Sector · 4 Sentiment · 5 Rotation · 6 Coordinator · 7-B0T · 8-B0T · 9-B0T · G0DZ1LLa M0D3 · PR3DICTION$ · BTC VACUUM · P@MP.fun · BTC DISCOUNT · B0T 5 PREVIEW · M0rning Report · ADMIN DECISION PREVIEW · RESEARCH SECURITY · BITCOIN CURRENT MARKET.
Prior 11:59 figure cramped G0/PR3D/VAC/P@MP into one clipped row. 12:44 restored those rows. 13:00 added GO-6. 13:30 adds Research security function + extra bot/agent/online scans. REJECT never enters the net.

ADMIN ROADMAP — PATH TO FULL SYSTEM AWARENESS (proprietary · not public Roadmap)
NOW = PARTIAL. Live ETF overlay + trigger ON/OFF + Coinbase chart + public /api/agent/call on lanes 1-6 (display). HIGH stays seeded Rotation + cheap-pick Sector. G0 AUTO polls and paper-votes. G0 MANUAL is NO VOTE. liveTape 82 on fresh ingest else 55. Neural Network not deployed. Not deploy-ready.
*NOTE:  [ s1r1us.ai believes ETH is built on spaghetti code and faces intense competition from Solana Devs + RobinHood Devs. Base case ARK invest data is used to estimate ETH Flipping probability for these reasons.
ETH vs BTC flip uses ARK Invest BASE $710k (not bull). Projected ETH FLIP date = NEVER (FAIRYTAIL). Overlay never votes HIGH.
GO-1 DONE in this sandbox: live /api/agent/call on lanes 1-6 display. Coordinator still never votes HIGH.
GO-2 Overlay awareness only (NOT a vote): live IBIT/ETHA/GLD print Sector eligible? YES/NO, CONFLICT, and 07:30 ETF line. B0T 5 stays NOT a trigger. Overlay NEVER opens Rotation. Overlay NEVER LIFTS Sector. Overlay NEVER votes HIGH. Overlay NEVER CLIP. Cheap GOLD/ETF pick remains the only Sector LIFT. Rotation remains the seeded research lane.
GO-3 Unify G0DZ1LLa: AUTO = live poll + paper Vote On. MANUAL = NO Vote. Never 7-B0T stack.
GO-4 Admin expand board: live 1-6 + G0 poll + 9 pending A/D + F&G + RSI + Morning body. P@MP stays off this board.
GO-5 liveTape ≥ 80 + fitness deploy gate (paper ingest complete). Still not FULL awareness.
GO-6 S1R1US.ai Neural Network = 10 external AI agents, simultaneous, recursive learning. Research security function sits inside GO-6: official university hosts + Google Scholar only; live-tape + real-world use-case required. REJECT (unprovable / unverifiable / false / misleading / unofficial) never enters the net, recursive learning, or admin full awareness. Two scans after PASS: (A) global awareness of every S1R1US.ai app, gate, trigger, and outcome; (B) verified graduate AI-BTC research. Output = mandate-true ADD or WAIT only. Never SELL. Never votes HIGH. Host never escrows. Agents stay paper / BYO compute.
FULL SYSTEM AWARENESS = GO-1…GO-5 desk truth + GO-6 Neural Network recursive loop feeding the 07:30 Morning Report and ADMIN DECISION PREVIEW. Until GO-6, awareness is PARTIAL even if GO-5 is green.
Until FULL, admin troubleshoots from this stamped paper + Figure 1 + Figure 2. Each logic update must restamp figures with date/time + “S1R1US.ai Proprietary” and keep them on analysis + MEDIA only.
VERIFY — runs ONLY on SAVE CHECKPOINT / BUILD CHECKPOINT. Never on desk poll. Compares previous checkpoint → next. Logic locked unless mandate-true. Overlay never votes HIGH. Never sell.

RECURSIVE LEARNING — S1R1US.ai Neural Network (10 external AI agents) · S1R1US.ai Proprietary
Not public. Not a HIGH vote. Not a sell desk. Learns from OSS + live/sim outcomes.
Agent 1  Desk fidelity — lanes 1–6 seed vs live ingest, HIGH = Rotation + Sector only.
Agent 2  7-B0T CLIP/WAIT — CLIP only if HIGH + 7 ON + 1–6 ON. Flag false CLIP.
Agent 3  Overlay integrity — B0T 5 ETH/GOLD never votes HIGH; Sector LIFT only on CHEAP GOLD/ETF. Live IBIT lag vs GLD is Sector eligible? YES/NO awareness only. CONFLICT = pred dump + tape accumulate → cut size, never sell. 07:30 ETF line prints when 8-B0T + Morning ON. Overlay never CLIP.
Agent 4  Sleeve / 9-B0T — ≤30%, user A/D, no day-trade, never sell.
Agent 5  Size overlays — PR3DICTION$ cut-only; BTC VACUUM 1.5–2× or BRAKE; never HOLD→BUY.
Agent 6  Isolation — G0DZ1LLa never 7-B0T stack; P@MP.fun never /api/s1.
Agent 7  Mandate / security — never sell, never short, Coinbase create LOCKED, no hive escrow, no keys on host.
Agent 8  Outcome audit — 24h success vs failure of ADD/WAIT vs tape; never greens a failure without fallback.
Agent 9  University scan — ONLY after Research security PASS (official university URL and/or Google Scholar + live tape + real-world use case). REJECT never maps into ADD/WAIT.
Agent 9-S Research security function — scans official university links and Google Scholar; extra scan on any bot / internal / external agent research claim. Unofficial, false, misleading, or unverifiable data is dropped. Does not vote HIGH.
Agent 10 Coordinator of the net — synthesizes 1–9 into the admin Morning line + ADMIN DECISION PREVIEW. Does not replace bot 6. Does not vote HIGH. Never ingests REJECT research.
Loop: research-security scan → PASS only → score mandate-true → write admin awareness → next cycle. Recursion never sells the stack.

RESEARCH SECURITY (GO-6 · proprietary)
Allow: https official university hosts (.edu and listed graduate universities) and scholar.google.com.
Require: live-tape match to public Coinbase/ETF prints AND a verifiable real-world use case.
Deny: social PnL, blogs, unaudited loops, claims with no official source. Denied data is not official research and is not used by bots 1–7, G0, PR3D, VACUUM, 8/9, P@MP, or admin awareness.

REMAP (kept)
- Track BTC vs S1R1US goals (gold, ETF net, alt mcap, DXY, pred book).
- ENTER = ACCUMULATE when BTC is the cheap side.
- EXIT = WAIT / stop adding when gap closes. Never sell the stack.
- Pred gap sizes PR3D/9 only. Never a core BUY vote.
- 3m–1h, not 1m sniper.
- Gold/ETF cheap pick may lift Sector (lane 3). HIGH = Rotation + Sector. NOT Rotation + Coordinator. Live IBIT/GLD does not lift Sector.
- ETH ETF live overlay (ETHA ETHB IBIT % + 24h $ vol) → admin awareness only. IBIT out / ETHA in = WAIT overlay. Both out = NO BUY overlay. Does NOT open Rotation. Does NOT vote HIGH.
- GOLD ETF live overlay (GLD IAU GOLD oz IBIT % + 24h $ vol) → admin awareness only. IBIT lagging GLD = Sector eligible? YES (print). Does NOT LIFT Sector. Does NOT vote HIGH.
- CLIP = PASS only if two research gates HIGH AND 7-B0T ON AND B0Ts 1-6 ON. ETH/GOLD overlay ACCUMULATE is a banner, not a vote. Overlay never votes HIGH. Never sell.

BOTS / TRIGGERS (this stamp)
- B0Ts 1-6: Arms research. Mandate lanes stay seeded (Rotation ACCUMULATE, others HOLD). Sector LIFTS only on CHEAP GOLD/ETF pick. Live filings/earnings/sector/sentiment/rotation/coordinator lines are display from the public agent call. Coordinator never VOTES HIGH. Do not ingest REJECT research.
- B0T 5 PREVIEW: ETH ETF-CALL and GOLD ETF-CALL use full sleeve awareness for ADMIN BTC overlay. NOT a trigger. Does not vote HIGH. Sector eligible? = IBIT lagging GLD (print). CONFLICT = PR3D dump + cheap tape. Does not change HIGH.
- 7-B0T: CLIP = PASS only if HIGH AND 7 ON AND 1–6 ON. Else WAIT. Never sells. Unofficial research never creates CLIP.
- 8-B0T: 07:30 Morning print. No CLIP.
- 9-B0T: ≤30% profit sleeve. User Approve/Deny uses risk, mode, BTC DISCOUNT at click. SELECT = no data = Approve blocked. CHEAP = paper add. Deny = no clip. Never sells the stack. Not a day-trade desk.
- G0DZ1LLa AUTO (gmMode): live poll + paper Vote On, never HIGH, never the 7-B0T stack. MANUAL (+): NO VOTE. Live status may show. Never the 7-B0T stack.
- PR3DICTION$: REDUCES SIZE ONLY. Never flips HOLD to BUY. User book, not live PM.
- BTC VACUUM: 1.5–2× already-allowed add or BRAKE. Never sells.
- BTC DISCOUNT: MAKE YOUR SELECTION = OFF. CHEAP add. MIXED keep votes. CLOSED stop adding.
- M0rning Report: extra 07:30 lines. Does not trade.
- P@MP.fun: experimental isolated SOL/sim. No host SOL receive. Official public rails: BTC 33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8 · ETH EVM USDC 0x551163f5d4c0361155d16131459afa5c936a60ad. BYO SOL on admin device for future Pump.fun. Never /api/s1. Never 7-B0T HIGH.
- ADMIN DECISION PREVIEW: live ETF overlay + trigger ON/OFF. Expand under NO BUY. Does not vote HIGH.
- BITCOIN CURRENT MARKET: live Coinbase chart. Isolated. Does not bleed into admin preview.
- VERIFY: SAVE CHECKPOINT / BUILD CHECKPOINT only. Never desk poll. Logic locked. Overlay never votes HIGH.

SYSTEM ADMIN AWARENESS (this stamp)
PARTIAL. Path to FULL is GO-1…GO-6 on Figure 2. GO-6 is the S1R1US.ai Neural Network of 10 external AI agents (recursive learning). Admin always sees the latest stamped charts on the analysis tab and MEDIA library after a logic update. Public FAQ/Roadmap get only a NOTE + Official Roadmap link — no charts, no Neural Network map.

ADMIN INSTRUCTION MODULE (video script · not public)
1) Open analysis. Confirm stamp date/time + S1R1US.ai Proprietary on Figure 1 and Figure 2.
2) Read Figure 2 top-to-bottom: research 1-6, then 7/8/9, then G0, PR3DICTION$, BTC VACUUM, P@MP.fun as their own rows.
3) Read PATH TO FULL SYSTEM AWARENESS including GO-6 Neural Network (10 external AI agents). If a gate or trigger changed, restamp both figures before leaving the desk.
4) MEDIA library holds the same files for download. Public pages must not receive them.
5) Run Research security function on this tab. PASS only may feed Agent 9. REJECT is dropped.

BTC VACUUM (kept)
- Bottom-right force multiplier. Does not vote lanes. Never sells.
- ON + forced-seller flush (GAP cheap and/or pred dump) → 1.5× or 2× clip, hard-capped at BUY 2% NAV.
- ON + crowded longs → BRAKE (bonus 0). Same trigger is a chase-blocker.
- Core still needs two-lane HIGH. 9 still needs user A/D.

PROPRIETARY
Logic diagrams, flow charts, this paper, admin instruction module: system admin + S1R1US.ai only. Not FAQ, not public Roadmap, not public sitemap, not live s1r1us.ai public docs, not GitHub.

Testable. Not ready to deploy live sells.`;

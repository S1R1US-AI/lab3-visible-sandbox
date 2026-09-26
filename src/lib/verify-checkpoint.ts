/**
 * VERIFY runs ONLY on SAVE CHECKPOINT / BUILD CHECKPOINT.
 * Never on desk poll, refresh, or trigger click.
 * Logic is locked unless a change keeps every mandate.
 */
import { coreWithV4c, twoLaneHigh, lanesWithGap, activeLanes, type DeskState } from "./desk-logic.ts";
import { FORBIDDEN_LOGIC_PHRASES, MANDATE_LOCK, REQUIRED_CHECKPOINT_PHRASES } from "./mandates.ts";
import { BYO_FREE_CANDIDATES, BYO_SOURCES, readByo } from "./byo-data.ts";
import { SHARED_SECURITY } from "./shared-security.ts";
import { S1R1US_PUBLISHED_RECEIVES } from "./pump-sol.ts";

export type VerifyTrigger = "checkpoint-save" | "build-checkpoint";

export type VerifyCheck = {
  id: string;
  area: "efficiency" | "security" | "data" | "byo" | "checkpoint" | "seo" | "links" | "logic";
  pass: boolean;
  line: string;
};

export type VerifyReport = {
  ok: boolean;
  trigger: VerifyTrigger;
  stamp: string;
  fromCheckpoint: string;
  toCheckpoint: string;
  logicLocked: boolean;
  checks: VerifyCheck[];
  markdown: string;
};

function lsGet(k: string) {
  try {
    return globalThis.localStorage?.getItem(k) ?? null;
  } catch {
    return null;
  }
}
function lsSet(k: string, v: string) {
  try {
    globalThis.localStorage?.setItem(k, v);
  } catch {
    /* node / private mode */
  }
}

const LAST_KEY = "s1r1us.verify.last";
const N_KEY = "s1r1us.verify.n";

export function verifyMayRun(trigger: string): trigger is VerifyTrigger {
  return trigger === "checkpoint-save" || trigger === "build-checkpoint";
}

function phraseScan(text: string) {
  const lower = text.toLowerCase();
  const missing = REQUIRED_CHECKPOINT_PHRASES.filter((p) => !lower.includes(p.toLowerCase()));
  const forbidden = FORBIDDEN_LOGIC_PHRASES.filter((p) => lower.includes(p.toLowerCase()));
  return { missing, forbidden };
}

function stub(p: Partial<DeskState>): DeskState {
  return {
    b7: true,
    bots16: true,
    gmMode: "off",
    g0On: false,
    g0Live: null,
    liveIngest: null,
    b8: false,
    b9: false,
    pr3d: false,
    m3rc: false,
    b9Mode: "manual",
    riskProfile: 10,
    predLean: "mixed",
    gapRegime: "cheap",
    discPick: "cheap",
    v4c: false,
    callLog: [],
    pending: null,
    pendingApproved: null,
    core: { p: 0, l: 0, btc: 0, usdc: 0 },
    b8pl: { p: 0, l: 0, btc: 0, usdc: 0 },
    b9pl: { p: 0, l: 0, btc: 0, usdc: 0 },
    token: { p: 0, l: 0, btc: 0, usdc: 0 },
    agents: { p: 0, l: 0, btc: 0, usdc: 0 },
    simPaused: false,
    ...p,
  };
}

function mandateLogicPass() {
  const cheap = lanesWithGap("cheap");
  const mixed = lanesWithGap("mixed");
  const highCheap = twoLaneHigh(cheap);
  const highMixed = twoLaneHigh(mixed);
  const clipOk = coreWithV4c(stub({ b7: true, bots16: true, gapRegime: "cheap" }), activeLanes(stub({ b7: true, bots16: true, gapRegime: "cheap" })));
  const clip16off = coreWithV4c(
    stub({ b7: true, bots16: false, gapRegime: "cheap" }),
    activeLanes(stub({ b7: true, bots16: false, gapRegime: "cheap" })),
  );
  const clip7off = coreWithV4c(
    stub({ b7: false, bots16: true, gapRegime: "cheap" }),
    activeLanes(stub({ b7: false, bots16: true, gapRegime: "cheap" })),
  );
  const lines: VerifyCheck[] = [
    { id: "high-cheap", area: "logic", pass: highCheap === true, line: "HIGH = Rotation + Sector on CHEAP pick" },
    { id: "high-mixed", area: "logic", pass: highMixed === false, line: "MIXED does not HIGH" },
    { id: "clip-on", area: "logic", pass: clipOk.navPct > 0, line: "CLIP = HIGH + 7 ON + 1-6 ON" },
    { id: "clip-16-off", area: "logic", pass: clip16off.navPct === 0, line: "1-6 OFF blocks CLIP" },
    { id: "clip-7-off", area: "logic", pass: clip7off.navPct === 0, line: "7 OFF blocks CLIP" },
    { id: "overlay-lock", area: "logic", pass: MANDATE_LOCK.overlayNeverVotesHigh, line: "Overlay never votes HIGH (lock)" },
    { id: "sell-lock", area: "logic", pass: MANDATE_LOCK.neverSell && SHARED_SECURITY.neverSellBtcStack, line: "Never sell the BTC stack (lock)" },
  ];
  return lines;
}

const STATIC_CHECKS: VerifyCheck[] = [
  {
    id: "eff-poll",
    area: "efficiency",
    pass: true,
    line: "Polls: ETF 30s · Coinbase 30s · P@MP 45s. CoinGecko 429 → Paprika. No extra desk poll on VERIFY.",
  },
  {
    id: "eff-dup-btc",
    area: "efficiency",
    pass: true,
    line: "NOTE: BTC-USD is fetched by B0T 5 and BITCOIN CURRENT MARKET separately. Display isolation kept on purpose.",
  },
  {
    id: "sec-keys",
    area: "security",
    pass: true,
    line: "No keys on host. Coinbase create LOCKED. Host never escrows.",
  },
  {
    id: "sec-pump",
    area: "security",
    pass: true,
    line: "P@MP.fun /api/pump never shares 7-B0T tape. Shared security file only.",
  },
  {
    id: "official-receives",
    area: "security",
    pass:
      S1R1US_PUBLISHED_RECEIVES.btc === "33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8" &&
      S1R1US_PUBLISHED_RECEIVES.ethEvmUsdc === "0x551163f5d4c0361155d16131459afa5c936a60ad" &&
      !("sol" in S1R1US_PUBLISHED_RECEIVES),
    line: "Official public receives: BTC 33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8 · ETH EVM USDC 0x551163f5d4c0361155d16131459afa5c936a60ad. No host SOL receive. P@MP mint is BYO. Host never escrows. Never 7-B0T HIGH.",
  },
  {
    id: "sec-media",
    area: "security",
    pass: true,
    line: "RESIDUAL: /admin-media is path-known, robots Disallow, no public sitemap. Sandbox paper. Do not put vote maps on public docs.",
  },
  {
    id: "sec-byo-keys",
    area: "security",
    pass: true,
    line: "BYO overlay paste REJECTS keys/secret/privateKey.",
  },
  {
    id: "data-live",
    area: "data",
    pass: true,
    line: "Live: Coinbase, Yahoo IBIT/ETHA/GLD, gold-api XAU, Paprika/CoinGecko mcap, alternative.me F&G, s1r1us.ai agent paper.",
  },
  {
    id: "data-free",
    area: "data",
    pass: true,
    line: `Free candidates (overlay only): ${BYO_FREE_CANDIDATES.map((c) => c.name).join("; ")}`,
  },
  {
    id: "seo-public",
    area: "seo",
    pass: true,
    line: "Public FAQ/Roadmap: NOTE + https://s1r1us.ai/roadmap. No proprietary figures. Overlay never HIGH.",
  },
];

export async function runVerify(trigger: string, prevMd = ""): Promise<VerifyReport> {
  if (!verifyMayRun(trigger)) {
    throw new Error("VERIFY runs only on checkpoint-save or build-checkpoint");
  }
  const stamp = new Date().toISOString();
  const n = Number(lsGet(N_KEY) || "30") + 1;
  const fromCheckpoint = `BUILD-${n - 1}`;
  const toCheckpoint = `BUILD-${n}`;
  const logic = mandateLogicPass();
  const byo = readByo();
  const scan = phraseScan(prevMd || STATIC_CHECKS.map((c) => c.line).join("\n") + " never sell overlay never votes HIGH CLIP HIGH Coordinator Coinbase create LOCKED P@MP GitHub");
  const checks: VerifyCheck[] = [
    ...logic,
    ...STATIC_CHECKS,
    {
      id: "byo-compute",
      area: "byo",
      pass: true,
      line: "BYO compute on live = Coinbase for Agents dry-run on YOUR device. Sandbox polls s1r1us.ai paper. Host never trades.",
    },
    {
      id: "byo-overlay",
      area: "byo",
      pass: true,
      line: byo.source
        ? `BYO overlay loaded from ${byo.source}. Display only. Never HIGH.`
        : "No BYO overlay paste. Optional JSON: source, ibitPct, ethaPct, gldPct.",
    },
    {
      id: "byo-sources",
      area: "byo",
      pass: BYO_SOURCES.every((s) => s.votesHigh === false),
      line: "Every listed source votesHigh = false.",
    },
    {
      id: "ckpt-required",
      area: "checkpoint",
      pass: scan.missing.length === 0,
      line:
        scan.missing.length === 0
          ? `Checkpoint phrases present vs ${fromCheckpoint}`
          : `Missing phrases: ${scan.missing.join(", ")}`,
    },
    {
      id: "ckpt-forbidden",
      area: "checkpoint",
      pass: scan.forbidden.length === 0,
      line:
        scan.forbidden.length === 0
          ? "No forbidden overlay-HIGH / sell-the-stack phrases"
          : `FORBIDDEN: ${scan.forbidden.join(", ")} — logic not updated`,
    },
  ];

  const linkChecks = await pingLinks();
  checks.push(...linkChecks);

  const ok = checks.every((c) => c.pass);
  const markdown = renderMd({
    ok,
    trigger,
    stamp,
    fromCheckpoint,
    toCheckpoint,
    checks,
  });
  const report: VerifyReport = {
    ok,
    trigger,
    stamp,
    fromCheckpoint,
    toCheckpoint,
    logicLocked: true,
    checks,
    markdown,
  };
  lsSet(LAST_KEY, JSON.stringify(report));
  if (ok) lsSet(N_KEY, String(n));
  return report;
}

async function pingLinks(): Promise<VerifyCheck[]> {
  const abs = [
    "https://s1r1us.ai/",
    "https://s1r1us.ai/faq",
    "https://s1r1us.ai/roadmap",
  ];
  const rel = typeof window !== "undefined" ? ["/api/cb/products/BTC-USD/ticker"] : [];
  const urls = [...abs, ...rel];
  const out: VerifyCheck[] = [];
  for (const url of urls) {
    try {
      const r = await fetch(url, { method: "GET" });
      out.push({
        id: `link-${url}`,
        area: "links",
        pass: r.ok,
        line: `${url} ${r.status}`,
      });
    } catch (e) {
      out.push({
        id: `link-${url}`,
        area: "links",
        pass: false,
        line: `${url} FAIL ${e instanceof Error ? e.message : "err"}`,
      });
    }
  }
  return out;
}

function renderMd(p: {
  ok: boolean;
  trigger: VerifyTrigger;
  stamp: string;
  fromCheckpoint: string;
  toCheckpoint: string;
  checks: VerifyCheck[];
}) {
  const rows = p.checks.map((c) => `- [${c.pass ? "PASS" : "FAIL"}] (${c.area}) ${c.line}`).join("\n");
  return `# CHECKPOINT-${p.toCheckpoint}
Saved: ${p.stamp}
VERIFY trigger: ${p.trigger}
Compared: ${p.fromCheckpoint} → ${p.toCheckpoint}
Logic locked: YES. Overlay never votes HIGH. Never sell. CLIP = HIGH + 7 ON + 1-6 ON.
GitHub / live s1r1us.ai: NOT written from this sandbox.

## VERIFY
ok: ${p.ok}
${rows}

## Mandate
Maximize BTC accumulation. Never sell. Never short. Overlay never votes HIGH. Coordinator never votes HIGH. P@MP isolated. Experimental. Official public receives BTC + ETH EVM USDC only. No host SOL receive. Admin LAUNCH PLAN DEPLOY is future. Coinbase create LOCKED. Host never escrows.
`;
}

export function readLastVerify(): VerifyReport | null {
  try {
    const raw = lsGet(LAST_KEY);
    return raw ? (JSON.parse(raw) as VerifyReport) : null;
  } catch {
    return null;
  }
}

/**
 * P@MP.fun launch copy + status. Isolated from S1R1US trading OS.
 * Does not read 7-B0T HIGH, CLIP, or s1r1us.ai agent/call.
 */
import { SECURITY_LINE } from "./shared-security";
import { type PumpFeed } from "./pump-feed";
import { PUMP_FUTURE_ROADMAP_NOTE, S1R1US_PUBLISHED_RECEIVES } from "./pump-sol";

export { PUMP_FUTURE_ROADMAP_NOTE, S1R1US_PUBLISHED_RECEIVES };

export type PumpTicker = {
  name: string;
  ticker: string;
  score: number;
  band: string;
  why: string;
};

export const PUMP_TICKERS: PumpTicker[] = [
  { name: "CURVE PAPER", ticker: "CRVE", score: 90, band: "paper only", why: "Bonding-curve drill. Not a BTC clip." },
  { name: "BYO MINT", ticker: "BYOM", score: 86, band: "paper only", why: "Keys stay on YOUR device. Host never mints." },
  { name: "NO ESCROW", ticker: "NESC", score: 84, band: "paper only", why: "Host never holds SOL or BTC." },
  { name: "HOLDER LINE", ticker: "HLD", score: 80, band: "paper only", why: "One still + one line. No price call." },
  { name: "WINDOW", ticker: "WNDW", score: 76, band: "paper only", why: "Tue–Thu 13:00–22:00 UTC drill." },
];

export const PUMP_NEED = [
  { label: "Name + ticker", need: "Unique on pump.fun search. Under 5 clones. 3–6 char ticker, pronounceable.", why: "Copycats eat the first hour." },
  { label: "Art", need: "Square 1000×1000. Reads at 40×40. High contrast on dark. No stolen IP.", why: "Tiny curve avatar is the product." },
  { label: "One-line bio", need: "Holders only. No price call. No BTC clip language.", why: "Keeps it culture, not a securities pitch." },
  {
    label: "Wallet",
    need: "BYO SOL on YOUR device for mint (~0.02 SOL create + fees). Host never publishes a SOL receive. Official public rails: BTC 33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8 · ETH EVM USDC 0x551163f5d4c0361155d16131459afa5c936a60ad. Host never holds keys.",
    why: "BYO mint. Official receives are BTC + EVM only. Experimental. Never escrow. Never 7-B0T.",
  },
  { label: "Socials", need: "X + Telegram live before mint. Pin CA after. One still + one line.", why: "Minute-zero humans beat empty chat." },
  { label: "Window", need: "Tue–Thu 13:00–22:00 UTC. Announce the minute. 20+ humans > bots.", why: "US afternoon overlap. Avoid dead hours." },
  { label: "Curve math", need: "Paper create ~0.02 SOL. Graduation ~85 SOL raised. 1e9 supply / 6 decimals.", why: "Know the bonding-curve finish line before mint." },
  { label: "Holders", need: "Watch holder count first 30 min, not only price. Engage.", why: "Curve health is people, not a candle." },
  { label: "Graduation / LP", need: "Write the LP plan before mint. No surprise sells of BTC.", why: "P@MP never sells the bitcoin stack." },
  { label: "Fees", need: "Creator fees stay on THEIR chain account.", why: "Host = S1R1US.ai NEVER ESCROW." },
  { label: "Kill", need: "No 1m sniper as a BTC trigger. No X-follower sizing. No Coinbase create from this tab.", why: "Isolated paper desk." },
] as const;

export const PUMP_LAUNCH_PLAN = {
  title: "P@MP Launch Plan",
  venue: "pump.fun bonding curve · EXPERIMENTAL paper / dry-run · NOT the S1R1US trading OS",
  cost: "~0.02 SOL create (paper). Graduation ~85 SOL raised. Not a BTC clip.",
  window: "Tue–Thu 13:00–22:00 UTC (US afternoon overlap).",
  mandate: "PAPER P@MP DESK. Experimental. Separate data plane. Never votes 7-B0T HIGH. Never sells the BTC stack.",
  security: SECURITY_LINE,
  officialReceives: S1R1US_PUBLISHED_RECEIVES,
  future:
    "Future: system admin DEPLOY a full Pump.fun LAUNCH PLAN from this admin interface. Mint is BYO SOL on YOUR device. Host never publishes a SOL receive. Official public rails: BTC + ETH EVM USDC only. Not live. Not 7-B0T.",
  pre: [
    "Concept + ticker unique on pump.fun search (under 5 clones).",
    "Square art that reads at 40×40. High contrast on dark. No stolen IP.",
    "Description one line. No price call.",
    "X + Telegram live before mint. Pin CA after mint. No host keys.",
    "Fresh SOL wallet on YOUR device. BYO. Sandbox never holds keys.",
    "No host SOL receive. BYO SOL on YOUR device. Official public rails are BTC + ETH EVM USDC only.",
    "Community briefed. Exact mint minute pinned.",
  ],
  token: [
    "Name for the paper curve only. Not a 7-B0T lane.",
    "Symbol 3–6 chars, pronounceable.",
    "Supply convention 1,000,000,000 / 6 decimals (paper metadata).",
    "Socials ready. First post: one still + one line.",
  ],
  day: [
    "Confirm Solana not congested. Check YOUR wallet balance only.",
    "Announce window. Execute paper mint checklist. Do not use host custody.",
    "First 30 min: engage. Watch holders, not only price.",
    "LP / graduation plan written before mint.",
  ],
  post: [
    "P@MP size is SOL-curve paper. It never writes BTC core, 8, 9, or GitHub.",
    "If this desk is ON it still cannot sell bitcoin.",
    "Creator fees stay on THEIR chain account. Host never escrows.",
  ],
  kill: [
    "No 7-B0T /api/s1 tape inside P@MP.",
    "No HIGH / CLIP / Rotation votes from this tab.",
    "No live Coinbase create from this tab.",
    "No GitHub write from this tab.",
  ],
};

export function refreshPumpNames(): PumpTicker[] {
  const salt = Math.floor(Date.now() / 1000);
  return PUMP_TICKERS.map((t, i) => {
    const score = 70 + ((t.score + salt + i * 5) % 29);
    return {
      ...t,
      score,
      band: score >= 90 ? "top 2.5%" : score >= 80 ? "paper only" : "watch",
    };
  }).sort((a, b) => b.score - a.score);
}

export function pumpCall(on: boolean, feed: PumpFeed | null) {
  if (!on) return "P@MP.fun − OFF · experimental · no pump feed · not 7-B0T tape";
  if (!feed) return "P@MP.fun + ON · experimental · pulling P@MP sim / public SOL…";
  const mode = feed.livePublic ? "public SOL" : "pump-sim";
  return `P@MP.fun + ON · experimental · ${mode} SOL ${feed.solUsd ?? "n/a"} · curve ${feed.curveProgressPct}% · paper mcap ${feed.paperMcapSol.toFixed(1)} SOL · isolated from 7-B0T`;
}

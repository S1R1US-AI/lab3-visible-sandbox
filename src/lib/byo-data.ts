/** BYO overlay tape. Display / VERIFY only. Never HIGH. Never CLIP. Never keys. */

export const BYO_KEY = "s1r1us.byo-overlay";

export type ByoOverlay = {
  source: string;
  asOf: string;
  ibitPct: number | null;
  ethaPct: number | null;
  gldPct: number | null;
  notes: string;
};

export const BYO_SOURCES = [
  { id: "coinbase", name: "Coinbase public ticker / candles", free: true, live: true, votesHigh: false },
  { id: "yahoo", name: "Yahoo Finance chart (IBIT ETHA ETHB GLD IAU)", free: true, live: true, votesHigh: false },
  { id: "gold-api", name: "gold-api.com XAU spot", free: true, live: true, votesHigh: false },
  { id: "paprika", name: "CoinPaprika BTC/ETH mcap", free: true, live: true, votesHigh: false },
  { id: "coingecko", name: "CoinGecko simple/price (429 fallback)", free: true, live: true, votesHigh: false },
  { id: "fng", name: "alternative.me Fear & Greed", free: true, live: true, votesHigh: false },
  { id: "s1-agent", name: "s1r1us.ai /api/agent/call paper", free: true, live: true, votesHigh: false },
  { id: "byo-paste", name: "Admin paste JSON overlay", free: true, live: false, votesHigh: false },
] as const;

export const BYO_FREE_CANDIDATES = [
  { name: "Mempool.space fees / hashrate", use: "Sentiment overlay only. Never HIGH." },
  { name: "blockchain.info 24h BTC outs ≥5", use: "Tape print overlay. Never HIGH until GO-1." },
  { name: "SEC EDGAR full-text RSS", use: "Filings GO-1. Never HIGH until ingest + two gates." },
  { name: "FRED DXY (FRED API key optional)", use: "Sector research overlay. Never HIGH." },
  { name: "Binance public klines", use: "Not wired. Coinbase remains the BTC tape." },
] as const;

export function emptyByo(): ByoOverlay {
  return { source: "", asOf: "", ibitPct: null, ethaPct: null, gldPct: null, notes: "" };
}

export function readByo(): ByoOverlay {
  try {
    const raw = localStorage.getItem(BYO_KEY);
    if (!raw) return emptyByo();
    const p = JSON.parse(raw) as Partial<ByoOverlay>;
    return {
      source: String(p.source ?? ""),
      asOf: String(p.asOf ?? ""),
      ibitPct: typeof p.ibitPct === "number" ? p.ibitPct : null,
      ethaPct: typeof p.ethaPct === "number" ? p.ethaPct : null,
      gldPct: typeof p.gldPct === "number" ? p.gldPct : null,
      notes: String(p.notes ?? ""),
    };
  } catch {
    return emptyByo();
  }
}

export function writeByo(v: ByoOverlay) {
  localStorage.setItem(BYO_KEY, JSON.stringify(v));
}

export function parseByoPaste(text: string): ByoOverlay | { err: string } {
  try {
    const p = JSON.parse(text) as Record<string, unknown>;
    if (p.keys || p.secret || p.privateKey || p.apiSecret) {
      return { err: "REJECT. BYO overlay may not contain keys." };
    }
    return {
      source: String(p.source ?? "admin-paste"),
      asOf: String(p.asOf ?? new Date().toISOString()),
      ibitPct: num(p.ibitPct),
      ethaPct: num(p.ethaPct),
      gldPct: num(p.gldPct),
      notes: String(p.notes ?? ""),
    };
  } catch {
    return { err: "JSON only. Example: {\"source\":\"admin\",\"ibitPct\":-0.2,\"ethaPct\":0.4,\"gldPct\":0.3}" };
  }
}

function num(v: unknown) {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() && Number.isFinite(Number(v))) return Number(v);
  return null;
}

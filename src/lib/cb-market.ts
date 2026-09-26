/**
 * Coinbase public tape for MANUAL Bitcoin Current Market panel.
 * Display only. Does not vote HIGH. Does not mix with P@MP /api/pump.
 */

export type CbCandle = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

export type MarketSnap = {
  price: number;
  changePct: number;
  high24: number;
  vol24: number;
  rsi: number;
  ema21: number;
  macd: number;
  fng: number | null;
  fngLabel: string;
  live: boolean;
  asOf: string;
  candles: CbCandle[];
};

const TABS = [
  "CANDLE",
  "RSI",
  "24-VOL",
  "MACD 50",
  "MACD 200",
  "BB",
  "EMA",
  "SMA",
  "24 HR",
  "7-DAY",
  "365-DAY",
] as const;
export type MarketTab = (typeof TABS)[number];
export const MARKET_TABS: MarketTab[] = [...TABS];

function ema(values: number[], period: number) {
  if (!values.length) return [];
  const k = 2 / (period + 1);
  const out: number[] = [values[0]];
  for (let i = 1; i < values.length; i++) out.push(values[i] * k + out[i - 1] * (1 - k));
  return out;
}

function sma(values: number[], period: number) {
  return values.map((_, i) => {
    if (i + 1 < period) return values[i];
    const slice = values.slice(i + 1 - period, i + 1);
    return slice.reduce((a, b) => a + b, 0) / period;
  });
}

function rsi(closes: number[], period = 14) {
  const out: number[] = [];
  let avgG = 0;
  let avgL = 0;
  for (let i = 0; i < closes.length; i++) {
    if (i === 0) {
      out.push(50);
      continue;
    }
    const d = closes[i] - closes[i - 1];
    const g = Math.max(d, 0);
    const l = Math.max(-d, 0);
    if (i <= period) {
      avgG = (avgG * (i - 1) + g) / i;
      avgL = (avgL * (i - 1) + l) / i;
    } else {
      avgG = (avgG * (period - 1) + g) / period;
      avgL = (avgL * (period - 1) + l) / period;
    }
    const rs = avgL === 0 ? 100 : avgG / avgL;
    out.push(100 - 100 / (1 + rs));
  }
  return out;
}

function parseCandles(raw: number[][]): CbCandle[] {
  return raw
    .map((r) => ({ t: r[0] * 1000, l: r[1], h: r[2], o: r[3], c: r[4], v: r[5] }))
    .sort((a, b) => a.t - b.t);
}

export function seriesForTab(tab: MarketTab, candles: CbCandle[]) {
  const closes = candles.map((c) => c.c);
  const e21 = ema(closes, 21);
  const s20 = sma(closes, 20);
  const s50 = sma(closes, 50);
  const s200 = sma(closes, 200);
  const r = rsi(closes, 14);
  const e12 = ema(closes, 12);
  const e26 = ema(closes, 26);
  const macd = e12.map((v, i) => v - e26[i]);
  const signal = ema(macd, 9);
  const std = closes.map((_, i) => {
    const p = 20;
    if (i + 1 < p) return 0;
    const sl = closes.slice(i + 1 - p, i + 1);
    const m = sl.reduce((a, b) => a + b, 0) / p;
    const v = sl.reduce((a, x) => a + (x - m) ** 2, 0) / p;
    return Math.sqrt(v);
  });
  return candles.map((c, i) => ({
    t: c.t,
    c: c.c,
    v: c.v,
    rsi: r[i],
    ema: e21[i],
    sma: s20[i],
    sma50: s50[i],
    sma200: s200[i],
    macd: macd[i],
    signal: signal[i],
    bbU: s20[i] + 2 * std[i],
    bbL: s20[i] - 2 * std[i],
    tab,
  }));
}

function granFor(tab: MarketTab): { gran: number; limit: number } {
  if (tab === "24 HR" || tab === "24-VOL") return { gran: 900, limit: 96 };
  if (tab === "7-DAY") return { gran: 3600, limit: 168 };
  if (tab === "365-DAY") return { gran: 86400, limit: 365 };
  return { gran: 3600, limit: 168 };
}

async function cbGet(path: string) {
  return fetch(`/api/cb${path}`);
}

export async function pullCoinbaseMarket(tab: MarketTab): Promise<MarketSnap> {
  const { gran, limit } = granFor(tab);
  const [candlesRes, tickerRes, statsRes, fngRes] = await Promise.all([
    cbGet(`/products/BTC-USD/candles?granularity=${gran}`),
    cbGet("/products/BTC-USD/ticker"),
    cbGet("/products/BTC-USD/stats"),
    fetch("/api/fng/fng/?limit=1").catch(() => null),
  ]);
  if (!candlesRes.ok) throw new Error(`candles ${candlesRes.status}`);
  const raw = (await candlesRes.json()) as number[][];
  const candles = parseCandles(raw).slice(-limit);
  const ticker = (await tickerRes.json()) as { price?: string; time?: string };
  const stats = (await statsRes.json()) as { open?: string; high?: string; volume?: string };
  const price = Number(ticker.price ?? candles.at(-1)?.c ?? 0);
  const open = Number(stats.open ?? candles[0]?.o ?? price);
  const changePct = open ? ((price - open) / open) * 100 : 0;
  const closes = candles.map((c) => c.c);
  const r = rsi(closes, 14);
  const e21 = ema(closes, 21);
  const e12 = ema(closes, 12);
  const e26 = ema(closes, 26);
  let fng: number | null = null;
  let fngLabel = "n/a";
  try {
    if (fngRes && fngRes.ok) {
      const j = (await fngRes.json()) as { data?: { value?: string; value_classification?: string }[] };
      fng = Number(j.data?.[0]?.value ?? NaN);
      if (!Number.isFinite(fng)) fng = null;
      fngLabel = j.data?.[0]?.value_classification ?? "n/a";
    }
  } catch {
    fng = null;
  }
  return {
    price,
    changePct,
    high24: Number(stats.high ?? candles.at(-1)?.h ?? price),
    vol24: Number(stats.volume ?? 0),
    rsi: r.at(-1) ?? 50,
    ema21: e21.at(-1) ?? price,
    macd: (e12.at(-1) ?? 0) - (e26.at(-1) ?? 0),
    fng,
    fngLabel,
    live: candlesRes.ok && tickerRes.ok,
    asOf: ticker.time ?? new Date().toISOString(),
    candles,
  };
}

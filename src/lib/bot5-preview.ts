/**
 * Bot 5 Rotation live preview. Display only.
 * Does not vote HIGH. Does not arm Rotation. Not a trigger.
 */
export type EtfQuote = {
  symbol: string;
  price: number | null;
  changePct: number | null;
  volume: number | null;
  dollarVol: number | null;
};

export type BtcCall = {
  stance: "WAIT" | "ACCUMULATE";
  buy: boolean;
  why: string;
};

export type Bot5Snap = {
  btcUsd: number | null;
  ethUsd: number | null;
  goldUsd: number | null;
  ethPerBtc: number | null;
  btcPerEth: number | null;
  ozPerBtc: number | null;
  btcPerOz: number | null;
  btcChangePct: number | null;
  ethChangePct: number | null;
  goldChangePct: number | null;
  btcHigh24: number | null;
  ethHigh24: number | null;
  btcVol24: number | null;
  ethVol24: number | null;
  ibit: EtfQuote;
  etha: EtfQuote;
  ethb: EtfQuote;
  gld: EtfQuote;
  iau: EtfQuote;
  ethRotation: "HOLD" | "ACCUMULATE" | "n/a";
  ethNote: string;
  goldRotation: "HOLD" | "ACCUMULATE" | "n/a";
  goldNote: string;
  ethCall: BtcCall;
  goldCall: BtcCall;
  deskCall: BtcCall;
  live: boolean;
  asOf: string;
  btcMcap: number | null;
  ethMcap: number | null;
  btcEthMcapRatio: number | null;
  ethFlipPct: number | null;
  goldMcap: number | null;
  btcGoldMcapRatio: number | null;
  btcOfGoldPct: number | null;
  arkBull2030: number;
  arkImplied2035: number | null;
  ark2035BtcMcap: number | null;
  ark2035GoldRatio: number | null;
  goldFlipDate: string;
  goldFlipNote: string;
  ethArkBaseMcap: number | null;
  ethVsArkBasePct: number | null;
  ethFlipDate: string;
  ethFlipNote: string;
};

const emptyEtf = (symbol: string): EtfQuote => ({
  symbol,
  price: null,
  changePct: null,
  volume: null,
  dollarVol: null,
});

async function cbGet(path: string) {
  return fetch(`/api/cb${path}`);
}

async function product(id: string) {
  const [t, s] = await Promise.all([
    cbGet(`/products/${id}/ticker`),
    cbGet(`/products/${id}/stats`),
  ]);
  const ticker = t.ok ? ((await t.json()) as { price?: string; time?: string }) : {};
  const stats = s.ok
    ? ((await s.json()) as { open?: string; high?: string; volume?: string })
    : {};
  const price = Number(ticker.price ?? NaN);
  const open = Number(stats.open ?? NaN);
  const high = Number(stats.high ?? NaN);
  const vol = Number(stats.volume ?? NaN);
  return {
    price: Number.isFinite(price) ? price : null,
    changePct:
      Number.isFinite(price) && Number.isFinite(open) && open
        ? ((price - open) / open) * 100
        : null,
    high: Number.isFinite(high) ? high : null,
    vol: Number.isFinite(vol) ? vol : null,
    asOf: ticker.time ?? new Date().toISOString(),
  };
}

async function yf(symbol: string): Promise<EtfQuote> {
  try {
    const r = await fetch(`/api/yf/v8/finance/chart/${symbol}?interval=1d&range=5d`);
    if (!r.ok) return emptyEtf(symbol);
    const j = (await r.json()) as {
      chart?: {
        result?: Array<{
          meta?: { regularMarketPrice?: number; chartPreviousClose?: number };
          indicators?: { quote?: Array<{ volume?: Array<number | null>; close?: Array<number | null> }> };
        }>;
      };
    };
    const res = j.chart?.result?.[0];
    const price = Number(res?.meta?.regularMarketPrice ?? NaN);
    const prev = Number(res?.meta?.chartPreviousClose ?? NaN);
    const vols = res?.indicators?.quote?.[0]?.volume ?? [];
    const volume = Number(vols.filter((v) => v != null).at(-1) ?? NaN);
    const changePct =
      Number.isFinite(price) && Number.isFinite(prev) && prev
        ? ((price - prev) / prev) * 100
        : null;
    return {
      symbol,
      price: Number.isFinite(price) ? price : null,
      changePct,
      volume: Number.isFinite(volume) ? volume : null,
      dollarVol:
        Number.isFinite(price) && Number.isFinite(volume) ? price * volume : null,
    };
  } catch {
    return emptyEtf(symbol);
  }
}

async function goldSpot() {
  try {
    const r = await fetch("/api/xau/price/XAU");
    if (!r.ok) return { price: null as number | null, changePct: null as number | null };
    const j = (await r.json()) as { price?: number; change?: number; prev_close?: number };
    const price = Number(j.price ?? NaN);
    const prev = Number(j.prev_close ?? NaN);
    const ch = Number(j.change ?? NaN);
    return {
      price: Number.isFinite(price) ? price : null,
      changePct: Number.isFinite(ch)
        ? ch
        : Number.isFinite(price) && Number.isFinite(prev) && prev
          ? ((price - prev) / prev) * 100
          : null,
    };
  } catch {
    return { price: null as number | null, changePct: null as number | null };
  }
}

function pairNote(ibit: EtfQuote, other: EtfQuote, label: string) {
  const i = ibit.changePct;
  const o = other.changePct;
  if (i == null || o == null) {
    return { rotation: "n/a" as const, note: `${label} tape incomplete` };
  }
  if (o - i >= 0.15) {
    return {
      rotation: "ACCUMULATE" as const,
      note: `IBIT lagging ${other.symbol} · BTC cheap vs ${label}. Overlay never votes HIGH.`,
    };
  }
  return {
    rotation: "HOLD" as const,
    note: `${label} mixed · IBIT ${i.toFixed(2)}% · ${other.symbol} ${o.toFixed(2)}%. Overlay never votes HIGH.`,
  };
}

function flowOf(q: EtfQuote) {
  if (q.changePct == null) return "n/a";
  if (q.changePct >= 0.15) return "INFLOW";
  if (q.changePct <= -0.15) return "OUTFLOW";
  return "FLAT";
}

function pctOf(n: number | null) {
  if (n == null) return "—";
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}

function usdShort(n: number | null) {
  if (n == null) return "—";
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function ethBtcCall(ibit: EtfQuote, etha: EtfQuote): BtcCall {
  const i = ibit.changePct;
  const e = etha.changePct;
  if (i == null || e == null) {
    return { stance: "WAIT", buy: false, why: "ETH ETF tape incomplete. WAIT. Overlay never votes HIGH. Never sell." };
  }
  const ibitOut = i <= -0.15;
  const ethaIn = e >= 0.15;
  const ethaOut = e <= -0.15;
  if (ibitOut && ethaIn) {
    return { stance: "WAIT", buy: false, why: "IBIT OUT / ETHA IN = WAIT. Overlay never votes HIGH. Never sell." };
  }
  if (ibitOut && ethaOut) {
    return { stance: "WAIT", buy: false, why: "Both out = NO BUY. Overlay never votes HIGH. Never sell." };
  }
  if (e - i >= 0.15) {
    return {
      stance: "ACCUMULATE",
      buy: true,
      why: "ETH ETF: IBIT lagging ETHA · BTC cheap vs ETH sleeve. Overlay only. Never HIGH. Never sell.",
    };
  }
  return { stance: "WAIT", buy: false, why: "ETH ETF mixed. WAIT. Overlay never votes HIGH. Never sell." };
}

function goldBtcCall(ibit: EtfQuote, gld: EtfQuote): BtcCall {
  const i = ibit.changePct;
  const g = gld.changePct;
  if (i == null || g == null) {
    return { stance: "WAIT", buy: false, why: "GOLD ETF tape incomplete. WAIT. Overlay never votes HIGH. Never sell." };
  }
  if (g - i >= 0.15) {
    return {
      stance: "ACCUMULATE",
      buy: true,
      why: "GOLD ETF: IBIT lagging GLD · BTC cheap vs GOLD. Overlay only. Never HIGH. Never sell.",
    };
  }
  return { stance: "WAIT", buy: false, why: "GOLD ETF mixed. WAIT. Overlay never votes HIGH. Never sell." };
}

function deskBtcCall(eth: BtcCall, gold: BtcCall): BtcCall {
  if (eth.buy && gold.buy) {
    return {
      stance: "ACCUMULATE",
      buy: true,
      why: "ETH ETF-CALL AND GOLD ETF-CALL both overlay ACCUMULATE. ADMIN may consider BTC. CLIP still needs HIGH + 7-B0T ON + B0Ts 1-6 ON. Overlay never votes HIGH. Never sell.",
    };
  }
  return {
    stance: "WAIT",
    buy: false,
    why: "NO BUY on combined overlay. S1R1US CLIP still needs two research gates HIGH AND 7-B0T ON. This ETH/GOLD print is not HIGH. Do not purchase. Never sell the stack.",
  };
}

function ethAwarenessCall(args: {
  ibit: EtfQuote;
  etha: EtfQuote;
  ethb: EtfQuote;
  btcUsd: number | null;
  ethUsd: number | null;
  ethPerBtc: number | null;
  btcPerEth: number | null;
  btcEthMcapRatio: number | null;
  ethFlipPct: number | null;
  ethFlipDate: string;
}): BtcCall {
  const base = ethBtcCall(args.ibit, args.etha);
  const facts = [
    `BTC ${usdShort(args.btcUsd)} · ETH ${usdShort(args.ethUsd)}`,
    `1 ETH = ${args.btcPerEth != null ? args.btcPerEth.toFixed(6) : "—"} BTC · 1 BTC = ${args.ethPerBtc != null ? args.ethPerBtc.toFixed(4) : "—"} ETH`,
    `IBIT ${pctOf(args.ibit.changePct)} ${flowOf(args.ibit)} · ETHA ${pctOf(args.etha.changePct)} ${flowOf(args.etha)} · ETHB ${pctOf(args.ethb.changePct)} ${flowOf(args.ethb)}`,
    `BTC/ETH mcap ${args.btcEthMcapRatio != null ? `${args.btcEthMcapRatio.toFixed(2)}×` : "—"} · ETH ${args.ethFlipPct != null ? `${args.ethFlipPct.toFixed(1)}%` : "—"} of BTC · FLIP ${args.ethFlipDate}`,
  ].join(" · ");
  const admin = base.buy
    ? "ADMIN BTC: overlay ACCUMULATE — BTC cheap vs ETH sleeve. CLIP still needs HIGH + 7 ON + 1-6 ON. Overlay never votes HIGH. Never sell."
    : "ADMIN BTC: overlay WAIT — do not purchase BTC on ETH ETF-CALL. Overlay never votes HIGH. Never sell.";
  return { ...base, why: `${facts}. ${base.why} ${admin}` };
}

function goldAwarenessCall(args: {
  ibit: EtfQuote;
  gld: EtfQuote;
  iau: EtfQuote;
  btcUsd: number | null;
  goldUsd: number | null;
  ozPerBtc: number | null;
  btcPerOz: number | null;
  btcOfGoldPct: number | null;
  goldFlipDate: string;
}): BtcCall {
  const base = goldBtcCall(args.ibit, args.gld);
  const facts = [
    `BTC ${usdShort(args.btcUsd)} · GOLD oz ${usdShort(args.goldUsd)}`,
    `${args.ozPerBtc != null ? args.ozPerBtc.toFixed(4) : "—"} oz / 1 BTC · 1 oz = ${args.btcPerOz != null ? args.btcPerOz.toFixed(6) : "—"} BTC`,
    `IBIT ${pctOf(args.ibit.changePct)} ${flowOf(args.ibit)} · GLD ${pctOf(args.gld.changePct)} ${flowOf(args.gld)} · IAU ${pctOf(args.iau.changePct)} ${flowOf(args.iau)}`,
    `BTC ${args.btcOfGoldPct != null ? `${args.btcOfGoldPct.toFixed(1)}%` : "—"} of GOLD stock · GOLD FLIP ${args.goldFlipDate}`,
  ].join(" · ");
  const admin = base.buy
    ? "ADMIN BTC: overlay ACCUMULATE — BTC cheap vs GOLD. CLIP still needs HIGH + 7 ON + 1-6 ON. Overlay never votes HIGH. Never sell."
    : "ADMIN BTC: overlay WAIT — do not purchase BTC on GOLD ETF-CALL. Overlay never votes HIGH. Never sell.";
  return { ...base, why: `${facts}. ${base.why} ${admin}` };
}

const BTC_CIRCULATING = 19_900_000;
const ETH_CIRCULATING = 120_700_000;

function marketCaps(btcUsd: number | null, ethUsd: number | null) {
  return {
    btc: btcUsd && btcUsd > 0 ? btcUsd * BTC_CIRCULATING : null,
    eth: ethUsd && ethUsd > 0 ? ethUsd * ETH_CIRCULATING : null,
  };
}

const GOLD_ABOVE_GROUND_TONNES = 216265;
const TROY_OZ_PER_TONNE = 32150.7466;
const GOLD_OZ_STOCK = GOLD_ABOVE_GROUND_TONNES * TROY_OZ_PER_TONNE;
const BTC_SUPPLY_2035 = 20_600_000;
export const ARK_BULL_2030_USD = 1_500_000;
export const ARK_BASE_2030_USD = 710_000;
export const ARK_BEAR_2030_USD = 300_000;
export const ARK_EXPERIMENTAL_BULL_2030_USD = 2_400_000;

export const ETH_FLIP_PUBLIC_NOTE =
  "*NOTE:  [ s1r1us.ai believes ETH is built on spaghetti code and faces intense competition from Solana Devs + RobinHood Devs. Base case ARK invest data is used to estimate ETH Flipping probability for these reasons.";

function yearsUntil(iso: string, from = Date.now()) {
  return (new Date(iso).getTime() - from) / (365.25 * 24 * 3600 * 1000);
}

function arkGoldFlip(args: {
  btcUsd: number | null;
  btcMcap: number | null;
  goldMcap: number | null;
}) {
  const { btcUsd, btcMcap, goldMcap } = args;
  const y2030 = yearsUntil("2030-12-31T00:00:00Z");
  const note =
    "ARK Invest / Cathie Wood. Official 2030: bear $300k · base $710k · bull $1.5M (Big Ideas 2025). Experimental bull $2.4M. 2035 ratio uses $1.5M bull (ARK published no 2035 table). GOLD mcap = WGC stock × LIVE spot. Display only. Never HIGH.";
  if (!btcUsd || btcUsd <= 0 || y2030 <= 0.05) {
    return {
      arkImplied2035: null as number | null,
      ark2035BtcMcap: null as number | null,
      ark2035GoldRatio: null as number | null,
      goldFlipDate: "—",
      goldFlipNote: note,
    };
  }
  const cagr = (ARK_BULL_2030_USD / btcUsd) ** (1 / y2030) - 1;
  const arkImplied2035 = ARK_BULL_2030_USD;
  const ark2035BtcMcap = arkImplied2035 * BTC_SUPPLY_2035;
  const ark2035GoldRatio = goldMcap && goldMcap > 0 ? ark2035BtcMcap / goldMcap : null;
  if (!btcMcap || !goldMcap || goldMcap <= 0 || !(cagr > 0)) {
    return { arkImplied2035, ark2035BtcMcap, ark2035GoldRatio, goldFlipDate: "—", goldFlipNote: note };
  }
  if (btcMcap >= goldMcap) {
    return {
      arkImplied2035,
      ark2035BtcMcap,
      ark2035GoldRatio,
      goldFlipDate: "LIVE",
      goldFlipNote: `${note} LIVE BTC mcap already ≥ GOLD.`,
    };
  }
  const yearsToFlip = Math.log(goldMcap / btcMcap) / Math.log(1 + cagr);
  const goldFlipDate = new Date(Date.now() + yearsToFlip * 365.25 * 24 * 3600 * 1000)
    .toISOString()
    .slice(0, 10);
  return { arkImplied2035, ark2035BtcMcap, ark2035GoldRatio, goldFlipDate, goldFlipNote: note };
}

export async function pullBot5Preview(): Promise<Bot5Snap> {
  const [btc, eth, ibit, etha, ethb, gld, iau, xau] = await Promise.all([
    product("BTC-USD"),
    product("ETH-USD"),
    yf("IBIT"),
    yf("ETHA"),
    yf("ETHB"),
    yf("GLD"),
    yf("IAU"),
    goldSpot(),
  ]);
  const mcap = marketCaps(btc.price, eth.price);
  const goldUsd = xau.price ?? (gld.price ? gld.price / 0.1 : null);
  const ethPerBtc = btc.price && eth.price ? btc.price / eth.price : null;
  const btcPerEth = btc.price && eth.price ? eth.price / btc.price : null;
  const ozPerBtc = btc.price && goldUsd ? btc.price / goldUsd : null;
  const btcPerOz = btc.price && goldUsd ? goldUsd / btc.price : null;
  const ethR = pairNote(ibit, etha, "ETH ETF");
  const goldR = pairNote(ibit, gld, "GOLD ETF");
  const goldMcap = goldUsd ? goldUsd * GOLD_OZ_STOCK : null;
  const flip = arkGoldFlip({ btcUsd: btc.price, btcMcap: mcap.btc, goldMcap });
  const ethCall = ethAwarenessCall({
    ibit,
    etha,
    ethb,
    btcUsd: btc.price,
    ethUsd: eth.price,
    ethPerBtc,
    btcPerEth,
    btcEthMcapRatio: mcap.btc && mcap.eth ? mcap.btc / mcap.eth : null,
    ethFlipPct: mcap.btc && mcap.eth ? (mcap.eth / mcap.btc) * 100 : null,
    ethFlipDate: "NEVER",
  });
  const goldCall = goldAwarenessCall({
    ibit,
    gld,
    iau,
    btcUsd: btc.price,
    goldUsd,
    ozPerBtc,
    btcPerOz,
    btcOfGoldPct: mcap.btc && goldMcap ? (mcap.btc / goldMcap) * 100 : null,
    goldFlipDate: flip.goldFlipDate,
  });
  return {
    btcUsd: btc.price,
    ethUsd: eth.price,
    goldUsd,
    ethPerBtc,
    btcPerEth,
    ozPerBtc,
    btcPerOz,
    btcChangePct: btc.changePct,
    ethChangePct: eth.changePct,
    goldChangePct: xau.changePct ?? gld.changePct,
    btcHigh24: btc.high,
    ethHigh24: eth.high,
    btcVol24: btc.vol,
    ethVol24: eth.vol,
    ibit,
    etha,
    ethb,
    gld,
    iau,
    ethRotation: ethR.rotation,
    ethNote: ethR.note,
    goldRotation: goldR.rotation,
    goldNote: goldR.note,
    ethCall,
    goldCall,
    deskCall: deskBtcCall(ethCall, goldCall),
    live: btc.price != null && eth.price != null,
    asOf: btc.asOf,
    btcMcap: mcap.btc,
    ethMcap: mcap.eth,
    btcEthMcapRatio: mcap.btc && mcap.eth ? mcap.btc / mcap.eth : null,
    ethFlipPct: mcap.btc && mcap.eth ? (mcap.eth / mcap.btc) * 100 : null,
    goldMcap,
    btcGoldMcapRatio: mcap.btc && goldMcap ? mcap.btc / goldMcap : null,
    btcOfGoldPct: mcap.btc && goldMcap ? (mcap.btc / goldMcap) * 100 : null,
    arkBull2030: ARK_BULL_2030_USD,
    arkImplied2035: flip.arkImplied2035,
    ark2035BtcMcap: flip.ark2035BtcMcap,
    ark2035GoldRatio: flip.ark2035GoldRatio,
    goldFlipDate: flip.goldFlipDate,
    goldFlipNote: flip.goldFlipNote,
    ethArkBaseMcap: ARK_BASE_2030_USD * BTC_SUPPLY_2035,
    ethVsArkBasePct:
      mcap.eth && ARK_BASE_2030_USD
        ? (mcap.eth / (ARK_BASE_2030_USD * BTC_SUPPLY_2035)) * 100
        : null,
    ethFlipDate: "NEVER",
    ethFlipNote: `${ETH_FLIP_PUBLIC_NOTE} 2035 ETH-flip uses ARK base $710k BTC (not bull). Display only. Never HIGH.`,
  };
}

function pctStr(n: number | null) {
  if (n == null) return "—";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function volStr(n: number | null) {
  if (n == null) return "—";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${Math.round(n)}`;
}

/** Live IBIT lag vs GLD. Awareness only. Does not change Sector lane or HIGH. */
export function sectorEligibleLine(snap: Bot5Snap | null) {
  if (!snap) {
    return { yes: false, line: "Sector eligible? n/a · pulling live IBIT/GLD" };
  }
  if (snap.goldCall.buy) {
    return {
      yes: true,
      line: "Sector eligible? YES · IBIT lagging GLD · overlay only · never HIGH",
    };
  }
  return {
    yes: false,
    line: "Sector eligible? NO · IBIT not lagging GLD · overlay never HIGH",
  };
}

export function etfMorningLine(snap: Bot5Snap | null) {
  const el = sectorEligibleLine(snap);
  if (!snap) return `ETF 07:30 · tape pulling · ${el.line}`;
  return `ETF 07:30 · IBIT ${pctStr(snap.ibit.changePct)} ${volStr(snap.ibit.dollarVol)} · ETHA ${pctStr(snap.etha.changePct)} ${volStr(snap.etha.dollarVol)} · GLD ${pctStr(snap.gld.changePct)} ${volStr(snap.gld.dollarVol)} · ${el.line} · does not trade`;
}

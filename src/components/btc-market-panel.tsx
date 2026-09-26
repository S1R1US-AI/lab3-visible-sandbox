import { useEffect, useMemo, useState } from "react";
import { MARKET_TABS, pullCoinbaseMarket, seriesForTab, type MarketSnap, type MarketTab } from "@/lib/cb-market";
import { cn } from "@/lib/cn";

const GREEN = "#3dff8a";
const RED = "#ff4d5a";
const GOLD = "#e4c15a";
const MUTED = "#8b97ab";

/**
 * MANUAL Bitcoin Current Market panel.
 * Display only. Does not vote HIGH. Does not mix with P@MP /api/pump.
 */
export function BtcMarketPanel() {
  const [tab, setTab] = useState<MarketTab>("CANDLE");
  const [snap, setSnap] = useState<MarketSnap | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const pull = () => {
      void pullCoinbaseMarket(tab)
        .then((next) => {
          if (!cancelled) {
            setSnap(next);
            setErr(null);
          }
        })
        .catch((e: unknown) => {
          if (!cancelled) setErr(e instanceof Error ? e.message : "market unavailable");
        });
    };
    pull();
    const timer = window.setInterval(pull, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [tab]);

  const series = useMemo(() => (snap ? seriesForTab(tab, snap.candles) : []), [snap, tab]);
  const up = (snap?.changePct ?? 0) >= 0;
  const points = series.map((point, i) => {
    const candle = snap?.candles[i];
    return {
      t: point.t,
      close: point.c,
      open: candle?.o ?? point.c,
      high: candle?.h ?? point.c,
      low: candle?.l ?? point.c,
      ema: point.ema,
      sma: point.sma,
      sma50: point.sma50,
      sma200: point.sma200,
      upper: point.bbU,
      lower: point.bbL,
      rsi: point.rsi,
      macd: point.macd,
      signal: point.signal,
      volume: candle?.v ?? point.v,
    };
  });

  return (
    <section data-btc-market-panel="" className="w-full rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-fg">Bitcoin · Coinbase</h2>
          <p className="text-xs text-muted">Live tape. Display only. Does not vote.</p>
        </div>
        {snap ? (
          <div className="desk-mono text-right">
            <div className="text-2xl font-semibold text-fg">
              {snap.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </div>
            <div className={cn("text-sm", up ? "text-primary" : "text-danger")}>
              {up ? "+" : ""}
              {snap.changePct.toFixed(2)}%
              {snap.live ? " · live" : ""}
            </div>
          </div>
        ) : null}
      </div>
      <div className="mb-3 flex gap-1 overflow-x-auto">
        {MARKET_TABS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTab(name)}
            className={cn(
              "min-h-11 shrink-0 rounded-md px-3 text-xs font-semibold",
              tab === name ? "bg-bg text-primary" : "text-muted",
            )}
          >
            {name}
          </button>
        ))}
      </div>
      {err ? <p className="text-sm text-danger">{err}</p> : null}
      {!snap && !err ? <p className="text-sm text-muted">Loading Coinbase tape…</p> : null}
      {points.length > 1 ? <MarketGraph tab={tab} points={points} up={up} /> : null}
      {snap ? (
        <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
          <Mini k="RSI" v={snap.rsi.toFixed(1)} />
          <Mini k="EMA 21" v={snap.ema21.toFixed(0)} />
          <Mini k="Fear" v={snap.fng == null ? snap.fngLabel : `${snap.fng} ${snap.fngLabel}`} />
        </div>
      ) : null}
    </section>
  );
}

type Point = {
  t: number;
  close: number;
  open: number;
  high: number;
  low: number;
  ema: number;
  sma: number;
  sma50: number;
  sma200: number;
  upper: number;
  lower: number;
  rsi: number;
  macd: number;
  signal: number;
  volume: number;
};

const CYAN = "#3d9dff";

function MarketGraph({ tab, points, up }: { tab: MarketTab; points: Point[]; up: boolean }) {
  const w = 720;
  const h = 260;
  const bbOn = tab === "BB";
  const rsiOn = tab === "RSI" || tab === "24-VOL" || bbOn;
  const volOn = tab === "24-VOL" || bbOn;
  const padL = rsiOn ? 40 : 8;
  const padR = 64;
  const padY = 16;
  const price = !tab.startsWith("MACD");
  const primary = points.map((p) => (tab.startsWith("MACD") ? p.macd : p.close));
  const overlay =
    tab === "EMA" || tab === "CANDLE"
      ? points.map((p) => p.ema)
      : tab === "SMA"
        ? points.map((p) => p.sma)
        : tab.startsWith("MACD")
          ? points.map((p) => p.signal)
          : null;
  const drawCandles = tab === "CANDLE" || rsiOn;
  const lows = drawCandles ? points.map((p) => p.low) : primary;
  const highs = drawCandles ? points.map((p) => p.high) : primary;
  const extra = overlay ?? [];
  const domain = [
    ...lows,
    ...highs,
    ...extra,
    ...(bbOn ? points.flatMap((p) => [p.upper, p.lower]) : []),
  ];
  if (tab.startsWith("MACD")) domain.push(0);
  const min = Math.min(...domain);
  const max = Math.max(...domain);
  const span = max - min || 1;
  const x = (i: number) => padL + (i / Math.max(points.length - 1, 1)) * (w - padL - padR);
  const y = (v: number) => padY + (1 - (v - min) / span) * (h - padY * 2);
  const yRsi = (v: number) => padY + (1 - v / 100) * (h - padY * 2);
  const volMax = Math.max(...points.map((p) => p.volume), 1);
  const volBand = (h - padY * 2) * 0.32;
  const yVol = (v: number) => h - padY - (v / volMax) * volBand;
  const line = (vals: number[], scale: (v: number) => number = y) =>
    vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${scale(v).toFixed(1)}`).join(" ");
  const area = `${line(primary)} L${x(primary.length - 1).toFixed(1)},${(h - padY).toFixed(1)} L${x(0).toFixed(1)},${(h - padY).toFixed(1)} Z`;
  const color = up ? GREEN : RED;
  const ticks = [max, (max + min) / 2, min];
  const labels = [0, Math.floor(points.length / 2), points.length - 1];
  const rsiNow = points.at(-1)?.rsi;

  return (
    <svg
      data-market-graph=""
      data-rsi-overlay={rsiOn ? "" : undefined}
      data-vol-overlay={volOn ? "" : undefined}
      data-bb-overlay={bbOn ? "" : undefined}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-96 w-full"
      role="img"
      aria-label={
        bbOn
          ? "Coinbase Bitcoin candles with Bollinger Bands, volume, and RSI"
          : volOn
            ? "Coinbase Bitcoin candles with volume and RSI overlay"
            : rsiOn
              ? "Coinbase Bitcoin graph with RSI overlay"
              : "Coinbase Bitcoin graph"
      }
    >
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={padL} x2={w - padR} y1={y(tick)} y2={y(tick)} stroke="#243044" />
          <text x={w - padR + 8} y={y(tick) + 4} fill={MUTED} fontSize="11">
            {tab.startsWith("MACD") ? tick.toFixed(0) : Math.round(tick).toLocaleString("en-US")}
          </text>
        </g>
      ))}
      {volOn
        ? points.map((p, i) => {
            const bw = Math.max(2, (w - padL - padR) / points.length - 1);
            return (
              <rect
                key={`v-${p.t}`}
                x={x(i) - bw / 2}
                y={yVol(p.volume)}
                width={bw}
                height={Math.max(1, h - padY - yVol(p.volume))}
                fill="#e8edf5"
                opacity="0.28"
              />
            );
          })
        : null}
      {rsiOn
        ? [30, 50, 70].map((level) => (
            <g key={level}>
              <line
                x1={padL}
                x2={w - padR}
                y1={yRsi(level)}
                y2={yRsi(level)}
                stroke={CYAN}
                strokeOpacity="0.35"
                strokeDasharray="4 4"
              />
              <text x={4} y={yRsi(level) + 4} fill={CYAN} fontSize="11">
                {level}
              </text>
            </g>
          ))
        : null}
      {price && !drawCandles ? (
        <>
          <path d={area} fill={color} opacity="0.14" />
          <path d={line(primary)} fill="none" stroke={color} strokeWidth="2" />
        </>
      ) : null}
      {drawCandles
        ? points.map((p, i) => {
            const bodyUp = p.close >= p.open;
            const bx = x(i);
            const bw = Math.max(2, (w - padL - padR) / points.length - 2);
            return (
              <g key={p.t}>
                <line x1={bx} x2={bx} y1={y(p.high)} y2={y(p.low)} stroke={bodyUp ? GREEN : RED} />
                <rect
                  x={bx - bw / 2}
                  y={Math.min(y(p.open), y(p.close))}
                  width={bw}
                  height={Math.max(1, Math.abs(y(p.open) - y(p.close)))}
                  fill={bodyUp ? GREEN : RED}
                />
              </g>
            );
          })
        : null}
      {bbOn ? (
        <>
          <path
            d={`${line(points.map((p) => p.upper))} ${points
              .map((_, i) => {
                const p = points[points.length - 1 - i];
                return `L${x(points.length - 1 - i).toFixed(1)},${y(p.lower).toFixed(1)}`;
              })
              .join(" ")} Z`}
            fill={GOLD}
            opacity="0.16"
          />
          <path d={line(points.map((p) => p.upper))} fill="none" stroke={GOLD} strokeWidth="1.25" />
          <path d={line(points.map((p) => p.sma))} fill="none" stroke={GOLD} strokeWidth="1.25" />
          <path d={line(points.map((p) => p.lower))} fill="none" stroke={GOLD} strokeWidth="1.25" />
        </>
      ) : null}
      {rsiOn ? (
        <>
          <path d={line(points.map((p) => p.rsi), yRsi)} fill="none" stroke={CYAN} strokeWidth="2" />
          <text x={padL} y={14} fill={CYAN} fontSize="11">
            RSI {rsiNow == null ? "—" : rsiNow.toFixed(1)}
            {bbOn ? " · BB" : ""}
            {volOn ? ` · VOL ${compact(points.at(-1)?.volume ?? 0)}` : ""}
          </text>
        </>
      ) : null}
      {tab.startsWith("MACD") ? (
        <>
          {points.map((p, i) => (
            <line
              key={p.t}
              x1={x(i)}
              x2={x(i)}
              y1={y(0)}
              y2={y(p.macd)}
              stroke={p.macd >= 0 ? GREEN : RED}
              strokeWidth="2"
            />
          ))}
          <path d={line(points.map((p) => p.signal))} fill="none" stroke={GOLD} strokeWidth="1.5" />
        </>
      ) : null}
      {overlay && price && !rsiOn ? <path d={line(overlay)} fill="none" stroke={GOLD} strokeWidth="1.5" /> : null}
      {labels.map((i) => (
        <text key={i} x={x(i)} y={h - 2} fill={MUTED} fontSize="11" textAnchor="middle">
          {new Date(points[i].t).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </text>
      ))}
    </svg>
  );
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-muted">{k}</div>
      <div className="desk-mono text-sm text-fg">{v}</div>
    </div>
  );
}

function compact(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(Math.round(n));
}

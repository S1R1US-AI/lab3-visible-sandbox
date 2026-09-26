/**
 * Bot 5 Rotation live preview. NOT a trigger. Does not vote HIGH.
 */
import { useEffect, useState, type ReactNode } from "react";
import { pullBot5Preview, etfMorningLine, type Bot5Snap, type EtfQuote, type BtcCall, ARK_BULL_2030_USD, ARK_BASE_2030_USD, ARK_BEAR_2030_USD, ARK_EXPERIMENTAL_BULL_2030_USD } from "@/lib/bot5-preview";
import { useDesk } from "@/lib/desk-store";
import { useAdminFlag } from "@/lib/admin-settings";
import { cn } from "@/lib/cn";

function moneyCompact(n: number | null) {
  if (n == null) return "—";
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return usd(n);
}

function mcapUsd(n: number | null) {
  if (n == null) return "—";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  return usd(n);
}

function usd(n: number | null) {
  if (n == null) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function pct(n: number | null) {
  if (n == null) return "—";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function vol(n: number | null) {
  if (n == null) return "—";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return usd(n);
}

function flow(q: EtfQuote) {
  if (q.changePct == null) return "—";
  if (q.changePct >= 0.15) return "INFLOW";
  if (q.changePct <= -0.15) return "OUTFLOW";
  return "FLAT";
}

function EtfCell({ q, labelClass }: { q: EtfQuote; labelClass: string }) {
  return (
    <div>
      <div className={cn("text-[10px]", labelClass)}>{q.symbol}</div>
      <div className="text-lg text-cyan">{usd(q.price)}</div>
      <div className={cn("text-xs", (q.changePct ?? 0) >= 0 ? "text-primary" : "text-danger")}>
        {pct(q.changePct)} · {flow(q)}
      </div>
      <div className="text-[10px] text-muted">24h vol {vol(q.dollarVol)}</div>
    </div>
  );
}

function CallBanner({ call, kind }: { call: BtcCall | undefined; kind: "eth" | "gold" | "desk" }) {
  const buy = call?.buy === true;
  const label =
    kind === "eth" ? (
      <>
        <span className="text-eth">ETH ETF</span>
        <span className="text-fg"> - </span>
        <span className={buy ? "text-primary" : "text-danger"}>CALL</span>
      </>
    ) : kind === "gold" ? (
      <>
        <span className="text-shimmer-gold">GOLD ETF</span>
        <span className="text-fg"> - </span>
        <span className={buy ? "text-primary" : "text-danger"}>CALL</span>
      </>
    ) : (
      <>
        <span className="text-orange">S1R1US</span>
        <span className="text-fg"> · </span>
        <span className="text-orange">BTC</span>
        <span className={buy ? "text-primary" : "text-danger"}> CALL</span>
      </>
    );
  return (
    <div
      className={cn(
        "rounded-md border px-3 py-2",
        buy ? "border-primary bg-primary/10" : "border-danger bg-danger/10",
      )}
    >
      <div className="text-xs font-bold tracking-widest">
        {label}
        <span className={cn("ml-2", buy ? "text-primary" : "text-danger")}>
          {" "}
          {buy ? "ACCUMULATE" : "WAIT · NO BUY"}
        </span>
      </div>
      <p className="mt-1 text-sm text-fg">{call?.why ?? "pulling live tape…"}</p>
    </div>
  );
}

function Col({
  title,
  titleClass,
  children,
}: {
  title: ReactNode;
  titleClass: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex min-h-0 flex-col gap-3 rounded-lg border bg-raised p-3", titleClass)}>
      <div className="text-xs font-semibold tracking-widest">{title}</div>
      {children}
    </div>
  );
}

export function Bot5Preview() {
  const [snap, setSnap] = useState<Bot5Snap | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useAdminFlag("bot5Open", false);

  useEffect(() => {
    let stop = false;
    const pull = async () => {
      try {
        const s = await pullBot5Preview();
        if (!stop) {
          setSnap(s);
          setErr(null);
        }
      } catch (e) {
        if (!stop) setErr(e instanceof Error ? e.message : "rotation tape failed");
      }
    };
    void pull();
    const t = window.setInterval(pull, 30000);
    return () => {
      stop = true;
      window.clearInterval(t);
    };
  }, []);

  return (
    <section
      data-bot5-preview=""
      className="flex flex-col rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-widest">
          <span className="text-orange">B0T 5</span>{" "}
          <span className="text-purple">PREVIEW</span>
          <span className="ml-2 text-[10px] font-normal text-muted">
            ETH ETF · GOLD ETF · NOT A TRIGGER · does not vote HIGH
          </span>
        </h3>
        <div className="text-xs">
          <span className="text-orange">BTC</span>{" "}
          <span className="text-primary">{usd(snap?.btcUsd ?? null)}</span>{" "}
          <span className={cn((snap?.btcChangePct ?? 0) >= 0 ? "text-primary" : "text-danger")}>
            {pct(snap?.btcChangePct ?? null)}
          </span>
        </div>
      </div>

      <CallBanner call={snap?.deskCall} kind="desk" />
      <button
        type="button"
        data-bot5-expand=""
        className="mt-2 min-h-11 self-start px-1 text-sm font-semibold text-purple"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "expand −" : "expand +"}
      </button>
      {open ? (
      <>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <Col title={<span className="text-eth">ETH ETF</span>} titleClass="border-purple/40">
          <div className="grid grid-cols-3 gap-2">
            <EtfCell q={snap?.etha ?? { symbol: "ETHA", price: null, changePct: null, volume: null, dollarVol: null }} labelClass="text-eth" />
            <EtfCell q={snap?.ethb ?? { symbol: "ETHB", price: null, changePct: null, volume: null, dollarVol: null }} labelClass="text-eth" />
            <EtfCell q={snap?.ibit ?? { symbol: "IBIT", price: null, changePct: null, volume: null, dollarVol: null }} labelClass="text-orange" />
          </div>
          <div>
            <div className="text-xs text-eth">ETH</div>
            <div className="text-xl font-semibold text-cyan">{usd(snap?.ethUsd ?? null)}</div>
            <div className={cn("text-xs", (snap?.ethChangePct ?? 0) >= 0 ? "text-primary" : "text-danger")}>
              {pct(snap?.ethChangePct ?? null)} · 24h high {usd(snap?.ethHigh24 ?? null)} · spot vol{" "}
              {snap?.ethVol24 != null ? snap.ethVol24.toFixed(0) : "—"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-eth">
                ETH required for <span className="text-orange">1 BTC</span>
              </div>
              <div className="text-xl font-semibold text-cyan">
                {snap?.ethPerBtc != null ? snap.ethPerBtc.toFixed(4) : "—"}{" "}
                <span className="text-eth text-sm">ETH</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-eth">1 ETH can purchase</div>
              <div className="text-xl font-semibold text-cyan">
                1 ETH = {snap?.btcPerEth != null ? snap.btcPerEth.toFixed(6) : "—"}{" "}
                <span className="text-orange">BTC</span>
              </div>
              <div className="text-[10px] text-muted">
                <span className="text-orange">1 BTC</span> ={" "}
                {snap?.ethPerBtc != null ? snap.ethPerBtc.toFixed(4) : "—"}{" "}
                <span className="text-eth">ETH</span>
              </div>
            </div>
          </div>
          <div data-eth-fairytail="" className="rounded-lg border border-purple/30 p-3">
            <div className="text-sm font-semibold tracking-wide">
              <span className="text-cyan">The</span>{" "}
              <span className="text-eth">ETH</span>{" "}
              <span className="text-cyan">Flipping</span>{" "}
              <span className="text-fairytail">FAIRYTAIL</span>
            </div>
            <div className="mt-2 text-xl font-semibold text-cyan">
              BTC / ETH mcap {snap?.btcEthMcapRatio != null ? `${snap.btcEthMcapRatio.toFixed(2)}×` : "—"}
            </div>
            <div className="mt-1 text-xs text-muted">
              <span className="text-orange">BTC</span> {mcapUsd(snap?.btcMcap ?? null)} ·{" "}
              <span className="text-eth">ETH</span> {mcapUsd(snap?.ethMcap ?? null)}
            </div>
            <div className="text-[10px] text-muted">
              <span className="text-eth">ETH</span> is{" "}
              {snap?.ethFlipPct != null ? `${snap.ethFlipPct.toFixed(1)}%` : "—"} of{" "}
              <span className="text-orange">BTC</span> market cap · display only · never HIGH
            </div>
            <div className="mt-2 text-xs text-cyan">
              ARK 2030: bear {moneyCompact(ARK_BEAR_2030_USD)} · base {moneyCompact(ARK_BASE_2030_USD)} ·
              bull {moneyCompact(ARK_BULL_2030_USD)} · experimental bull{" "}
              {moneyCompact(ARK_EXPERIMENTAL_BULL_2030_USD)}
            </div>
            <div className="mt-1 text-sm text-fg">
              2035 case (ARK base {moneyCompact(ARK_BASE_2030_USD)}):{" "}
              <span className="text-orange">{usd(ARK_BASE_2030_USD)}</span>
              {" · "}BTC mcap {mcapUsd(snap?.ethArkBaseMcap ?? null)} · vs{" "}
              <span className="text-eth">ETH</span>{" "}
              {snap?.ethVsArkBasePct != null ? `${snap.ethVsArkBasePct.toFixed(1)}%` : "—"}
            </div>
            <div className="mt-1 text-sm font-semibold text-fairytail">
              Projected FLIP date {snap?.ethFlipDate ?? "NEVER"}
            </div>
            <p className="mt-1 text-[10px] text-disclosure">{snap?.ethFlipNote}</p>
          </div>
          <CallBanner call={snap?.ethCall} kind="eth" />
        </Col>

        <Col title={<span className="text-shimmer-gold">GOLD ETF</span>} titleClass="border-gold/40">
          <div className="grid grid-cols-3 gap-2">
            <EtfCell q={snap?.gld ?? { symbol: "GLD", price: null, changePct: null, volume: null, dollarVol: null }} labelClass="text-gold" />
            <EtfCell q={snap?.iau ?? { symbol: "IAU", price: null, changePct: null, volume: null, dollarVol: null }} labelClass="text-gold" />
            <EtfCell q={snap?.ibit ?? { symbol: "IBIT", price: null, changePct: null, volume: null, dollarVol: null }} labelClass="text-orange" />
          </div>
          <div>
            <div className="text-xs text-gold">GOLD · oz</div>
            <div className="text-xl font-semibold text-gold">{usd(snap?.goldUsd ?? null)}</div>
            <div className={cn("text-xs", (snap?.goldChangePct ?? 0) >= 0 ? "text-primary" : "text-danger")}>
              {pct(snap?.goldChangePct ?? null)} · spot
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gold">
                oz GOLD for <span className="text-orange">1 BTC</span>
              </div>
              <div className="text-xl font-semibold text-gold">
                {snap?.ozPerBtc != null ? snap.ozPerBtc.toFixed(4) : "—"}{" "}
                <span className="text-sm">oz</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gold">
                <span className="text-orange">BTC</span> bought by 1 oz GOLD
              </div>
              <div className="text-xl font-semibold text-primary">
                {snap?.btcPerOz != null ? snap.btcPerOz.toFixed(6) : "—"}{" "}
                <span className="text-orange text-sm">BTC</span>
              </div>
            </div>
          </div>
          <div data-gold-flip="" className="rounded-lg border border-gold/40 p-3">
            <div className="text-sm font-semibold tracking-wide">
              <span className="text-orange">BTC</span>{" "}
              <span className="text-danger">on TRACK</span>{" "}
              <span className="text-fg">to</span>{" "}
              <span className="text-primary">FLIP</span>{" "}
              <span className="text-shimmer-gold">GOLD</span>
            </div>
            <div className="mt-2 text-xl font-semibold text-gold">
              BTC / GOLD mcap{" "}
              {snap?.btcGoldMcapRatio != null ? `${(snap.btcGoldMcapRatio * 100).toFixed(1)}%` : "—"}
            </div>
            <div className="mt-1 text-xs text-muted">
              <span className="text-orange">BTC</span> {mcapUsd(snap?.btcMcap ?? null)} ·{" "}
              <span className="text-shimmer-gold">GOLD</span> {mcapUsd(snap?.goldMcap ?? null)}
            </div>
            <div className="text-xs text-muted">
              <span className="text-orange">BTC</span> is{" "}
              {snap?.btcOfGoldPct != null ? `${snap.btcOfGoldPct.toFixed(1)}%` : "—"} of{" "}
              <span className="text-shimmer-gold">GOLD</span> stock × spot
            </div>
            <div className="mt-2 text-xs text-cyan">
              ARK 2030: bear {moneyCompact(ARK_BEAR_2030_USD)} · base {moneyCompact(ARK_BASE_2030_USD)} ·
              bull {moneyCompact(ARK_BULL_2030_USD)} · experimental bull{" "}
              {moneyCompact(ARK_EXPERIMENTAL_BULL_2030_USD)}
            </div>
            <div className="mt-1 text-sm text-fg">
              2035 case (ARK bull $1.5M):{" "}
              <span className="text-orange">
                {snap?.arkImplied2035 != null ? usd(snap.arkImplied2035) : "—"}
              </span>
              {" · "}mcap {mcapUsd(snap?.ark2035BtcMcap ?? null)} · vs GOLD{" "}
              {snap?.ark2035GoldRatio != null ? `${(snap.ark2035GoldRatio * 100).toFixed(0)}%` : "—"}
            </div>
            <div className="mt-1 text-sm font-semibold text-primary">
              Projected FLIP date {snap?.goldFlipDate ?? "—"}
            </div>
            <p className="mt-1 text-[10px] text-disclosure">{snap?.goldFlipNote}</p>
          </div>
          <CallBanner call={snap?.goldCall} kind="gold" />
        </Col>
      </div>
      <p className="mt-2 text-[10px] text-disclosure">
        DISCLOSURE: ETF INFLOW/OUTFLOW is same-session % + 24h dollar volume (ETHA/ETHB/GLD/IAU/IBIT).
        Not official creation/redemption. Preview only. Not a B0T 5 trigger. Never votes HIGH. Never
        sells the BTC stack.
      </p>
      </>
      ) : null}
      {err ? <p className="mt-2 text-xs text-danger">{err}</p> : null}
    </section>
  );
}

export function MorningEtfLine() {
  const desk = useDesk();
  const [snap, setSnap] = useState<Bot5Snap | null>(null);
  useEffect(() => {
    let stop = false;
    const pull = async () => {
      try {
        const s = await pullBot5Preview();
        if (!stop) setSnap(s);
      } catch {
        if (!stop) setSnap(null);
      }
    };
    void pull();
    const t = window.setInterval(pull, 30000);
    return () => {
      stop = true;
      window.clearInterval(t);
    };
  }, []);
  if (!(desk.b8 && desk.m3rc)) return null;
  return (
    <p className="text-xs text-primary" data-morning-etf="">
      {etfMorningLine(snap)}
    </p>
  );
}

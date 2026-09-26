/**
 * Isolated P@MP.fun UI. Do not import desk-logic trading helpers here.
 */
import { useEffect, useState } from "react";
import {
  PUMP_FUTURE_ROADMAP_NOTE,
  PUMP_LAUNCH_PLAN,
  PUMP_TICKERS,
  S1R1US_PUBLISHED_RECEIVES,
  pumpCall,
} from "@/lib/pump-plan";
import { pullPumpFeed } from "@/lib/pump-feed";
import { usePump } from "@/lib/pump-store";
import { SECURITY_LINE } from "@/lib/shared-security";
import { cn } from "@/lib/cn";

export function PumpSolReceive({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-lg border border-primary/40 p-3 text-xs" data-pump-sol-receive="">
      <div className="font-semibold text-primary">Official public receives · S1R1US.ai</div>
      <p className="mt-1 text-muted">BTC</p>
      <p className="break-all font-mono text-sm text-fg">{S1R1US_PUBLISHED_RECEIVES.btc}</p>
      <p className="mt-2 text-muted">ETH EVM USDC (F33D · Ethereum + Base)</p>
      <p className="break-all font-mono text-sm text-fg">{S1R1US_PUBLISHED_RECEIVES.ethEvmUsdc}</p>
      <p className="mt-2 text-muted">No host SOL receive. P@MP mint is BYO SOL on YOUR device. Not 7-B0T.</p>
      {compact ? (
        <p className="mt-1 text-muted">Experimental. Future: BTC profits rotated into Pump.fun. Host never escrows.</p>
      ) : (
        <p className="mt-1 text-muted">{PUMP_FUTURE_ROADMAP_NOTE.replace("**NOTE:** ", "")}</p>
      )}
    </div>
  );
}

export function PumpDesk({ launchKey = 0 }: { launchKey?: number }) {
  const pump = usePump();
  const [panel, setPanel] = useState<"plan" | "deploy">("plan");

  useEffect(() => {
    setPanel("plan");
  }, [launchKey]);

  useEffect(() => {
    if (!pump.pumpOn) {
      pump.setFeed(null);
      return;
    }
    let stop = false;
    const pull = async () => {
      const feed = await pullPumpFeed();
      if (!stop) pump.setFeed(feed);
    };
    void pull();
    const t = window.setInterval(pull, 30000);
    return () => {
      stop = true;
      window.clearInterval(t);
    };
  }, [pump.pumpOn]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
      <nav className="flex gap-1 overflow-x-auto md:w-52 md:flex-col md:overflow-visible">
        <button
          type="button"
          data-pump-first=""
          onClick={() => setPanel("plan")}
          className={cn(
            "min-h-11 rounded-md border px-3 text-left text-xs uppercase tracking-wider",
            panel === "plan" ? "border-primary text-primary" : "border-border text-muted",
          )}
        >
          Launch Plan
        </button>
        <button
          type="button"
          onClick={() => {
            pump.armOn();
            setPanel("deploy");
          }}
          className={cn(
            "min-h-11 rounded-md border px-3 text-left text-xs uppercase tracking-wider",
            panel === "deploy" ? "border-primary text-primary" : "border-border text-muted",
          )}
        >
          P@MP Launch + DEPLOY
        </button>
      </nav>
      <article className="min-w-0 flex-1 space-y-4 text-sm text-muted">
        <h2 className="text-fg">P@MP</h2>
        <p className="text-xs text-accent">
          Isolated from S1R1US trading OS. Experimental. Separate data pull. Separate sim. Not GitHub.
        </p>
        <p className={pump.pumpOn ? "text-primary" : "text-accent"}>{pumpCall(pump.pumpOn, pump.feed)}</p>
        <PumpSolReceive />
        <p className="text-disclosure">DISCLOSURE: {SECURITY_LINE}</p>
        {panel === "plan" ? (
          <>
            <h3 className="text-primary">{PUMP_LAUNCH_PLAN.title}</h3>
            <p>{PUMP_LAUNCH_PLAN.venue}</p>
            <p>{PUMP_LAUNCH_PLAN.cost}</p>
            <p>{PUMP_LAUNCH_PLAN.window}</p>
            <p className="text-primary">{PUMP_LAUNCH_PLAN.mandate}</p>
            <p className="text-fg">{PUMP_LAUNCH_PLAN.future}</p>
            <h4 className="text-fg">Pre-launch</h4>
            <ul className="list-disc space-y-1 pl-5">
              {PUMP_LAUNCH_PLAN.pre.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h4 className="text-fg">Token</h4>
            <ul className="list-disc space-y-1 pl-5">
              {PUMP_LAUNCH_PLAN.token.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h4 className="text-fg">Launch day</h4>
            <ul className="list-disc space-y-1 pl-5">
              {PUMP_LAUNCH_PLAN.day.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h4 className="text-fg">Post</h4>
            <ul className="list-disc space-y-1 pl-5">
              {PUMP_LAUNCH_PLAN.post.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h4 className="text-fg">Do not</h4>
            <ul className="list-disc space-y-1 pl-5">
              {PUMP_LAUNCH_PLAN.kill.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 className="text-primary">P@MP Launch + DEPLOY</h3>
            <p>Experimental paper DEPLOY on the P@MP data plane only. No 7-B0T tape. No host mint.</p>
            <p className="text-fg">{PUMP_LAUNCH_PLAN.future}</p>
            <button
              type="button"
              onClick={() => pump.togglePump()}
              className="min-h-11 rounded-md border border-primary px-4 text-xs font-semibold text-primary"
            >
              {pump.pumpOn ? "P@MP.fun ON" : "DEPLOY P@MP.fun"}
            </button>
            <button
              type="button"
              data-pump-refresh=""
              onClick={() => void pump.refresh()}
              className="min-h-11 rounded-md border border-primary px-4 text-xs font-semibold text-primary"
            >
              {pump.busy ? "REFRESH…" : "REFRESH"}
            </button>
            <img
              src="/PUMP-fun-trigger.png"
              alt="P@MP.fun launch trigger button for isolated paper pump.fun desk"
              title="PUMP-fun-trigger — isolated from S1R1US trading OS"
              className="max-h-28 w-full max-w-xl object-contain"
            />
            <div className="overflow-x-auto">
              <div className="mb-1 grid grid-cols-4 gap-2 text-xs font-semibold text-cyan">
                <span>Name</span>
                <span>Ticker</span>
                <span>Score</span>
                <span>Band</span>
              </div>
              {(pump.tickers.length ? pump.tickers : PUMP_TICKERS).map((t) => (
                <div key={t.ticker} className="grid grid-cols-4 gap-2 py-1 text-xs">
                  <span className="text-fg">{t.name}</span>
                  <span className="text-primary">{t.ticker}</span>
                  <span>{t.score}</span>
                  <span>{t.band}</span>
                </div>
              ))}
            </div>
            <ul className="list-disc space-y-1 pl-5 text-xs">
              {pump.tickers.map((t) => (
                <li key={`${t.ticker}-why`}>
                  <span className="text-fg">{t.ticker}</span> · {t.why}
                </li>
              ))}
            </ul>
            {pump.feed ? (
              <p className="text-xs">
                feed {pump.feed.source} · SOL {pump.feed.solUsd ?? "sim"} · curve{" "}
                {pump.feed.curveProgressPct}%
              </p>
            ) : null}
          </>
        )}
      </article>
    </div>
  );
}

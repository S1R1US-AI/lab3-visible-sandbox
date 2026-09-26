/**
 * MANUAL admin decision preview. Display only. Does not vote HIGH.
 */
import { useEffect, useState } from "react";
import { NINE_B9LL_SUMMARY, SEVEN_B0T_SUMMARY, EIGHT_B8LL_SUMMARY, EIGHT_WHEN_MORNING, tapeConflict, type Lane } from "@/lib/desk-logic";
import { pullBot5Preview, sectorEligibleLine, type Bot5Snap } from "@/lib/bot5-preview";
import { useDesk, useDerived } from "@/lib/desk-store";
import { useAdminFlag } from "@/lib/admin-settings";
import { useResolvedGrad } from "@/lib/grad-pick-store";
import { cn } from "@/lib/cn";

function usd(n: number | null | undefined) {
  if (n == null) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function Cell({
  k,
  v,
  tone,
  sub,
}: {
  k: string;
  v: string;
  tone?: string;
  sub?: string;
}) {
  return (
    <div className="flex h-full min-h-[5.5rem] flex-col justify-center rounded-lg border border-border bg-raised p-3">
      <div className="text-[10px] font-semibold tracking-widest text-muted">{k}</div>
      <div className={cn("text-sm font-semibold", tone ?? "text-fg")}>{v}</div>
      {sub ? <div className="text-[10px] text-muted">{sub}</div> : null}
    </div>
  );
}

export function AdminDecisionPreview() {
  const desk = useDesk();
  const d = useDerived();
  const grad = useResolvedGrad();
  const [snap, setSnap] = useState<Bot5Snap | null>(null);
  const [open, setOpen] = useAdminFlag("adminPreviewOpen", false);

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

  const buy = snap?.deskCall.buy === true && d.fit.high && desk.b7 && desk.bots16;
  const clipPass = d.core.stance === "ACCUMULATE" || d.core.stance === "BUY";
  const el = sectorEligibleLine(snap);
  const deskC = tapeConflict(desk);
  const liveAdd = Boolean(snap?.goldCall.buy || snap?.ethCall.buy);
  const liveC = desk.pr3d && desk.predLean === "dump" && liveAdd;
  const conflictOn = deskC.on || liveC;
  const conflictLine = conflictOn
    ? "CONFLICT · book dump + tape/IBIT accumulate · cut size · do not sell"
    : deskC.line;

  return (
    <section
      data-admin-decision=""
      className="relative z-10 isolate flex shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-surface p-4"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-widest">
          <span className="text-orange">ADMIN</span>{" "}
          <span className="text-primary">DECISION PREVIEW</span>
          <span className="ml-2 text-[10px] font-normal text-muted">
            MANUAL · live tape · does not vote HIGH
          </span>
        </h3>
        <span className={cn("text-xs font-bold", buy ? "text-primary" : "text-danger")}>
          {buy ? "ACCUMULATE · overlay + HIGH + 7 ON" : "WAIT · NO BUY"}
        </span>
      </div>
      <p className="mt-2 text-sm text-fg">
        {snap?.deskCall.why ?? "Pulling live ETH/GOLD ETF tape for the purchase call…"}
      </p>
      <button
        type="button"
        data-admin-expand=""
        className="mt-2 min-h-11 self-start px-1 text-sm font-semibold text-purple"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "expand −" : "expand +"}
      </button>
      {open ? (
      <div className="mt-3 grid w-full flex-1 grid-cols-2 gap-2 md:grid-cols-4">
        <Cell k="BTC" v={usd(snap?.btcUsd)} tone="text-primary" sub={snap?.live ? "LIVE Coinbase" : "pulling"} />
        <Cell
          k="ETH / 1 BTC"
          v={snap?.ethPerBtc != null ? snap.ethPerBtc.toFixed(4) : "—"}
          tone="text-cyan"
          sub={usd(snap?.ethUsd)}
        />
        <Cell
          k="oz GOLD / 1 BTC"
          v={snap?.ozPerBtc != null ? snap.ozPerBtc.toFixed(4) : "—"}
          tone="text-gold"
          sub={usd(snap?.goldUsd)}
        />
        <Cell
          k="FITNESS"
          v={`${d.fit.overall}/100`}
          tone={d.fit.deployReady ? "text-primary" : "text-danger"}
          sub={d.fit.deployReady ? "locks pass" : "locks fail"}
        />
        <Cell
          k="HIGH"
          v={d.fit.high ? "YES" : "NO"}
          tone={d.fit.high ? "text-primary" : "text-danger"}
          sub="Rotation + Sector"
        />
        <Cell
          k="7-B0T CLIP"
          v={clipPass ? "CLIP = PASS" : "WAIT"}
          tone={clipPass ? "text-primary" : "text-purple"}
          sub={SEVEN_B0T_SUMMARY}
        />
        <Cell
          k="8-B0T"
          v={desk.b8 ? "ON" : "OFF"}
          tone={desk.b8 ? "text-primary" : "text-danger"}
          sub={desk.b8 && desk.m3rc ? EIGHT_WHEN_MORNING : EIGHT_B8LL_SUMMARY}
        />
        <Cell
          k="B0Ts 1-6"
          v={desk.bots16 ? "ON" : "OFF"}
          tone={desk.bots16 ? "text-primary" : "text-danger"}
          sub={d.lanes.filter((l: Lane) => l.id !== 6 && (l.stance === "ACCUMULATE" || l.stance === "BUY")).map((l: Lane) => l.name).join(" · ") || "no open research"}
        />
        <Cell
          k="ETH ETF"
          v={snap?.ethCall.buy ? "ADD overlay" : "NO BUY"}
          tone={snap?.ethCall.buy ? "text-primary" : "text-danger"}
          sub="IBIT vs ETHA"
        />
        <Cell
          k="GOLD ETF"
          v={snap?.goldCall.buy ? "ADD overlay" : "NO BUY"}
          tone={snap?.goldCall.buy ? "text-primary" : "text-danger"}
          sub="IBIT vs GLD"
        />
        <Cell
          k="SECTOR ELIGIBLE"
          v={el.yes ? "YES" : "NO"}
          tone={el.yes ? "text-primary" : "text-danger"}
          sub="IBIT lag GLD · never HIGH"
        />
        <Cell
          k="CONFLICT"
          v={conflictOn ? "YES" : "NO"}
          tone={conflictOn ? "text-danger" : "text-primary"}
          sub={conflictLine}
        />
        <Cell
          k="BTC DISCOUNT"
          v={desk.discPick === "select" ? "OFF" : desk.discPick.toUpperCase()}
          tone={desk.discPick === "cheap" ? "text-primary" : desk.discPick === "closed" ? "text-danger" : "text-purple"}
          sub="CHEAP add · CLOSED stop"
        />
        <Cell
          k="PR3DICTION$"
          v={desk.pr3d ? desk.predLean : "OFF"}
          tone="text-shimmer-gold"
          sub="size cut only"
        />
        <Cell
          k="BTC VACUUM"
          v={d.v4c.mode}
          tone={d.v4c.mode === "VACUUM" ? "text-primary" : d.v4c.mode === "BRAKE" ? "text-danger" : "text-muted"}
          sub={`${d.v4c.mult}× · never sells`}
        />
        <Cell
          k="9-B0T"
          v={desk.b9 ? `ON ${desk.riskProfile}%` : "OFF"}
          tone={desk.b9 ? "text-primary" : "text-danger"}
          sub={NINE_B9LL_SUMMARY}
        />
        <Cell
          k="G0DZ1LLa"
          v={desk.g0On ? "+" : "−"}
          tone={desk.g0On ? "text-primary" : "text-danger"}
          sub="never votes HIGH"
        />
        <Cell
          k="GRAD NN"
          v={grad.nn ? "FEED ON" : "OFF"}
          tone={grad.nn ? "text-primary" : "text-muted"}
          sub={grad.nn ? "awareness + recursive · never HIGH" : "no Neural Network feed"}
        />
        <Cell
          k="PAPER P/L"
          v={`P ${desk.core.p} · BTC ${desk.core.btc}`}
          tone="text-orange"
          sub="never sell the stack"
        />
      </div>
      ) : null}
    </section>
  );
}

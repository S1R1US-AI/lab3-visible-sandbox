import { useEffect, useState, type ReactNode } from "react";
/* preview attach 2026-09-25 */
import {
  SUPER_GROK_REVIEW,
  RISK_MIN,
  RISK_MAX,
  TAPE_SOURCES,
  SEVEN_B0T_SUMMARY,
  EIGHT_B8LL_SUMMARY,
  EIGHT_WHEN_MORNING,
  NINE_B9LL_SUMMARY,
  gmLaneView,
  g0PaperCall,
  gapPairs,
  type GapRegime,
  type PredLean,
  OVERLAY_PUBLIC_NOTE,
} from "@/lib/desk-logic";
import { useDesk, useDerived, hydrateAdminSettings } from "@/lib/desk-store";
import { usePump, hydratePumpSettings } from "@/lib/pump-store";
import { useAdminFlag } from "@/lib/admin-settings";
import { PumpDesk, PumpSolReceive } from "@/components/pump-desk";
import { BtcMarketPanel } from "@/components/btc-market-panel";
import { Bot5Preview, MorningEtfLine } from "@/components/bot5-preview";
import { ETH_FLIP_PUBLIC_NOTE } from "@/lib/bot5-preview";
import { AdminDecisionPreview } from "@/components/admin-decision-preview";
import { ResearchSecurityPanel } from "@/components/research-security-panel";
import { GradResearchQuotePaper, GradAwarenessLine } from "@/components/grad-research-quote";
import { VerifyPanel } from "@/components/verify-panel";
import { SECURITY_LINE } from "@/lib/shared-security";
import { pumpCall, PUMP_NEED, PUMP_FUTURE_ROADMAP_NOTE } from "@/lib/pump-plan";
import { pullPumpFeed } from "@/lib/pump-feed";
import { parseAgentCall, liveLaneNote, type G0Live } from "@/lib/desk-logic";
import { getPublicTape } from "@/lib/public-tape";
import { cn } from "@/lib/cn";

const PAGES = ["desk", "pump", "pl", "morning", "faq", "roadmap", "sitemap", "analysis", "media"] as const;
type Page = (typeof PAGES)[number];

function Stat({ k, v, tone }: { k: string; v: string; tone?: "up" | "down" }) {
  return (
    <div>
      <div className="text-xs text-muted">{k}</div>
      <div
        className={cn(
          "desk-mono mt-1 text-lg font-semibold",
          tone === "up" ? "text-primary" : tone === "down" ? "text-danger" : "text-fg",
        )}
      >
        {v}
      </div>
    </div>
  );
}

function money(n: number) {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(0)} USDC`;
}

function LaneStatusRow({
  name,
  status,
  statusClass,
  testId,
  gm,
  summary,
  live,
}: {
  name: ReactNode;
  status: ReactNode;
  statusClass: string;
  testId?: string;
  gm?: boolean;
  summary?: string;
  live?: string;
}) {
  return (
    <div
      data-lane-row={testId}
      data-gm-lane={gm ? "" : undefined}
      data-gm-mode={gm ? (status === "+" || (typeof status === "string" && status.startsWith("+")) ? "on" : "off") : undefined}
      className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-border py-2"
    >
      <span data-lane-name="" className="truncate text-xs text-fg">
        {name}
      </span>
      <span className={cn("desk-mono text-xs font-semibold", statusClass)}>{status}</span>
      {summary ? <span className="col-span-2 truncate text-xs text-muted">{summary}</span> : null}
      {live ? (
        <span className="col-span-2 truncate text-xs text-muted" title={live}>
          {live}
        </span>
      ) : null}
    </div>
  );
}

function TriggerCard({
  name,
  code,
  hint,
  on,
  onToggle,
  children,
  className,
  testId,
}: {
  name: ReactNode;
  code: string;
  hint: ReactNode;
  on: boolean;
  onToggle: () => void;
  children?: ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      data-trigger={testId}
      className={cn(
        "flex h-full min-h-0 flex-col rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide text-fg">{name}</h2>
          <p className="mt-1 line-clamp-3 text-xs leading-5 text-muted">{hint}</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={on}
          className={cn(
            "desk-mono grid size-11 shrink-0 place-items-center rounded-lg text-xs font-semibold",
            on ? "bg-primary/15 text-primary" : "bg-danger/10 text-danger",
          )}
        >
          {code}
        </button>
      </div>
      <div className={cn("mt-4 flex items-center gap-3", !children && "mt-auto")}>
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "grid size-11 place-items-center rounded-lg text-lg font-semibold",
            on ? "bg-primary text-bg" : "bg-raised text-danger",
          )}
        >
          {on ? "+" : "−"}
        </button>
        <span className={cn("desk-mono text-xs font-semibold tracking-widest", on ? "text-primary" : "text-muted")}>
          {on ? "ON" : "OFF"}
        </span>
      </div>
      {children ? <div className="mt-auto flex min-h-0 flex-col gap-3 pt-3">{children}</div> : null}
    </div>
  );
}

function SectionLabel({ kicker, note }: { kicker: string; note: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-xs tracking-[0.22em] text-muted">{kicker}</h3>
      <p className="text-xs text-muted">{note}</p>
    </div>
  );
}

function PairName({ id }: { id: string }) {
  if (id === "gold") {
    return (
      <>
        <span className="text-orange">BTC</span> <span className="text-fg">vs</span>{" "}
        <span className="text-gold">Gold</span>
      </>
    );
  }
  if (id === "etf") {
    return (
      <>
        <span className="text-orange">Spot</span> <span className="text-fg">vs</span>{" "}
        <span className="text-cyan">ETF Net</span>
      </>
    );
  }
  if (id === "alts") {
    return (
      <>
        <span className="text-orange">BTC</span> <span className="text-fg">vs</span>{" "}
        <span className="text-cyan">ALT MCAP</span>
      </>
    );
  }
  if (id === "dxy") {
    return (
      <>
        <span className="text-orange">BTC</span> <span className="text-fg">vs</span>{" "}
        <span className="text-cyan">DXY</span>
      </>
    );
  }
  return (
    <>
      <span className="text-orange">spot</span> <span className="text-fg">vs</span>{" "}
      <span className="text-shimmer-gold">PR3DICTION$</span>
    </>
  );
}

export function DeskApp() {
  const [page, setPage] = useState<Page>("desk");
  const [pumpLaunch, setPumpLaunch] = useState(0);
  const [pumpNeedOpen, setPumpNeedOpen] = useAdminFlag("pumpNeedOpen", false);
  const [pumpTriggerOpen, setPumpTriggerOpen] = useAdminFlag("pumpTriggerOpen", false);
  const desk = useDesk();
  const pump = usePump();
  const d = useDerived();
  const [discTape, setDiscTape] = useState<{ live: boolean; btcUsd: number | null } | null>(null);

  useEffect(() => {
    hydrateAdminSettings();
    hydratePumpSettings();
  }, []);

  useEffect(() => {
    let stop = false;
    const pull = async () => {
      try {
        const res = await getPublicTape();
        const raw = (res.body ?? {}) as {
          live?: boolean;
          status?: string;
          asOf?: string;
          paused?: boolean;
          call?: {
            stance?: string;
            conviction?: string;
            thesis?: string;
            checks?: { label?: string; pass?: boolean }[];
          };
          tape?: { btcUsd?: number };
        };
        if (stop || res.status !== 200) {
          if (!stop && res.status !== 200) {
            useDesk.getState().setLiveIngest({
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
              err: `tape ${res.status}`,
            });
          }
          return;
        }
        const ingest = parseAgentCall(raw);
        const now = useDesk.getState();
        now.setLiveIngest(ingest);
        if (typeof raw.paused === "boolean") useDesk.setState({ simPaused: raw.paused });
        if (now.g0On) {
          const two = raw.call?.checks?.find((c) =>
            (c.label ?? "").toLowerCase().includes("two orthogonal"),
          );
          const live: G0Live = {
            live: Boolean(raw.live),
            status: String(raw.status ?? "unknown"),
            btcUsd: ingest.btcUsd ?? raw.tape?.btcUsd ?? null,
            stance: String(raw.call?.stance ?? ingest.stance ?? "WAIT"),
            conviction: String(raw.call?.conviction ?? ingest.conviction ?? ""),
            thesis: String(raw.call?.thesis ?? ingest.thesis ?? ""),
            twoLane: two ? Boolean(two.pass) : ingest.twoLane,
            asOf: String(raw.asOf ?? ingest.asOf ?? ""),
          };
          now.setG0Live(live);
        }
        if (now.discPick !== "select") {
          setDiscTape({
            live: Boolean(ingest.ok),
            btcUsd: ingest.btcUsd,
          });
        } else {
          setDiscTape(null);
        }
      } catch (e) {
        if (stop) return;
        const now = useDesk.getState();
        now.setLiveIngest(null);
        if (now.g0On) {
          now.setG0Live({
            live: false,
            status: "error",
            btcUsd: null,
            stance: "WAIT",
            conviction: "",
            thesis: "",
            twoLane: null,
            asOf: "",
            err: e instanceof Error ? e.message : "poll failed",
          });
        }
        if (now.discPick !== "select") setDiscTape({ live: false, btcUsd: null });
      }
    };
    void pull();
    const t = window.setInterval(pull, 30000);
    return () => {
      stop = true;
      window.clearInterval(t);
    };
  }, []);

  useEffect(() => {
    if (page !== "pump" || pumpLaunch === 0) return;
    window.scrollTo(0, 0);
    document.getElementById("sandbox-top")?.scrollIntoView({ block: "start" });
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLButtonElement>("[data-pump-first]")?.focus();
    });
  }, [page, pumpLaunch]);

  useEffect(() => {
    if (page !== "desk") return;
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
  }, [page]);

  const pTotal = desk.core.p + desk.b8pl.p + desk.b9pl.p + desk.token.p + desk.agents.p;
  const lTotal = desk.core.l + desk.b8pl.l + desk.b9pl.l + desk.token.l + desk.agents.l;
  const vColor =
    d.v4c.mode === "VACUUM" ? "text-primary" : d.v4c.mode === "BRAKE" ? "text-danger" : "text-muted";
  const pairs = gapPairs(desk.gapRegime);
  const discIdle = desk.discPick === "select";
  const discLive =
    desk.discPick === "cheap"
      ? "CHEAP - ON"
      : desk.discPick === "mixed"
        ? "MIXED - ON"
        : desk.discPick === "closed"
          ? "CLOSED"
          : "OFF";
  const g0View: G0Live | null =
    desk.g0Live ??
    (desk.liveIngest
      ? {
          live: false,
          status: desk.liveIngest.ok ? "public-tape" : "down",
          btcUsd: desk.liveIngest.btcUsd,
          stance: desk.liveIngest.stance,
          conviction: desk.liveIngest.conviction,
          thesis: desk.liveIngest.thesis,
          twoLane: desk.liveIngest.twoLane,
          asOf: desk.liveIngest.asOf,
          err: desk.liveIngest.err,
        }
      : null);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-bg text-fg">
      <header
        id="sandbox-top"
        className="sticky top-0 z-20 shrink-0 border-b border-border bg-bg/95 backdrop-blur"
      >
        <div className="flex flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-widest text-fg">S1R1U$ SANDBOX</div>
            <div className="text-xs text-muted">Paper desk · create locked · never sell the stack</div>
          </div>
          <div className="desk-mono flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
            <span className="text-fg">
              BTC{" "}
              <span className="text-lg font-semibold text-primary">
                {desk.liveIngest?.btcUsd != null
                  ? Math.round(desk.liveIngest.btcUsd).toLocaleString("en-US")
                  : "—"}
              </span>
            </span>
            <span className={cn((desk.liveIngest?.changePct ?? 0) >= 0 ? "text-primary" : "text-danger")}>
              {desk.liveIngest?.changePct == null
                ? "—"
                : `${desk.liveIngest.changePct >= 0 ? "+" : ""}${desk.liveIngest.changePct.toFixed(2)}%`}
            </span>
            <span className="text-muted">
              RSI {desk.liveIngest?.rsi14?.toFixed(1) ?? "—"}
            </span>
            <span className="text-muted">
              F&G {desk.liveIngest?.fearGreed ?? "—"} {desk.liveIngest?.fearLabel ?? ""}
            </span>
            <span className="text-fg">{desk.liveIngest?.stance ?? "WAIT"}</span>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2">
          {PAGES.map((p) => (
            <button
              key={p}
              type="button"
              data-top-nav={p}
              onClick={() => setPage(p)}
              className={cn(
                "min-h-11 shrink-0 rounded-md px-3 text-xs font-semibold uppercase tracking-wider",
                page === p ? "bg-surface text-primary" : "text-muted",
              )}
            >
              {p === "pl" ? "P/L" : p === "pump" ? "P@MP" : p === "media" ? "MEDIA" : p}
            </button>
          ))}
        </nav>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="overflow-y-auto border-b border-border px-4 py-3 lg:border-b-0 lg:border-r">
          <div className="mb-2 flex items-baseline justify-between">
            <h3 className="text-xs font-semibold tracking-widest text-muted">LANES</h3>
            <span className={cn("desk-mono text-xs font-semibold", d.high ? "text-primary" : "text-muted")}>
              HIGH {d.high ? "ON" : "OFF"}
            </span>
          </div>
          <div>
            {d.lanes.map((l) => (
              <LaneStatusRow
                key={l.id}
                name={<span className="text-fg">{l.id} {l.name}</span>}
                status={l.stance}
                statusClass={
                  l.stance === "ACCUMULATE" || l.stance === "BUY" ? "text-primary" : "text-danger"
                }
                live={liveLaneNote(l.id, desk.liveIngest) ?? undefined}
              />
            ))}
            <LaneStatusRow
              name={<span className="text-fg">7-B0T</span>}
              status={
                d.core.note.startsWith("TRIM") ? (
                  "TRIM"
                ) : d.core.navPct > 0 ? (
                  "CLIP=PASS"
                ) : (
                  <>
                    <span className="text-purple">WAIT</span>{" "}
                    <span className={desk.b7 ? "text-primary" : "text-accent"}>
                      {desk.b7 ? "ON" : "OFF"}
                    </span>
                  </>
                )
              }
              statusClass={
                d.core.note.startsWith("TRIM")
                  ? "text-purple"
                  : d.core.navPct > 0
                    ? "text-primary"
                    : ""
              }
              testId="7"
            />
            <LaneStatusRow
              name={<span className="text-fg">8-B0T</span>}
              status={desk.b8 ? "ON" : "OFF"}
              statusClass={desk.b8 ? "text-primary" : "text-accent"}
              testId="8"
            />
            <LaneStatusRow
              name={<span className="text-fg">9-B0T</span>}
              status={desk.b9 ? `ON ${desk.riskProfile}%` : "OFF"}
              statusClass={desk.b9 ? "text-primary" : "text-accent"}
              testId="9"
            />
            <LaneStatusRow
              name={<span className="text-gold">PR3DICTION$</span>}
              status={desk.pr3d ? "ON" : "OFF"}
              statusClass={desk.pr3d ? "text-primary" : "text-accent"}
              testId="pr3d"
            />
            <LaneStatusRow
              name={<span className="text-fg">G0DZ1LLa</span>}
              status={
                desk.g0On
                  ? desk.g0Live
                    ? `+ ${desk.g0Live.live ? "LIVE" : "sim"} ${desk.g0Live.stance}`
                    : "+ ON"
                  : "− OFF"
              }
              statusClass={desk.g0On ? "text-primary" : "text-danger"}
              testId="g0"
              gm
            />
            <LaneStatusRow
              name={<span className="text-fg">BTC discount</span>}
              status={
                desk.discPick === "select"
                  ? "OFF"
                  : `${discLive}${
                      discTape
                        ? ` · ${discTape.live ? "LIVE" : "sim"}${discTape.btcUsd ? ` ${Math.round(discTape.btcUsd)}` : ""}`
                        : " · tape"
                    }`
              }
              statusClass={
                desk.discPick === "cheap"
                  ? "text-primary"
                  : desk.discPick === "mixed"
                    ? "text-purple"
                    : desk.discPick === "closed"
                      ? "text-danger"
                      : "text-accent"
              }
              testId="discount"
            />
            <LaneStatusRow
              name={<span className="text-fg">BTC vacuum</span>}
              status={desk.v4c ? "ON" : "OFF"}
              statusClass={desk.v4c ? "text-primary" : "text-accent"}
              testId="vac"
            />
            <div data-lane-row="pump" className="mt-3 border-t border-border pt-3">
              <div className="mb-2 flex items-baseline justify-between text-xs">
                <span data-lane-name="" className="text-fg">
                  P@MP.fun
                </span>
                <span className={cn("desk-mono font-semibold", pump.pumpOn ? "text-primary" : "text-muted")}>
                  {pump.pumpOn ? "ON" : "OFF"}
                </span>
              </div>
              <button
                type="button"
                data-pump-launch=""
                onClick={() => {
                  pump.armOn();
                  setPage("pump");
                  setPumpLaunch((n) => n + 1);
                }}
                className="min-h-11 w-full rounded-lg bg-primary text-sm font-semibold text-bg"
                title="LAUNCH — isolated P@MP.fun. Not 7-B0T tape."
              >
                Launch paper
              </button>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">
            HIGH is Rotation plus Sector. Coordinator does not vote. Paper only.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-xs">
            <div>
              <div className="text-muted">P</div>
              <div className="desk-mono text-primary">{money(pTotal)}</div>
            </div>
            <div>
              <div className="text-muted">L</div>
              <div className="desk-mono text-danger">{money(-lTotal)}</div>
            </div>
            <div>
              <div className="text-muted">NET</div>
              <div className="desk-mono text-fg">{money(pTotal - lTotal)}</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted">Fitness {d.fit.overall}/100 paper</div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden p-4 md:p-6">
          {page === "desk" && (
            <div className="flex min-h-0 flex-col gap-5">
              <section
                data-live-tape=""
                className="grid gap-3 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:grid-cols-4"
              >
                <Stat k="BTC" v={desk.liveIngest?.btcUsd != null ? Math.round(desk.liveIngest.btcUsd).toLocaleString("en-US") : "—"} />
                <Stat
                  k="Session"
                  v={
                    desk.liveIngest?.changePct == null
                      ? "—"
                      : `${desk.liveIngest.changePct >= 0 ? "+" : ""}${desk.liveIngest.changePct.toFixed(2)}%`
                  }
                  tone={(desk.liveIngest?.changePct ?? 0) >= 0 ? "up" : "down"}
                />
                <Stat k="RSI / F&G" v={`${desk.liveIngest?.rsi14?.toFixed(1) ?? "—"} · ${desk.liveIngest?.fearGreed ?? "—"}`} />
                <Stat k="Call" v={`${desk.liveIngest?.stance ?? "WAIT"} ${desk.liveIngest?.conviction ?? ""}`.trim()} />
              </section>
              <section className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold tracking-widest text-muted">AUTO</h3>
                <Bot5Preview />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <TriggerCard
                    name={<span className="text-orange">B0Ts 1-6</span>}
                    code="1–6"
                    hint="PASS. Arms Research. Coordinator never VOTES HIGH."
                    on={desk.bots16}
                    onToggle={() => desk.toggle("bots16")}
                  />
                  <TriggerCard
                    name={<span className="text-rainbow">G0DZ1LLa M0D3</span>}
                    code="G·A"
                    hint={
                      desk.gmMode === "auto" ? (
                        <>
                          Auto = Vote On. (currently runs on sim live data). See{" "}
                          <a className="text-cyan underline" href="https://s1r1us.ai/roadmap" target="_blank" rel="noreferrer">
                            Roadmap
                          </a>{" "}
                          for GO LIVE. NEVER the 7-B0T STACK.
                        </>
                      ) : (
                        <>
                          OFF. Click + to Vote On. (currently runs on sim live data). See{" "}
                          <a className="text-cyan underline" href="https://s1r1us.ai/roadmap" target="_blank" rel="noreferrer">
                            Roadmap
                          </a>{" "}
                          for GO LIVE. NEVER the 7-B0T STACK.
                        </>
                      )
                    }
                    on={desk.gmMode === "auto"}
                    onToggle={() => desk.setGm("auto")}
                    testId="gm-auto"
                  />
                  <TriggerCard
                    name={
                      <>
                        <span className="text-orange">7-B0T</span>{" "}
                        <span className="text-primary">Trigger</span>
                      </>
                    }
                    code="7BT"
                    hint={SEVEN_B0T_SUMMARY}
                    on={desk.b7}
                    onToggle={() => desk.toggle("b7")}
                  />
                  <TriggerCard
                    name={
                      <>
                        <span className="text-orange">8-B0T</span>{" "}
                        <span className="text-primary">Trigger</span>
                      </>
                    }
                    code="8BT"
                    hint={
                      desk.b8 && desk.m3rc
                        ? `${EIGHT_B8LL_SUMMARY} ${EIGHT_WHEN_MORNING}`
                        : EIGHT_B8LL_SUMMARY
                    }
                    on={desk.b8}
                    onToggle={() => desk.toggle("b8")}
                    testId="eight"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <TriggerCard
                    name={<span className="text-primary">M0rning Report</span>}
                    code="M.R."
                    hint={
                      desk.m3rc && desk.b8
                        ? `PASS. Extra 07:30 A.M. M0rning Report - LANES. DOES NOT TRADE. ${EIGHT_WHEN_MORNING}`
                        : "PASS. Extra 07:30 A.M. M0rning Report - LANES. DOES NOT TRADE."
                    }
                    on={desk.m3rc}
                    onToggle={() => desk.toggle("m3rc")}
                    testId="morning"
                  />
                  <TriggerCard
                    name={
                      <>
                        <span className="text-orange">BTC</span>{" "}
                        <span className="text-primary">VACUUM</span>
                      </>
                    }
                    code="VAC"
                    hint="PASS. 1.5–2× on an already-allowed add. BRAKE if Crowded. NEVER SELLS."
                    on={desk.v4c}
                    onToggle={() => desk.toggle("v4c")}
                    testId="vac-card"
                  >
                    <p className={cn("text-xs", vColor)}>
                      {d.v4c.note.replace("V4C IDLE", "BTC VACUUM").replaceAll("V4C VACUUM", "BTC VACUUM")}
                    </p>
                  </TriggerCard>
                  <TriggerCard
                    name={<span className="text-shimmer-gold">PR3DICTION$</span>}
                    code="PR3D"
                    hint="PASS. REDUCES SIZE ONLY. CAN NEVER – FLIP - HOLD to BUY."
                    on={desk.pr3d}
                    onToggle={() => desk.toggle("pr3d")}
                  >
                    <p className="text-xs text-muted">{d.pr3d.note}</p>
                    <label className="block text-xs text-muted">
                      <span className="text-shimmer-gold">PR3DICTION$</span> book selection
                      <select
                        className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-2 text-fg"
                        value={desk.predLean}
                        onChange={(e) => desk.setPredLean(e.target.value as PredLean)}
                      >
                        <option value="dump">dump · cut size, still add weakness</option>
                        <option value="mixed">mixed · 0.75× size</option>
                        <option value="accum">accum · full allowed size</option>
                      </select>
                    </label>
                  </TriggerCard>
                </div>
              </section>

              <section className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold tracking-widest text-muted">MANUAL</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <TriggerCard
                    name={<span className="text-rainbow">G0DZ1LLa M0D3</span>}
                    code="G·M"
                    hint={'"+" = on. if not "−" = off. Live poll while +. G0DZ1LLa M0D3 may CALL paper. NEVER the 7-B0T STACK.'}
                    on={desk.g0On}
                    onToggle={() => desk.toggleG0()}
                    testId="gm-manual"
                  >
                    <p className={cn("text-xs leading-5", desk.g0On ? "text-primary" : "text-muted")}>
                      {g0PaperCall(desk.g0On, g0View)}
                    </p>
                    {desk.g0On && g0View && !g0View.err ? (
                      <p className="text-xs text-muted">
                        public tape · host {g0View.live ? "TRUE LIVE" : g0View.status} · BTC{" "}
                        {g0View.btcUsd ?? "n/a"} · two-lane{" "}
                        {g0View.twoLane === null ? "n/a" : g0View.twoLane ? "pass" : "fail"}
                        . No orders. Never the stack.
                      </p>
                    ) : null}
                  </TriggerCard>
                  <TriggerCard
                    name={
                      <>
                        <span className="text-orange">9-B0T</span>{" "}
                        <span className="text-primary">Trigger</span>
                      </>
                    }
                    code="9BT"
                    hint={NINE_B9LL_SUMMARY}
                    on={desk.b9}
                    onToggle={() => desk.toggle("b9")}
                    testId="nine-manual"
                  >
                    <p className="text-xs text-muted">
                      9-B0T Trigger Allows for a higher RISK Profile. Move Slider to increase
                      risk. MAX 30% RISK.
                    </p>
                    <input
                      type="range"
                      min={RISK_MIN}
                      max={RISK_MAX}
                      value={desk.riskProfile}
                      onChange={(e) => desk.setRisk(Number(e.target.value))}
                      className="w-full"
                      suppressHydrationWarning
                    />
                    <label className="block text-xs text-muted">
                      Select RISK MODE from drop down menu.
                      <select
                        className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-2 text-fg"
                        value={desk.b9Mode}
                        onChange={(e) => desk.setMode(e.target.value as "manual" | "auto")}
                      >
                        <option value="manual">
                          Manual mode {'>'} User selects Approve = A or D = Disapprove.
                        </option>
                        <option value="auto">
                          AUTO mode {'>'} User selects Approve = A or D = Disapprove.
                        </option>
                      </select>
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        data-nine-approve=""
                        onClick={() => desk.approve()}
                        disabled={!d.nine.yes || !d.nine.needsCoord || d.nine.action !== "ACCUMULATE"}
                        className="min-h-11 flex-1 rounded-md border border-primary text-xs font-semibold text-primary disabled:opacity-40"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        data-nine-deny=""
                        onClick={() => desk.deny()}
                        className="min-h-11 flex-1 rounded-md border border-danger text-xs font-semibold text-danger"
                      >
                        Deny
                      </button>
                    </div>
                    <p className="text-xs text-muted">{d.nine.reason}</p>
                    <p
                      data-nine-result=""
                      className={cn(
                        "text-xs font-semibold",
                        desk.pendingApproved === true
                          ? "text-primary"
                          : desk.pendingApproved === false
                            ? "text-danger"
                            : "text-muted",
                      )}
                    >
                      {desk.pendingApproved === true
                        ? desk.pending ??
                          `USER Approve applied · risk ${desk.riskProfile}% · ${desk.b9Mode} · discount ${desk.discPick}`
                        : desk.pendingApproved === false
                          ? desk.pending ??
                            `USER Deny / blocked · risk ${desk.riskProfile}% · ${desk.b9Mode} · discount ${desk.discPick}`
                          : "pending Approve / Deny · buttons use the risk slider, mode, and BTC DISCOUNT selected now"}
                    </p>
                  </TriggerCard>
                  <TriggerCard
                    name={
                      <>
                        <span className="text-orange">BTC</span>{" "}
                        <span className="text-primary">DISCOUNT</span>
                      </>
                    }
                    code="DSC"
                    hint="PASS. CHEAP = ADD. MIXED Keep Votes. CLOSED = STOP ADDING."
                    on={desk.gapRegime === "cheap"}
                    onToggle={() => {
                      if (desk.discPick === "select") {
                        desk.setDiscPick("cheap");
                        return;
                      }
                      desk.setDiscPick(
                        desk.discPick === "cheap"
                          ? "mixed"
                          : desk.discPick === "mixed"
                            ? "closed"
                            : "cheap",
                      );
                    }}
                  >
                    <label className="block text-xs text-cyan">
                      snapshot
                      <select
                        className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-2 text-fg"
                        value={desk.discPick}
                        onChange={(e) =>
                          desk.setDiscPick(e.target.value as typeof desk.discPick)
                        }
                      >
                        <option value="select">MAKE YOUR SELECTION</option>
                        <option value="cheap">cheap</option>
                        <option value="mixed">mixed</option>
                        <option value="closed">closed</option>
                      </select>
                    </label>
                    <p className={cn("text-xs", discIdle ? "text-accent" : "text-primary")}>
                      {discIdle
                        ? "OFF · MAKE YOUR SELECTION · no data used"
                        : `selected: ${desk.discPick}${
                            discTape
                              ? ` · tape ${discTape.live ? "LIVE" : "sim"} ${discTape.btcUsd ?? ""}`
                              : " · pulling tape…"
                          }`}
                    </p>
                    {!discIdle ? (
                      <>
                    <div className="overflow-x-auto text-xs">
                      <div className="mb-1 grid grid-cols-3 gap-2 font-semibold text-cyan">
                        <span>Pair</span>
                        <span>State</span>
                        <span>Action</span>
                      </div>
                      {pairs.map((p) => (
                        <div key={p.id} className="grid grid-cols-3 gap-2 py-1">
                          <span>
                            <PairName id={p.id} />
                          </span>
                          <span
                            className={
                              p.state === "cheap"
                                ? "text-primary"
                                : p.state === "rich"
                                  ? "text-danger"
                                  : "text-purple"
                            }
                          >
                            {p.state === "cheap" ? "Cheap" : p.state === "rich" ? "Rich" : "Fair"}
                          </span>
                          <span
                            className={p.action === "ACCUMULATE" ? "text-primary" : "text-purple"}
                          >
                            {p.action}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted">{TAPE_SOURCES}</p>
                      </>
                    ) : null}
                  </TriggerCard>
                </div>
                <AdminDecisionPreview />
                <BtcMarketPanel />
                <div>
                  <TriggerCard
                    name={<span className="text-primary">P@MP.fun</span>}
                    code="P@MP"
                    hint="Paper pump.fun launch desk. Isolated. Not 7-B0T tape. Data needed for a clean mint."
                    on={pump.pumpOn}
                    onToggle={() => pump.togglePump()}
                    className={pumpTriggerOpen ? "min-h-[32rem] sm:col-span-2 xl:col-span-4" : "sm:col-span-2 xl:col-span-4"}
                    testId="pump-manual"
                  >
                    <PumpSolReceive compact />
                    <button
                      type="button"
                      data-pump-trigger-expand=""
                      onClick={() => setPumpTriggerOpen((o) => !o)}
                      className="min-h-11 self-start text-left text-sm font-semibold text-purple"
                    >
                      {pumpTriggerOpen ? "expand −" : "expand +"}
                    </button>
                    {pumpTriggerOpen ? (
                    <>
                    <p className={cn("text-sm font-semibold", pump.pumpOn ? "text-primary" : "text-accent")}>
                      {pumpCall(pump.pumpOn, pump.feed)}
                    </p>
                    <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-2">
                      <div className="flex min-h-0 flex-col gap-3">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="rounded-lg border border-primary/40 p-3">
                            <div className="text-muted">SOL</div>
                            <div className="text-lg text-primary">
                              {pump.feed?.solUsd != null ? pump.feed.solUsd.toFixed(2) : "sim"}
                            </div>
                          </div>
                          <div className="rounded-lg border border-primary/40 p-3">
                            <div className="text-muted">curve</div>
                            <div className="text-lg text-primary">{pump.feed?.curveProgressPct ?? "—"}%</div>
                          </div>
                          <div className="rounded-lg border border-primary/40 p-3">
                            <div className="text-muted">paper mcap</div>
                            <div className="text-lg text-primary">
                              {pump.feed ? `${pump.feed.paperMcapSol.toFixed(1)} SOL` : "—"}
                            </div>
                          </div>
                        </div>
                        <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-border p-3 text-xs">
                          <div className="mb-2 font-semibold text-cyan">Suggested names</div>
                          <div className="mb-1 grid grid-cols-3 gap-2 font-semibold text-muted">
                            <span>Name</span>
                            <span>Ticker</span>
                            <span>Score</span>
                          </div>
                          {pump.tickers.map((t) => (
                            <div key={t.ticker} className="grid grid-cols-3 gap-2 border-t border-border py-1">
                              <span className="text-fg">{t.name}</span>
                              <span className="text-primary">{t.ticker}</span>
                              <span>{t.score}</span>
                            </div>
                          ))}
                          <p className="mt-2 text-muted">Paper suggestions only. Search uniqueness on pump.fun before mint.</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            data-pump-refresh=""
                            onClick={() => void pump.refresh()}
                            className="min-h-11 flex-1 rounded-md border border-primary text-xs font-semibold text-primary"
                          >
                            {pump.busy ? "REFRESH…" : "REFRESH"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              pump.armOn();
                              setPage("pump");
                              setPumpLaunch((n) => n + 1);
                            }}
                            className="min-h-11 flex-1 rounded-md border border-primary text-xs font-semibold text-primary"
                          >
                            P@MP.fun LAUNCH
                          </button>
                        </div>
                      </div>
                      <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-primary/40 p-3 text-xs">
                        <div className="mb-2 font-semibold text-primary">Data needed · perfect paper launch</div>
                        <div className="space-y-2">
                          {PUMP_NEED.filter((row) =>
                            ["Name + ticker", "Art", "One-line bio", "Wallet"].includes(row.label),
                          ).map((row) => (
                            <div key={row.label} className="border-b border-border pb-2">
                              <div className="font-semibold text-cyan">{row.label}</div>
                              <div className="text-fg">{row.need}</div>
                              <div className="text-muted">{row.why}</div>
                            </div>
                          ))}
                          <button
                            type="button"
                            data-pump-need-expand=""
                            onClick={() => setPumpNeedOpen((o) => !o)}
                            className="min-h-11 w-full text-left text-xs font-semibold uppercase tracking-widest text-purple"
                          >
                            {pumpNeedOpen ? "expand −" : "expand +"}
                          </button>
                          {pumpNeedOpen
                            ? PUMP_NEED.filter((row) =>
                                !["Name + ticker", "Art", "One-line bio", "Wallet"].includes(row.label),
                              ).map((row) => (
                                <div key={row.label} className="border-b border-border pb-2 last:border-b-0">
                                  <div className="font-semibold text-cyan">{row.label}</div>
                                  <div className="text-fg">{row.need}</div>
                                  <div className="text-muted">{row.why}</div>
                                </div>
                              ))
                            : null}
                        </div>
                        <p className="mt-3 text-disclosure">
                          DISCLOSURE: Paper / education. Host never mints. Never sell the BTC stack.
                        </p>
                      </div>
                    </div>
                    </>
                    ) : null}
                  </TriggerCard>
                </div>
              </section>
            </div>
          )}
          {page === "pump" && (
            <div className="flex flex-col gap-5">
              <BtcMarketPanel />
              <PumpDesk launchKey={pumpLaunch} />
            </div>
          )}
          {page === "pl" && (
            <article className="max-w-2xl space-y-2 text-sm text-muted">
              <h2 className="text-fg">S1r1US Admin P/L</h2>
              <p>PASS. PAPER (until GO LIVE Date. Verify Fitness. Not deploy-ready 09/26.</p>
              <p>
                P {money(pTotal)} · L {money(-lTotal)} · NET {money(pTotal - lTotal)}
              </p>
              <p>Fitness {d.fit.overall}/100 · locks {d.fit.deployReady ? "PASS" : "FAIL"}</p>
              <p className="text-xs">
                <span className="text-orange">7-B0T</span> core · {SEVEN_B0T_SUMMARY}
              </p>
              <p className="text-xs">
                <span className="text-orange">8-B0T</span> P {money(desk.b8pl.p)} · {EIGHT_B8LL_SUMMARY}
              </p>
              <p className="text-xs">
                <span className="text-orange">9-B0T</span> sleeve P {money(desk.b9pl.p)} · BTC{" "}
                {desk.b9pl.btc.toFixed(6)} · {NINE_B9LL_SUMMARY}
              </p>
              <pre className="whitespace-pre-wrap text-xs">{desk.callLog.join("\n") || "no clips"}</pre>
            </article>
          )}
          {page === "morning" && (
            <article className="max-w-2xl space-y-2 text-sm text-muted">
              <h2 className="text-fg">M0rning Report</h2>
              <p>07:30 A.M. Extra admin lines. DOES NOT TRADE. PAPER.</p>
              <p>7-B0T {desk.b7 ? "ON" : "OFF"} · CLIP {d.core.navPct > 0 ? "PASS" : "WAIT"}</p>
              <p className="text-xs">{SEVEN_B0T_SUMMARY}</p>
              <p>8-B0T {desk.b8 ? "ON" : "OFF"} · {d.eight.reason}</p>
              <p className="text-xs">{EIGHT_B8LL_SUMMARY}</p>
              {desk.b8 && desk.m3rc ? <p className="text-xs text-primary">{EIGHT_WHEN_MORNING}</p> : null}
              <p>
                <span className="text-orange">9-B0T</span> {desk.b9 ? "ON" : "OFF"} · {d.nine.reason}
              </p>
              <p className="text-xs">{NINE_B9LL_SUMMARY}</p>
              <p>PR3DICTION$ {desk.pr3d ? "ON" : "OFF"} · {d.pr3d.note}</p>
              <p>
                G0DZ1LLa M0D3 {desk.g0On ? "+" : "−"} · {g0PaperCall(desk.g0On, desk.g0Live)}
              </p>
              <p>
                BTC DISCOUNT {discLive}
              </p>
              {desk.m3rc ? <p className="text-primary">M0rning Report armed.</p> : <p>M0rning Report OFF.</p>}
              <MorningEtfLine />
              <GradAwarenessLine />
            </article>
          )}
          {page === "faq" && (
            <article className="max-w-2xl space-y-3 text-sm text-muted">
              <h2 className="text-fg">FAQ</h2>
              <p>
                <strong className="text-fg">NOTE:</strong>{" "}
                <a
                  className="text-cyan underline"
                  href="https://s1r1us.ai/roadmap"
                  target="_blank"
                  rel="noreferrer"
                >
                  S1R1US.ai Roadmap
                </a>{" "}
                — click to open the Official Roadmap and official timeline. Updates to logic and data
                flow have been made on the Official Roadmap (and official timeline). Updated System
                Logic is considered proprietary information; thus logic charts remain only on the
                system admin research paper and system admin media files (stamp 2026-09-26 01:43 EDT).
                IBIT / ETHA / GLD inform the admin only and do not vote HIGH.
              </p>
              <p>
                <strong className="text-fg">NOTE:</strong>{" "}
                {ETH_FLIP_PUBLIC_NOTE}
              </p>
              <p>
                <strong className="text-fg">NOTE:</strong> (future feature){" "}
                {PUMP_FUTURE_ROADMAP_NOTE.replace("**NOTE:** (future feature) ", "")}{" "}
                <a className="text-cyan underline" href="https://s1r1us.ai/roadmap" target="_blank" rel="noreferrer">
                  Roadmap
                </a>
              </p>
              <p>
                <strong className="text-fg">ETH ETF-CALL / GOLD ETF-CALL?</strong> Full ETH or GOLD
                awareness for the admin BTC overlay. They do not vote HIGH. CLIP still needs HIGH + 7
                ON + 1-6 ON. Never sells.{" "}
                <a className="text-cyan underline" href="https://s1r1us.ai/roadmap" target="_blank" rel="noreferrer">
                  Roadmap
                </a>
              </p>
              <p>
                <strong className="text-fg">VERIFY?</strong> Runs only when the admin clicks SAVE
                CHECKPOINT or BUILD CHECKPOINT on the analysis paper. Never on desk poll. Logic stays
                locked.{" "}
                <a className="text-cyan underline" href="https://s1r1us.ai/roadmap" target="_blank" rel="noreferrer">
                  Roadmap
                </a>
              </p>
              <p>
                <strong className="text-fg">Official research?</strong> Only official university
                pages and Google Scholar items that can be checked against public live data are
                eligible. Unverifiable, false, or misleading claims are not used. Logic charts stay
                admin-only.
              </p>
              <p>
                <strong className="text-fg">B0Ts 1-6?</strong> PASS. Arms Research. Coordinator never
                VOTES HIGH. HIGH = Rotation + Sector. NOT Rotation + Coordinator.
              </p>
              <p>
                <strong className="text-fg">7-B0T?</strong> {SEVEN_B0T_SUMMARY}
              </p>
              <p>
                <strong className="text-fg">G0DZ1LLa M0D3?</strong> "+" = on. if not "−" = off. Live
                poll while +. NEVER the 7-B0T STACK.
              </p>
              <p>
                <strong className="text-fg">8-B0T?</strong> {EIGHT_B8LL_SUMMARY}
              </p>
              <p>
                <strong className="text-fg">9-B0T?</strong> {NINE_B9LL_SUMMARY}
              </p>
              <p>
                <strong className="text-fg">PR3DICTION$?</strong> REDUCES SIZE ONLY. CAN NEVER – FLIP
                - HOLD to BUY.
              </p>
              <p>
                <strong className="text-fg">BTC DISCOUNT?</strong> CHEAP = ADD. MIXED Keep Votes.
                CLOSED = STOP ADDING.
              </p>
              <p>
                <strong className="text-fg">P@MP.fun?</strong> Currently experimental. Separate desk.
                Separate SOL/sim feed. Never /api/s1. Never 7-B0T HIGH. Never GitHub. Security rules
                match the trading OS. {PUMP_FUTURE_ROADMAP_NOTE.replace("**NOTE:** ", "")}
              </p>
              <p>
                <strong className="text-fg">M0rning Report?</strong> Extra 07:30 A.M. lines. DOES NOT
                TRADE.
              </p>
              <p>
                <strong className="text-fg">TRIM?</strong> TRIM = stop add-ons. NEVER sells the BTC
                Stack.
              </p>
              <p>
                <strong className="text-fg">Instruction?</strong> Public instruction is this FAQ.
                System-admin instruction module is on the analysis tab only. No public instruction
                video. No logic charts on public pages.
              </p>
              <p>
                <strong className="text-fg">Roles?</strong> System admin = A/D + pause + 07:30 Morning
                Report. copy-admin = phone/app pause, not championship pause. public/phone = paper +
                BYO keys on device. white label = own domain, no host admin. external AI =
                mandate:true, poll only, execute on their Coinbase dry-run. Host never escrows.
              </p>
            </article>
          )}
          {page === "roadmap" && (
            <article className="max-w-2xl space-y-2 text-sm text-muted">
              <h2 className="text-fg">Roadmap (sandbox)</h2>
              <p>
                <strong className="text-fg">NOTE:</strong>{" "}
                <a
                  className="text-cyan underline"
                  href="https://s1r1us.ai/roadmap"
                  target="_blank"
                  rel="noreferrer"
                >
                  S1R1US.ai Roadmap
                </a>{" "}
                — click to open. Updates to logic and data flow have been made on the Official
                Roadmap (and official timeline). Updated System Logic is considered proprietary
                information; thus logic charts remain only on the system admin research paper and
                system admin media files. Eligible research is official university or Google Scholar
                material that can be checked against public live data. Unverifiable, false, or
                misleading claims are not used.
              </p>
              <p>
                <strong className="text-fg">NOTE:</strong> {ETH_FLIP_PUBLIC_NOTE}
              </p>
              <p>
                <strong className="text-fg">NOTE:</strong> (future feature){" "}
                {PUMP_FUTURE_ROADMAP_NOTE.replace("**NOTE:** (future feature) ", "")}
              </p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Official public timeline: go-live estimate 2026-12-01 09:00 ET. Coinbase create LOCKED.</li>
                <li>Sandbox remains paper. Never sell the stack. Never short.</li>
                <li>Public FAQ and this Roadmap do not publish logic charts or vote maps.</li>
                <li>Official university / Google Scholar research must be verifiable. Unverifiable claims are not used. Charts stay admin-only.</li>
                <li>System-admin instruction module lives on the analysis tab (admin only). No public instruction video maps overlay votes.</li>
                <li>IBIT / ETHA / GLD inform admin awareness only. They do not vote HIGH.</li>
                <li>
                  NOTE (future feature): P@MP.fun is experimental. No host SOL receive. Official
                  public rails are BTC 33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8 and ETH EVM USDC
                  0x551163f5d4c0361155d16131459afa5c936a60ad. Pump.fun mint is BYO SOL on YOUR
                  device. Future: system admin DEPLOY a full Pump.fun LAUNCH PLAN from the admin
                  interface. Never 7-B0T HIGH. Host never escrows.
                </li>
              </ol>
            </article>
          )}
          {page === "sitemap" && (
            <article className="max-w-2xl space-y-2 text-sm text-muted">
              <h2 className="text-fg">Sitemap</h2>
              <ul className="list-disc pl-5">
                <li>
                  Desk AUTO: B0Ts 1-6 · G0DZ1LLa M0D3 · 7-B0T · 8-B0T · M0rning Report · BTC VACUUM ·
                  PR3DICTION$ · P@MP.fun
                </li>
                <li>Desk MANUAL: G0DZ1LLa M0D3 · 9-B0T · BTC DISCOUNT</li>
                <li>P/L · Morning Report · FAQ · Roadmap · Analysis (admin) · Media library (admin, noindex)</li>
                <li>xml: /sitemap.xml · schema SoftwareApplication</li>
                <li>Roles: system admin · copy-admin · public/phone · white label · external AI</li>
                <li>
                  Live:{" "}
                  <a className="text-cyan underline" href="https://s1r1us.ai/" target="_blank" rel="noreferrer">
                    s1r1us.ai
                  </a>
                </li>
              </ul>
            </article>
          )}
          {page === "analysis" && (
            <article className="mx-auto flex max-w-5xl flex-col gap-6 text-sm text-muted">
              <header>
                <h2 className="text-fg">S1R1US.ai research paper · system admin</h2>
                <p className="text-xs">Sandbox live snapshot. PAPER. Coinbase create LOCKED. Not financial advice.</p>
                <p className="text-xs text-disclosure">
                  INTERNAL ADMIN. Logic diagrams are not on FAQ, roadmap, sitemap.xml, README, schema,
                  live s1r1us.ai, or GitHub. They live only in this paper and the MEDIA library.
                  Stamp 2026-09-26 01:43 EDT · overlay never votes HIGH · figures 20260926-0143EDT.
                </p>
                <p className="mt-2 text-xs text-fg">{ETH_FLIP_PUBLIC_NOTE}</p>
              </header>
              <VerifyPanel />
              <ResearchSecurityPanel />
              <GradResearchQuotePaper />
              <pre className="whitespace-pre-wrap text-xs leading-5">{SUPER_GROK_REVIEW}</pre>
              <figure>
                <h3 className="text-primary">Figure 1. S1R1U$ SANDBOX full logic diagram</h3>
                <p className="text-xs text-disclosure">S1R1US.ai Proprietary · 2026-09-26 01:43 EDT · stamp on image · overlay never votes HIGH</p>
                <img
                  src="/admin-media/S1R1US-full-logic-diagram-20260926-0143EDT.png"
                  alt="Admin media. S1R1U$ SANDBOX full logic diagram. 2026-09-26 01:43 EDT. S1R1US.ai Proprietary. Overlay never votes HIGH. Not public documentation."
                  title="Figure 1. S1R1U$ SANDBOX full logic diagram · 2026-09-26 01:43 EDT · S1R1US.ai Proprietary"
                  className="mt-2 w-full rounded-lg border border-border"
                />
              </figure>
              <figure>
                <h3 className="text-primary">Figure 2. S1R1U$ all bot functions flowchart</h3>
                <p className="text-xs text-disclosure">S1R1US.ai Proprietary · 2026-09-26 01:43 EDT · GO-2 overlay awareness only · never HIGH</p>
                <img
                  src="/admin-media/S1R1US-bot-functions-flowchart-20260926-0143EDT.png"
                  alt="Admin media. S1R1U$ all bot functions flowchart. 2026-09-26 01:43 EDT. S1R1US.ai Proprietary. Overlay never votes HIGH. Not public documentation."
                  title="Figure 2. S1R1U$ all bot functions flowchart · 2026-09-26 01:43 EDT · S1R1US.ai Proprietary"
                  className="mt-2 w-full rounded-lg border border-border"
                />
              </figure>
            </article>
          )}
          {page === "media" && (
            <article className="mx-auto flex max-w-5xl flex-col gap-6 text-sm text-muted">
              <header>
                <h2 className="text-fg">MEDIA</h2>
                <p className="text-sm text-primary">S1R1US AI SANDBOX library</p>
                <p className="text-xs text-disclosure">
                  INTERNAL. Same stamped images as the research paper. Not on FAQ, roadmap, sitemap.xml,
                  live s1r1us.ai, or GitHub. Stamp 2026-09-26 01:43 EDT · S1R1US.ai Proprietary. Overlay never votes HIGH.
                </p>
              </header>
              <section className="rounded-xl border border-border bg-surface p-4">
                <h3 className="text-fg">S1R1US AI SANDBOX library</h3>
                <figure className="mt-4">
                  <h4 className="text-primary">Figure 1. S1R1U$ SANDBOX full logic diagram</h4>
                  <p className="text-xs">From research paper · 2026-09-26 01:43 EDT · S1R1US.ai Proprietary</p>
                  <img
                    src="/admin-media/S1R1US-full-logic-diagram-20260926-0143EDT.png"
                    alt="S1R1US AI SANDBOX library. Figure 1. 2026-09-26 01:43 EDT. S1R1US.ai Proprietary. Overlay never votes HIGH."
                    title="S1R1US AI SANDBOX library — Figure 1 · 2026-09-26 01:43 EDT · S1R1US.ai Proprietary"
                    className="mt-2 w-full rounded-lg border border-border"
                  />
                </figure>
                <figure className="mt-6">
                  <h4 className="text-primary">Figure 2. S1R1U$ all bot functions flowchart</h4>
                  <p className="text-xs">From research paper · 2026-09-26 01:43 EDT · S1R1US.ai Proprietary</p>
                  <img
                    src="/admin-media/S1R1US-bot-functions-flowchart-20260926-0143EDT.png"
                    alt="S1R1US AI SANDBOX library. Figure 2. 2026-09-26 01:43 EDT. S1R1US.ai Proprietary. Overlay never votes HIGH."
                    title="S1R1US AI SANDBOX library — Figure 2 · 2026-09-26 01:43 EDT · S1R1US.ai Proprietary"
                    className="mt-2 w-full rounded-lg border border-border"
                  />
                </figure>
                <figure className="mt-6">
                  <h4 className="text-primary">Additional · P@MP mascot baseline</h4>
                  <p className="text-xs">Original mascot. No sun overlay. Original dog. 2026-09-16 20:28 EDT. Does not overwrite prior figures.</p>
                  <img
                    src="/admin-media/robot-girl-blue-hat-dark-sun-20260916-2024EDT.gif"
                    alt="P@MP.fun mascot baseline. Darker sun. Original dog face. No tongue animation. Additional media."
                    title="Additional P@MP mascot baseline · darker sun · original dog · 2026-09-16 20:24 EDT"
                    className="mt-2 w-full max-w-md rounded-lg border border-border"
                  />
                </figure>
                <figure className="mt-6">
                  <h4 className="text-primary">Additional · S1R1US.ai logo</h4>
                  <p className="text-xs">Extra logo. Does not replace og.jpg. 2026-09-16 20:24 EDT.</p>
                  <img
                    src="/admin-media/S1R1US-logo-additional-20260916-2024EDT.jpg"
                    alt="Additional S1R1US.ai logo. Chrome S1 mark. Does not overwrite existing logos."
                    title="Additional S1R1US.ai logo · 2026-09-16 20:24 EDT"
                    className="mt-2 w-40 rounded-lg border border-border"
                  />
                </figure>
                <figure className="mt-6">
                  <h4 className="text-primary">Additional · S1R1US.ai banner</h4>
                  <p className="text-xs">Extra banner. Does not replace og.jpg. 2026-09-16 20:24 EDT.</p>
                  <img
                    src="/admin-media/S1R1US-banner-additional-20260916-2024EDT.jpg"
                    alt="Additional S1R1US.ai banner. Does not overwrite existing banners."
                    title="Additional S1R1US.ai banner · 2026-09-16 20:24 EDT"
                    className="mt-2 w-full rounded-lg border border-border"
                  />
                </figure>

                <figure className="mt-6">
                  <h4 className="text-primary">Additional · BLM 40x40</h4>
                  <p className="text-xs">Animated 40x40 GIF. Separate media. Does not overwrite prior files. 2026-09-16 20:37 EDT.</p>
                  <img
                    src="/admin-media/BLM-40x40-20260916-2037EDT.gif"
                    alt="BLM 40x40 animated GIF from P@MP mascot. Separate file. Does not overwrite existing media."
                    title="BLM 40x40 animated · additional media · 2026-09-16 20:37 EDT"
                    width={40}
                    height={40}
                    className="mt-2 border border-border"
                    style={{ width: 40, height: 40, imageRendering: "pixelated" }}
                  />
                </figure>
              </section>
            </article>
          )}
        </main>
      </div>
      <footer className="shrink-0 border-t border-border px-4 py-4 text-xs text-muted">
        <span className="text-disclosure">DISCLOSURE:</span> {SECURITY_LINE} Education sandbox.
        P@MP.fun is a separate data plane. Not financial advice.
      </footer>
    </div>
  );
}

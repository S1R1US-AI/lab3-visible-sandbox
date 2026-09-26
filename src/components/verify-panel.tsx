import { useState } from "react";
import { BYO_FREE_CANDIDATES, BYO_SOURCES, parseByoPaste, readByo, writeByo, type ByoOverlay } from "../lib/byo-data.ts";
import { readLastVerify, runVerify, type VerifyReport } from "../lib/verify-checkpoint.ts";

export function VerifyPanel() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [report, setReport] = useState<VerifyReport | null>(() => readLastVerify());
  const [paste, setPaste] = useState("");
  const [byo, setByo] = useState<ByoOverlay>(() => readByo());

  const save = async (trigger: "checkpoint-save" | "build-checkpoint") => {
    setBusy(true);
    setErr(null);
    try {
      const r = await runVerify(trigger);
      setReport(r);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "VERIFY failed");
    } finally {
      setBusy(false);
    }
  };

  const applyPaste = () => {
    const p = parseByoPaste(paste);
    if ("err" in p) {
      setErr(p.err);
      return;
    }
    writeByo(p);
    setByo(p);
    setErr(null);
  };

  return (
    <section data-verify-panel="" className="rounded-xl border border-border bg-surface p-4">
      <h3 className="text-sm font-semibold tracking-widest text-primary">VERIFY</h3>
      <p className="mt-1 text-xs text-muted">
        Runs only on SAVE CHECKPOINT or BUILD CHECKPOINT. Never on desk poll. Logic stays locked unless
        a change keeps every mandate (never sell · overlay never votes HIGH · CLIP = HIGH + 7 ON + 1-6 ON).
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          data-verify-save=""
          className="min-h-11 rounded-lg border border-primary px-3 text-sm text-primary"
          disabled={busy}
          onClick={() => void save("checkpoint-save")}
        >
          {busy ? "VERIFY…" : "SAVE CHECKPOINT"}
        </button>
        <button
          type="button"
          data-verify-build=""
          className="min-h-11 rounded-lg border border-cyan px-3 text-sm text-cyan"
          disabled={busy}
          onClick={() => void save("build-checkpoint")}
        >
          BUILD CHECKPOINT
        </button>
      </div>
      {err ? <p className="mt-2 text-xs text-danger">{err}</p> : null}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs text-cyan">BYO overlay (never HIGH)</div>
          <textarea
            className="mt-2 min-h-24 w-full rounded-md border border-border bg-raised p-2 text-xs text-fg"
            placeholder='{"source":"admin","ibitPct":-0.2,"ethaPct":0.4,"gldPct":0.3}'
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
          />
          <button
            type="button"
            className="mt-2 min-h-11 rounded-lg border border-border px-3 text-sm text-fg"
            onClick={applyPaste}
          >
            LOAD BYO JSON
          </button>
          <p className="mt-2 text-[10px] text-disclosure">
            {byo.source ? `${byo.source} · ${byo.asOf}` : "No BYO paste loaded."} Keys rejected. Overlay
            never votes HIGH.
          </p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs text-cyan">Sources (free / live)</div>
          <ul className="mt-2 space-y-1 text-[11px] text-muted">
            {BYO_SOURCES.map((s) => (
              <li key={s.id}>
                {s.name} · {s.free ? "free" : "paid"} · {s.live ? "live" : "paste"} · never HIGH
              </li>
            ))}
          </ul>
          <div className="mt-2 text-xs text-cyan">Free candidates (not wired)</div>
          <ul className="mt-1 space-y-1 text-[11px] text-muted">
            {BYO_FREE_CANDIDATES.map((c) => (
              <li key={c.name}>
                {c.name} — {c.use}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {report ? (
        <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-raised p-3 text-[11px] leading-5 text-fg">
          {report.markdown}
        </pre>
      ) : (
        <p className="mt-3 text-xs text-muted">No VERIFY report yet. Click SAVE CHECKPOINT.</p>
      )}
    </section>
  );
}

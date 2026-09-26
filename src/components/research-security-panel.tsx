import { useEffect, useMemo, useState } from "react";
import {
  GRAD_SELECT,
  articleHref,
  passedGraduateProjects,
  runResearchSecurityScan,
  type ResearchScan,
} from "@/lib/research-security";
import { useGradPick, useResolvedGrad } from "@/lib/grad-pick-store";
import { cn } from "@/lib/cn";

function ResearchLink({ href, children }: { href: string; children?: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="break-all text-cyan underline"
    >
      {children ?? href}
    </a>
  );
}

export function ResearchSecurityPanel() {
  const [run, setRun] = useState(() => runResearchSecurityScan());
  const rows = useMemo(() => run.scans, [run]);
  const passed = useMemo(() => passedGraduateProjects(), []);
  const pick = useGradPick();
  const resolved = useResolvedGrad();

  useEffect(() => {
    pick.hydrate();
  }, []);

  return (
    <section className="rounded-xl border border-border bg-surface p-4" data-research-security>
      <header className="mb-3">
        <h3 className="text-primary">Research security function</h3>
        <p className="text-xs text-disclosure">
          S1R1US.ai Proprietary · inside Neural Network (GO-6) · {run.stamp}
        </p>
        <p className="mt-1 text-xs leading-5">
          Scans official university hosts and Google Scholar only. Checks claims against officially
          posted live tape. Requires a verifiable real-world use case. REJECT (unprovable,
          unverifiable, false, misleading, unofficial) never enters the Neural Network, recursive
          learning, or admin full awareness. Extra scans cover B0Ts, internal and external AI
          agents, and online research. Does not vote HIGH. Never sells. Google Scholar search
          URLs (?q=) are blocked by Google as automated queries — Analysis opens Scholar home,
          Help, or a citations page instead. X / unofficial pages are verified live links; they
          still REJECT for Neural Network.
        </p>
      </header>
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
        <span className="text-primary">PASS {run.passed}</span>
        <span className="text-danger">REJECT {run.rejected}</span>
        <span className="text-muted">scanned {run.scanned}</span>
        <button
          type="button"
          className="min-h-11 rounded-md border border-primary px-3 py-2 text-primary"
          onClick={() => setRun(runResearchSecurityScan())}
        >
          RUN SCAN
        </button>
      </div>

      <div
        className="mb-4 rounded-lg border border-primary/40 p-3"
        data-grad-pick=""
      >
        <h4 className="text-fg">Graduate university research project</h4>
        <p className="mt-1 text-xs text-muted">
          PASS only. Authenticity + verifiable real-world bitcoin application. Admin selects. Does
          not vote HIGH. Never sells.
        </p>
        <label className="mt-2 block text-xs text-muted">
          MAKE YOUR SELECTION
          <select
            className="mt-1 min-h-11 w-full rounded-md border border-border bg-bg px-2 text-fg"
            value={pick.id}
            onChange={(e) => pick.setProject(e.target.value)}
            data-grad-select=""
          >
            <option value={GRAD_SELECT}>MAKE YOUR SELECTION</option>
            {passed.map((s) => (
              <option key={s.candidate.id} value={s.candidate.id}>
                {s.candidate.title}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 flex min-h-11 items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={resolved.onPaper}
            disabled={pick.id === GRAD_SELECT}
            onChange={(e) => pick.setQuoteOnPaper(e.target.checked)}
            data-grad-quote=""
          />
          <span>Documented quote on the system admin research paper</span>
        </label>
        <label className="flex min-h-11 items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={resolved.nn}
            disabled={pick.id === GRAD_SELECT}
            onChange={(e) => pick.setFeedNn(e.target.checked)}
            data-grad-nn=""
          />
          <span>
            Add to Neural Network — feeds full system awareness + recursive learning (Agent 9). Never
            HIGH.
          </span>
        </label>
        <p className={cn("mt-2 text-xs", resolved.nn ? "text-primary" : "text-muted")}>
          {resolved.awarenessLine}
        </p>
        {resolved.quote && pick.id !== GRAD_SELECT ? (
          <blockquote className="mt-2 border-l-2 border-primary pl-3 text-xs leading-5 text-fg">
            {resolved.quote}
            <p className="mt-2 break-all text-xs">
              <ResearchLink href={articleHref(resolved.readUrl || resolved.url)} />
            </p>
            {resolved.helpUrl ? (
              <p className="mt-1 text-xs">
                <ResearchLink href={resolved.helpUrl}>Google Scholar Help</ResearchLink>
              </p>
            ) : null}
          </blockquote>
        ) : null}
      </div>

      <div className="grid gap-2">
        {rows.map((s) => (
          <ScanRow key={s.candidate.id} scan={s} />
        ))}
      </div>
      <h4 className="mt-4 text-fg">Extra scans · bots / agents / online</h4>
      <p className="mb-2 text-xs text-muted">
        If a surface is REJECT, that source is not used by CLIP, HIGH, recursive learning, or
        admin awareness.
      </p>
      <div className="grid gap-2">
        {run.surfaces.map((s) => (
          <article key={s.surface} className="rounded-lg border border-border p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h5 className="text-fg">
                {s.surface} · {s.kind}
              </h5>
              <span className={cn("text-xs font-semibold", s.allowed ? "text-primary" : "text-danger")}>
                {s.allowed ? "PASS" : "REJECT"}
              </span>
            </div>
            <p className="break-all text-xs">
              <ResearchLink href={articleHref(s.url)} />
            </p>
            <p className="mt-1 text-xs">{s.scan.note}</p>
            <a
              href={articleHref(s.url)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-cyan underline"
            >
              open article
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ScanRow({ scan }: { scan: ResearchScan }) {
  const pass = scan.verdict === "PASS";
  const href = articleHref(scan.candidate.url, scan.candidate.readUrl);
  const help = scan.candidate.helpUrl;
  return (
    <article className="rounded-lg border border-border p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-fg">
          <ResearchLink href={href}>{`${scan.candidate.title} · ${scan.candidate.kind}`}</ResearchLink>
        </h4>
        <span className={cn("text-xs font-semibold", pass ? "text-primary" : "text-danger")}>
          {scan.verdict}
        </span>
      </div>
      <p className="mt-1 break-all text-xs">
        <ResearchLink href={href} />
      </p>
      <p className="mt-1 text-xs">{scan.note}</p>
      <div className="mt-2 flex flex-wrap gap-4">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center text-xs font-semibold text-cyan underline"
        >
          open article
        </a>
        {help ? (
          <a
            href={help}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-xs font-semibold text-cyan underline"
          >
            Scholar Help
          </a>
        ) : null}
      </div>
    </article>
  );
}
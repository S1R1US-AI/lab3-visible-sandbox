/** System admin research paper quote + NN awareness. Never HIGH. */
import { useResolvedGrad } from "@/lib/grad-pick-store";
import { cn } from "@/lib/cn";

export function GradResearchQuotePaper() {
  const g = useResolvedGrad();
  if (!g.onPaper || !g.quote) return null;
  return (
    <section className="rounded-xl border border-primary/40 bg-surface p-4" data-grad-quote-paper="">
      <h3 className="text-primary">Documented quote · graduate university research</h3>
      <p className="text-xs text-disclosure">
        Pre-screened PASS · authenticity + real-world bitcoin application · S1R1US.ai Proprietary
      </p>
      <p className="mt-2 text-sm font-semibold text-fg">{g.title}</p>
      <blockquote className="mt-2 border-l-2 border-primary pl-3 text-sm leading-6 text-fg">
        {g.quote}
      </blockquote>
      <p className="mt-2 break-all text-xs">
        <a href={g.readUrl || g.url} target="_blank" rel="noreferrer" className="text-cyan underline">
          {g.readUrl || g.url}
        </a>
      </p>
      {g.helpUrl ? (
        <p className="mt-1 text-xs">
          <a href={g.helpUrl} target="_blank" rel="noreferrer" className="text-cyan underline">
            Google Scholar Help
          </a>
        </p>
      ) : null}
      <p className={cn("mt-2 text-xs", g.nn ? "text-primary" : "text-muted")}>{g.awarenessLine}</p>
    </section>
  );
}

export function GradAwarenessLine() {
  const g = useResolvedGrad();
  return (
    <p className={cn("text-xs", g.nn ? "text-primary" : "text-muted")} data-grad-awareness="">
      {g.awarenessLine}
    </p>
  );
}
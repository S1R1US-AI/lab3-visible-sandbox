/** Typed Jev contract. Jev never picks a size, never writes the FAQ, and never sells. */

export const JEV_CUTOFF = 0.7;
export const JEV_QUESTION = "sleeve_add_allowed" as const;

const FORBIDDEN = ["sell", "size", "faq", "nav"];

export type JevVerdict = {
  action: "HOLD" | "PASS";
  probability: number | null;
  cutoff: number;
  source: "rule" | "jev" | "unconfigured" | "error";
  question: typeof JEV_QUESTION;
  reason: string;
};

export function questionIsForbidden(id: string) {
  const name = id.toLowerCase();
  return FORBIDDEN.some((word) => name.includes(word));
}

export function hold(source: JevVerdict["source"], reason: string, probability: number | null = null): JevVerdict {
  return {
    action: "HOLD",
    probability,
    cutoff: JEV_CUTOFF,
    source,
    question: JEV_QUESTION,
    reason,
  };
}

/** A score under the cutoff is HOLD. The number is the check. There is no size in this result. */
export function verdictFromProbability(probability: number, cutoff = JEV_CUTOFF): JevVerdict {
  if (!Number.isFinite(probability) || probability < 0 || probability > 1) {
    return hold("error", "Jev probability was not between 0 and 1 · HOLD");
  }
  if (probability < cutoff) {
    return hold("jev", `Jev ${JEV_QUESTION} ${probability.toFixed(2)} < ${cutoff.toFixed(2)} · HOLD`, probability);
  }
  return {
    action: "PASS",
    probability,
    cutoff,
    source: "jev",
    question: JEV_QUESTION,
    reason: `Jev ${JEV_QUESTION} ${probability.toFixed(2)} ≥ ${cutoff.toFixed(2)} · proposal only · no size · no sell`,
  };
}

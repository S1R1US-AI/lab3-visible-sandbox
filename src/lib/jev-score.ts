import { createServerFn } from "@tanstack/react-start";
import { JEV_QUESTION, hold, holdWhenKeyMissing, questionIsForbidden, verdictFromProbability, type JevVerdict } from "@/lib/jev-gate";

export type SleeveAsk = {
  btcUsd: number | null;
  rsi14: number | null;
  fearGreed: number | null;
  fearLabel: string;
  stance: string;
  gap: string;
};

function ask(data: unknown): SleeveAsk {
  const row = data && typeof data === "object" ? (data as Partial<SleeveAsk>) : {};
  return {
    btcUsd: typeof row.btcUsd === "number" ? row.btcUsd : null,
    rsi14: typeof row.rsi14 === "number" ? row.rsi14 : null,
    fearGreed: typeof row.fearGreed === "number" ? row.fearGreed : null,
    fearLabel: typeof row.fearLabel === "string" ? row.fearLabel.slice(0, 40) : "",
    stance: typeof row.stance === "string" ? row.stance.slice(0, 40) : "",
    gap: typeof row.gap === "string" ? row.gap.slice(0, 20) : "",
  };
}

export const scoreSleeveAdd = createServerFn({ method: "POST" })
  .inputValidator(ask)
  .handler(async ({ data }): Promise<JevVerdict> => {
    if (questionIsForbidden(JEV_QUESTION)) {
      return hold("rule", "Jev refused a forbidden question · HOLD");
    }
    const key = process.env.TYPESAFE_API_KEY;
    const missing = holdWhenKeyMissing(key);
    if (missing) return missing;
    try {
      const res = await fetch("https://api.typesafe.ai/v1/systemone", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "jev-latest",
          state: {
            btcUsd: data.btcUsd,
            rsi14: data.rsi14,
            fearGreed: data.fearGreed,
            fearLabel: data.fearLabel,
            stance: data.stance,
            gap: data.gap,
            contract: "Paper proposal only. Do not choose a size. Do not sell. Do not write FAQ.",
          },
          questions: {
            [JEV_QUESTION]: {
              type: "noul",
              instructions:
                "Is a paper sleeve add allowed, or must the desk HOLD? Do not choose a size. Do not sell.",
              criteria: {
                true: "The tape is not a crowded chase. A proposal may be shown. No size. No sell.",
                false: "Crowded, euphoric, unclear, or a chase. HOLD.",
              },
            },
          },
        }),
      });
      if (!res.ok) return hold("error", `Jev ${res.status} · HOLD`);
      const body = (await res.json()) as { answers?: Record<string, { noul?: number }> };
      const probability = body.answers?.[JEV_QUESTION]?.noul;
      if (typeof probability !== "number") return hold("error", "Jev answer missing · HOLD");
      return verdictFromProbability(probability);
    } catch {
      return hold("error", "Jev unreachable · HOLD");
    }
  });

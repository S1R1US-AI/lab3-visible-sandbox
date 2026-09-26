/** Executable never-sell / never-short locks. Flags alone are not enough — mutate paths must call these. */

export type MandateCheck = { ok: true } | { ok: false; reason: string };

function normalizeIntent(intent: string): string {
  return String(intent ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s_-]+/g, "_");
}

/** REJECT when intent is a sell against the core stack. */
export function assertNeverSell(intent: string): MandateCheck {
  const n = normalizeIntent(intent);
  if (n === "SELL" || n.startsWith("SELL_") || n.endsWith("_SELL") || n.includes("_SELL_")) {
    return { ok: false, reason: "never_sell: sell intent rejected against core BTC stack" };
  }
  // Plain word SELL as whole token (e.g. "SELL CORE")
  if (/\bSELL\b/.test(n.replace(/_/g, " "))) {
    return { ok: false, reason: "never_sell: sell intent rejected against core BTC stack" };
  }
  return { ok: true };
}

/** REJECT when intent is a short against the core stack. */
export function assertNeverShort(intent: string): MandateCheck {
  const n = normalizeIntent(intent);
  if (n === "SHORT" || n.startsWith("SHORT_") || n.endsWith("_SHORT") || n.includes("_SHORT_")) {
    return { ok: false, reason: "never_short: short intent rejected against core BTC stack" };
  }
  if (/\bSHORT\b/.test(n.replace(/_/g, " "))) {
    return { ok: false, reason: "never_short: short intent rejected against core BTC stack" };
  }
  return { ok: true };
}

/** Combined gate for mutate paths that could emit SELL or SHORT. */
export function rejectSellOrShort(intent: string): MandateCheck {
  const sell = assertNeverSell(intent);
  if (!sell.ok) return sell;
  return assertNeverShort(intent);
}

/** Throw variant for hard mutate fences. */
export function mustNeverSellOrShort(intent: string): void {
  const check = rejectSellOrShort(intent);
  if (!check.ok) throw new Error(check.reason);
}

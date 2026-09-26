import { createServerFn } from "@tanstack/react-start";

export type PublicTapeBody = {
  ok?: boolean;
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
  tape?: {
    btcUsd?: number;
    changePct?: number;
    rsi14?: number;
    fetchedAt?: string;
    fearGreed?: { value?: number; label?: string };
  };
  bots?: { id?: string; stance?: string; summary?: string }[];
};

export type PublicTapeResult = {
  status: number;
  body: PublicTapeBody | null;
};

let cached: { at: number; value: PublicTapeResult } | null = null;
let pending: Promise<PublicTapeResult> | null = null;
const TTL_MS = 30_000;

async function loadTape(): Promise<PublicTapeResult> {
  const now = Date.now();
  if (cached && now - cached.at < TTL_MS && cached.value.status === 200) return cached.value;
  if (pending) return pending;
  pending = (async () => {
    try {
      const upstream = await fetch("https://s1r1us.ai/api/agent/call", {
        headers: { accept: "application/json", "user-agent": "Mozilla/5.0 S1R1US-sandbox" },
        signal: AbortSignal.timeout(8000),
      });
      const read = async (res: Response): Promise<PublicTapeBody | null> => {
        const json = (await res.json().catch(() => null)) as PublicTapeBody | null;
        return json && typeof json === "object" ? json : null;
      };
      let status = upstream.status;
      let body = await read(upstream);
      if (status === 429) {
        await new Promise((r) => setTimeout(r, 1500));
        const again = await fetch("https://s1r1us.ai/api/agent/call", {
          headers: { accept: "application/json", "user-agent": "Mozilla/5.0 S1R1US-sandbox" },
          signal: AbortSignal.timeout(8000),
        });
        status = again.status;
        body = await read(again);
      }
      const value = { status, body };
      if (status === 200) cached = { at: Date.now(), value };
      else if (cached) return cached.value;
      return value;
    } catch {
      if (cached) return cached.value;
      return { status: 502, body: null };
    } finally {
      pending = null;
    }
  })();
  return pending;
}

/** Server pull of the public read-only agent. The browser never calls s1r1us.ai. */
export const getPublicTape = createServerFn({ method: "GET" }).handler(async () => loadTape());

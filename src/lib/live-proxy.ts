/** Same-origin live tape. Works in the preview and in the deployed build. */

const cache = new Map<string, { at: number; status: number; type: string; body: Uint8Array }>();
const inflight = new Map<string, Promise<{ status: number; type: string; body: Uint8Array }>>();
const TTL_MS = 60_000;

function asBuffer(body: Uint8Array): ArrayBuffer {
  const out = new ArrayBuffer(body.byteLength);
  new Uint8Array(out).set(body);
  return out;
}

function cachedResponse(hit: { status: number; type: string; body: Uint8Array }) {
  return new Response(asBuffer(hit.body), {
    status: hit.status,
    headers: { "content-type": hit.type, "cache-control": "no-store" },
  });
}

async function pullUpstream(target: string) {
  const load = async () => {
    const upstream = await fetch(target, {
      headers: {
        accept: "application/json",
        "user-agent": "Mozilla/5.0 S1R1US-sandbox",
      },
      signal: AbortSignal.timeout(8000),
    });
    const body = new Uint8Array(await upstream.arrayBuffer());
    return {
      status: upstream.status,
      type: upstream.headers.get("content-type") ?? "application/json",
      body,
    };
  };
  let result = await load();
  if (result.status === 429 || result.status === 502) {
    await new Promise((r) => setTimeout(r, 1200));
    result = await load();
  }
  return result;
}

export async function proxyLiveGet(request: Request, strip: string, origin: string) {
  const url = new URL(request.url);
  const path = url.pathname.replace(new RegExp(`^${strip}`), "") || "/";
  const target = new URL(`${path}${url.search}`, origin);
  const key = target.toString();
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && now - hit.at < TTL_MS) return cachedResponse(hit);

  let pending = inflight.get(key);
  if (!pending) {
    pending = pullUpstream(key).finally(() => inflight.delete(key));
    inflight.set(key, pending);
  }
  try {
    const result = await pending;
    if (result.status >= 200 && result.status < 300) {
      cache.set(key, { at: Date.now(), ...result });
      return cachedResponse(result);
    }
    if (hit) return cachedResponse(hit);
    return new Response(asBuffer(result.body), {
      status: result.status,
      headers: { "content-type": result.type, "cache-control": "no-store" },
    });
  } catch {
    if (hit) return cachedResponse(hit);
    return new Response(JSON.stringify({ error: "upstream unreachable" }), {
      status: 502,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  }
}

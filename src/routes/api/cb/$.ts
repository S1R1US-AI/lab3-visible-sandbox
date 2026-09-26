import { createFileRoute } from "@tanstack/react-router";
import { proxyLiveGet } from "@/lib/live-proxy";

export const Route = createFileRoute("/api/cb/$")({
  server: {
    handlers: {
      GET: ({ request }) => proxyLiveGet(request, "/api/cb", "https://api.exchange.coinbase.com"),
    },
  },
});

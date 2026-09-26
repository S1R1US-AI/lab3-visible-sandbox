import { createFileRoute } from "@tanstack/react-router";
import { proxyLiveGet } from "@/lib/live-proxy";

export const Route = createFileRoute("/api/pump/$")({
  server: {
    handlers: {
      GET: ({ request }) => proxyLiveGet(request, "/api/pump", "https://api.coingecko.com/api/v3"),
    },
  },
});

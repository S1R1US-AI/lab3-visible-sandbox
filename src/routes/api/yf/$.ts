import { createFileRoute } from "@tanstack/react-router";
import { proxyLiveGet } from "@/lib/live-proxy";

export const Route = createFileRoute("/api/yf/$")({
  server: {
    handlers: {
      GET: ({ request }) => proxyLiveGet(request, "/api/yf", "https://query1.finance.yahoo.com"),
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { proxyLiveGet } from "@/lib/live-proxy";

export const Route = createFileRoute("/api/paprika/$")({
  server: {
    handlers: {
      GET: ({ request }) => proxyLiveGet(request, "/api/paprika", "https://api.coinpaprika.com"),
    },
  },
});

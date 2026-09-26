import { createFileRoute } from "@tanstack/react-router";
import { proxyLiveGet } from "@/lib/live-proxy";

export const Route = createFileRoute("/api/fng/$")({
  server: {
    handlers: {
      GET: ({ request }) => proxyLiveGet(request, "/api/fng", "https://api.alternative.me"),
    },
  },
});

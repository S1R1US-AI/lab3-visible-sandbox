import { createFileRoute } from "@tanstack/react-router";
import { proxyLiveGet } from "@/lib/live-proxy";

export const Route = createFileRoute("/api/xau/$")({
  server: {
    handlers: {
      GET: ({ request }) => proxyLiveGet(request, "/api/xau", "https://api.gold-api.com"),
    },
  },
});

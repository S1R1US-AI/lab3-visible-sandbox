import { createFileRoute } from "@tanstack/react-router";
import { proxyLiveGet } from "@/lib/live-proxy";

export const Route = createFileRoute("/api/s1/$")({
  server: {
    handlers: {
      GET: ({ request }) => proxyLiveGet(request, "/api/s1", "https://s1r1us.ai"),
    },
  },
});

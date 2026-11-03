import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "verynize-marketing",
    domains: ["verynize-marketing.gayaloo.app"],
    entrypoint: "@tanstack/react-start/server-entry",
    compatibilityDate: "2026-10-28",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none" },
    observability: { enabled: true },
  },
});

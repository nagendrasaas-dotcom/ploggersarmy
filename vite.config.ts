// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Only set by the GitHub Pages workflow (.github/workflows/deploy-pages.yml).
// Lovable's own build leaves these unset, so the published app is unchanged.
const staticExport = process.env.BUILD_STATIC === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticExport
      ? {
          // Render every page to plain HTML so GitHub Pages can serve it.
          prerender: {
            enabled: true,
            crawlLinks: true,
            autoSubfolderIndex: false,
            failOnError: true,
          },
        }
      : {}),
  },
  ...(staticExport
    ? {
        vite: { base: process.env.PAGES_BASE || "/" },
        nitro: {
          preset: process.env.NITRO_PRESET || "node",
          output: { dir: ".static/server", publicDir: ".static/public" },
        },
      }
    : {}),
  ),
});

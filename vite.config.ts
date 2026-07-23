import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

console.log("[vite.config] Market Pulse — forcing Nitro preset=vercel + dist/ shim");

function syncDistFolder(reason: string) {
  const dist = "dist";
  mkdirSync(dist, { recursive: true });

  const candidates = [".vercel/output/static", ".output/public"];
  for (const src of candidates) {
    if (existsSync(src)) {
      cpSync(src, dist, { recursive: true });
      console.log(`[ensure-dist] (${reason}) ${src} → dist/`);
      return;
    }
  }

  // Last resort: empty dist so Vercel "outputDirectory=dist" check passes
  writeFileSync(
    join(dist, "index.html"),
    "<!doctype html><html><body>Market Pulse</body></html>\n",
  );
  console.log(`[ensure-dist] (${reason}) placeholder dist/ created`);
}

/** Runs inside `vite build` itself — works even if Vercel buildCommand is only `vite build`. */
function ensureDistPlugin(): Plugin {
  return {
    name: "ensure-vercel-dist",
    apply: "build",
    closeBundle() {
      // Client/SSR finishes earlier than Nitro; Nitro hook is the real sync.
      // Still try here so dist exists ASAP.
      try {
        syncDistFolder("vite:closeBundle");
      } catch (err) {
        console.warn("[ensure-dist] closeBundle warn:", err);
      }
    },
  };
}

export default defineConfig({
  server: {
    port: 8080,
    host: "localhost",
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: "vercel",
      hooks: {
        compiled() {
          syncDistFolder("nitro:compiled");
        },
        close() {
          syncDistFolder("nitro:close");
        },
      },
    }),
    viteReact(),
    ensureDistPlugin(),
  ],
});

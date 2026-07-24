import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** Fix header-only asset routes so static CSS/JS are served (not SSR 404). */
function patchVercelConfigRoutes() {
  const configPath = join(process.cwd(), ".vercel", "output", "config.json");
  if (!existsSync(configPath)) return;

  try {
    const cfg = JSON.parse(readFileSync(configPath, "utf8"));
    if (!Array.isArray(cfg.routes)) return;

    let changed = false;
    cfg.routes = cfg.routes.map((route: Record<string, unknown>) => {
      if (
        route?.src &&
        route?.headers &&
        !route.dest &&
        !route.handle &&
        route.continue !== true
      ) {
        changed = true;
        return { ...route, continue: true };
      }
      return route;
    });

    const hasFs = cfg.routes.some(
      (r: Record<string, unknown>) => r?.handle === "filesystem",
    );
    const hasServer = cfg.routes.some(
      (r: Record<string, unknown>) =>
        typeof r?.dest === "string" && String(r.dest).includes("__server"),
    );
    if (!hasFs) {
      cfg.routes.push({ handle: "filesystem" });
      changed = true;
    }
    if (!hasServer) {
      cfg.routes.push({ src: "/(.*)", dest: "/__server" });
      changed = true;
    }

    const hasV2 = cfg.routes.some(
      (r: Record<string, unknown>) =>
        typeof r?.src === "string" && String(r.src).includes("assets-v2"),
    );
    if (!hasV2) {
      cfg.routes.unshift({
        src: "/assets-v2/(.*)",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true,
      });
      changed = true;
    }

    if (changed) {
      writeFileSync(configPath, JSON.stringify(cfg, null, 2) + "\n");
      console.log("[vercel-output] patched config.json");
    }
  } catch (err) {
    console.warn("[vercel-output] patch failed:", err);
  }
}

export default defineConfig({
  server: {
    port: 8080,
    host: "localhost",
  },
  // New folder avoids CDN year-cache of previous /assets/* 404 responses
  build: {
    assetsDir: "assets-v2",
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: "vercel",
      hooks: {
        close() {
          patchVercelConfigRoutes();
        },
      },
    }),
    viteReact(),
  ],
});

import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
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

    if (changed) {
      writeFileSync(configPath, JSON.stringify(cfg, null, 2) + "\n");
      console.log("[vercel-output] patched config.json routes with continue:true");
    }
  } catch (err) {
    console.warn("[vercel-output] patch failed:", err);
  }
}

function cleanIncompletePrebuilt(): Plugin {
  return {
    name: "clean-incomplete-vercel-prebuilt",
    apply: "build",
    buildStart() {
      const out = join(process.cwd(), ".vercel", "output");
      const cfg = join(out, "config.json");
      if (existsSync(out) && !existsSync(cfg)) {
        console.warn(
          "[vercel-output] incomplete .vercel/output — deleting before build",
        );
        rmSync(join(process.cwd(), ".vercel"), { recursive: true, force: true });
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
    cleanIncompletePrebuilt(),
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

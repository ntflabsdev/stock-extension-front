import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

function writeVercelBuildOutputApiFiles() {
  const out = join(process.cwd(), ".vercel", "output");
  const fnDir = join(out, "functions", "__server.func");
  const entry = join(fnDir, "index.mjs");

  if (!existsSync(out)) {
    console.warn("[vercel-output] .vercel/output missing — skip config write");
    return;
  }

  mkdirSync(fnDir, { recursive: true });

  const configPath = join(out, "config.json");
  writeFileSync(
    configPath,
    JSON.stringify(
      {
        version: 3,
        routes: [
          {
            headers: { "cache-control": "public, max-age=31536000, immutable" },
            src: "/assets/(.*)",
          },
          { handle: "filesystem" },
          { src: "/(.*)", dest: "/__server" },
        ],
      },
      null,
      2,
    ) + "\n",
  );
  console.log("[vercel-output] wrote", configPath);

  const vcPath = join(fnDir, ".vc-config.json");
  writeFileSync(
    vcPath,
    JSON.stringify(
      {
        runtime: "nodejs20.x",
        handler: "index.mjs",
        launcherType: "Nodejs",
        shouldAddHelpers: false,
        supportsResponseStreaming: true,
      },
      null,
      2,
    ) + "\n",
  );
  console.log("[vercel-output] wrote", vcPath);

  if (!existsSync(entry)) {
    throw new Error(`[vercel-output] missing server entry: ${entry}`);
  }
}

/** Wipe incomplete prebuilt output that makes Vercel skip a real build. */
function cleanIncompletePrebuilt(): Plugin {
  return {
    name: "clean-incomplete-vercel-prebuilt",
    apply: "build",
    buildStart() {
      const out = join(process.cwd(), ".vercel", "output");
      const cfg = join(out, "config.json");
      if (existsSync(out) && !existsSync(cfg)) {
        console.warn(
          "[vercel-output] incomplete .vercel/output found (no config.json) — deleting so Vercel does not use prebuilt",
        );
        rmSync(join(process.cwd(), ".vercel"), { recursive: true, force: true });
      }
    },
  };
}

function ensureVercelConfigPlugin(): Plugin {
  return {
    name: "ensure-vercel-config-json",
    apply: "build",
    closeBundle() {
      // Nitro may still be writing; final write also runs in nitro hooks.
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
        compiled() {
          writeVercelBuildOutputApiFiles();
        },
        close() {
          writeVercelBuildOutputApiFiles();
        },
      },
    }),
    viteReact(),
    ensureVercelConfigPlugin(),
  ],
});

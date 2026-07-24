/**
 * Ensure Vercel Build Output API files exist.
 * Do NOT clobber Nitro's config.json — only fill gaps / fix routes.
 */
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), ".vercel", "output");
const fnDir = join(out, "functions", "__server.func");
const entry = join(fnDir, "index.mjs");
const configPath = join(out, "config.json");
const vcPath = join(fnDir, ".vc-config.json");
const staticAssets = join(out, "static", "assets");

if (!existsSync(out)) {
  console.error("[vercel-output] Missing .vercel/output after build.");
  process.exit(1);
}

if (!existsSync(entry)) {
  console.error("[vercel-output] Missing function entry:", entry);
  process.exit(1);
}

if (!existsSync(staticAssets)) {
  console.error("[vercel-output] Missing static/assets — CSS/JS will 404 on Vercel.");
  process.exit(1);
}

mkdirSync(fnDir, { recursive: true });

function fallbackConfig() {
  return {
    version: 3,
    routes: [
      {
        src: "/assets/(.*)",
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
        continue: true,
      },
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/__server" },
    ],
  };
}

/** Header-only asset routes MUST continue so filesystem can serve the file. */
function fixRoutes(cfg) {
  if (!Array.isArray(cfg.routes)) cfg.routes = fallbackConfig().routes;
  cfg.routes = cfg.routes.map((route) => {
    if (
      route &&
      route.src &&
      route.headers &&
      !route.dest &&
      !route.handle &&
      route.continue !== true
    ) {
      return { ...route, continue: true };
    }
    return route;
  });

  const hasFilesystem = cfg.routes.some((r) => r?.handle === "filesystem");
  const hasServer = cfg.routes.some(
    (r) => r?.dest === "/__server" || String(r?.dest || "").includes("__server"),
  );
  if (!hasFilesystem) cfg.routes.push({ handle: "filesystem" });
  if (!hasServer) cfg.routes.push({ src: "/(.*)", dest: "/__server" });

  cfg.version = 3;
  return cfg;
}

let cfg;
if (existsSync(configPath)) {
  try {
    cfg = JSON.parse(readFileSync(configPath, "utf8"));
    console.log("[vercel-output] patching existing config.json");
  } catch {
    cfg = fallbackConfig();
    console.warn("[vercel-output] invalid config.json — rewriting");
  }
} else {
  cfg = fallbackConfig();
  console.log("[vercel-output] creating config.json");
}

cfg = fixRoutes(cfg);
writeFileSync(configPath, JSON.stringify(cfg, null, 2) + "\n");

if (!existsSync(vcPath)) {
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
}

console.log("[vercel-output] ready — static/assets OK, config routes=", cfg.routes.length);

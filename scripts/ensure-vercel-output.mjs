/**
 * Ensure Vercel Build Output API files exist / are correct.
 * Critical: asset header routes must have continue:true or CSS/JS 404.
 */
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), ".vercel", "output");
const fnDir = join(out, "functions", "__server.func");
const entry = join(fnDir, "index.mjs");
const configPath = join(out, "config.json");
const vcPath = join(fnDir, ".vc-config.json");
const staticDir = join(out, "static");

if (!existsSync(out)) {
  console.error("[vercel-output] Missing .vercel/output after build.");
  process.exit(1);
}
if (!existsSync(entry)) {
  console.error("[vercel-output] Missing function entry:", entry);
  process.exit(1);
}
if (!existsSync(staticDir)) {
  console.error("[vercel-output] Missing static/ — CSS/JS will 404.");
  process.exit(1);
}

const staticFiles = readdirSync(staticDir, { recursive: true }).filter(
  (f) => typeof f === "string" && !String(f).endsWith("/"),
);
console.log(`[vercel-output] static files: ${staticFiles.length}`);
if (staticFiles.length < 3) {
  console.error("[vercel-output] Too few static files:", staticFiles);
  process.exit(1);
}

mkdirSync(fnDir, { recursive: true });

function fallbackConfig() {
  return {
    version: 3,
    routes: [
      {
        src: "/assets-v2/(.*)",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      {
        src: "/assets/(.*)",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/__server" },
    ],
  };
}

function fixRoutes(cfg) {
  if (!Array.isArray(cfg.routes)) cfg.routes = fallbackConfig().routes;

  cfg.routes = cfg.routes.map((route) => {
    if (
      route?.src &&
      route?.headers &&
      !route.dest &&
      !route.handle &&
      route.continue !== true
    ) {
      return { ...route, continue: true };
    }
    return route;
  });

  const hasFs = cfg.routes.some((r) => r?.handle === "filesystem");
  const hasServer = cfg.routes.some(
    (r) => typeof r?.dest === "string" && String(r.dest).includes("__server"),
  );
  if (!hasFs) cfg.routes.push({ handle: "filesystem" });
  if (!hasServer) cfg.routes.push({ src: "/(.*)", dest: "/__server" });

  // Ensure assets-v2 is covered (new build.assetsDir)
  const hasV2 = cfg.routes.some(
    (r) => typeof r?.src === "string" && r.src.includes("assets-v2"),
  );
  if (!hasV2) {
    cfg.routes.unshift({
      src: "/assets-v2/(.*)",
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      continue: true,
    });
  }

  cfg.version = 3;
  return cfg;
}

let cfg = existsSync(configPath)
  ? JSON.parse(readFileSync(configPath, "utf8"))
  : fallbackConfig();

cfg = fixRoutes(cfg);
writeFileSync(configPath, JSON.stringify(cfg, null, 2) + "\n");
console.log("[vercel-output] wrote config.json routes=", cfg.routes.length);

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
}

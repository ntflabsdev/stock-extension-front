/**
 * Nitro vercel preset sometimes skips Build Output API files.
 * Vercel then fails with: config.json not found under .vercel/output
 */
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), ".vercel", "output");
const fnDir = join(out, "functions", "__server.func");

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function writeIfMissing(path, data) {
  if (existsSync(path)) {
    console.log(`[vercel-output] keep ${path}`);
    return;
  }
  writeFileSync(path, typeof data === "string" ? data : JSON.stringify(data, null, 2) + "\n");
  console.log(`[vercel-output] wrote ${path}`);
}

if (!existsSync(out)) {
  console.error("[vercel-output] Missing .vercel/output — run `vite build` first (nitro preset=vercel).");
  process.exit(1);
}

ensureDir(out);
ensureDir(fnDir);

// Required by Vercel Build Output API v3
writeIfMissing(join(out, "config.json"), {
  version: 3,
  routes: [
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/__server" },
  ],
});

// Required for the serverless function bundle
writeIfMissing(join(fnDir, ".vc-config.json"), {
  runtime: "nodejs20.x",
  handler: "index.mjs",
  launcherType: "Nodejs",
  shouldAddHelpers: false,
  supportsResponseStreaming: true,
});

// Sanity: server entry must exist
const entry = join(fnDir, "index.mjs");
if (!existsSync(entry)) {
  console.error("[vercel-output] Missing function entry:", entry);
  process.exit(1);
}

// Log static presence
const staticDir = join(out, "static");
console.log(
  `[vercel-output] ready — static=${existsSync(staticDir)} server=${existsSync(entry)}`,
);

try {
  const cfg = JSON.parse(readFileSync(join(out, "config.json"), "utf8"));
  console.log(`[vercel-output] config version=${cfg.version}`);
} catch {
  /* ignore */
}

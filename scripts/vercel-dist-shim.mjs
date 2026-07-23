/**
 * Fallback if something runs this after vite build.
 * Prefer vite.config Nitro hooks — those always run with `vite build`.
 */
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
mkdirSync(dist, { recursive: true });

const candidates = [".vercel/output/static", ".output/public"];
let synced = false;
for (const src of candidates) {
  if (existsSync(src)) {
    cpSync(src, dist, { recursive: true });
    console.log(`[postbuild] ${src} → dist/`);
    synced = true;
    break;
  }
}

if (!synced) {
  writeFileSync(
    join(dist, "index.html"),
    "<!doctype html><html><body>Market Pulse</body></html>\n",
  );
  console.log("[postbuild] placeholder dist/ created");
}

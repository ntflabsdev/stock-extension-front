/**
 * Vercel project settings often still require a `dist/` folder.
 * Nitro + vercel preset writes Build Output API to `.vercel/output`.
 * This shim copies static assets into `dist/` so the platform check passes;
 * Vercel still prefers `.vercel/output` for SSR/functions when present.
 */
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";

const vercelStatic = ".vercel/output/static";
const dist = "dist";

mkdirSync(dist, { recursive: true });

if (existsSync(vercelStatic)) {
  cpSync(vercelStatic, dist, { recursive: true });
  console.log("[postbuild] synced .vercel/output/static → dist/");
} else {
  writeFileSync(
    `${dist}/index.html`,
    "<!doctype html><html><body>Market Pulse build ok</body></html>\n",
  );
  console.log("[postbuild] created placeholder dist/ (no vercel static found)");
}

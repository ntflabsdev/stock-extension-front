/**
 * Nitro vercel preset sometimes emits /assets header routes WITHOUT continue:true.
 * That makes Vercel stop routing before filesystem → CSS/JS 404.
 * Only patches that flag; does not rewrite or delete build output.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const configPath = join(process.cwd(), ".vercel", "output", "config.json");
const staticAssets = join(process.cwd(), ".vercel", "output", "static", "assets");

if (!existsSync(configPath)) {
  console.error("[fix-vercel-routes] missing", configPath);
  process.exit(1);
}
if (!existsSync(staticAssets)) {
  console.error("[fix-vercel-routes] missing static/assets — build broken");
  process.exit(1);
}

const cfg = JSON.parse(readFileSync(configPath, "utf8"));
if (!Array.isArray(cfg.routes)) {
  console.error("[fix-vercel-routes] config.routes missing");
  process.exit(1);
}

let patched = 0;
cfg.routes = cfg.routes.map((route) => {
  if (
    route &&
    route.src &&
    route.headers &&
    !route.dest &&
    !route.handle &&
    route.continue !== true
  ) {
    patched += 1;
    return { ...route, continue: true };
  }
  return route;
});

writeFileSync(configPath, JSON.stringify(cfg, null, 2) + "\n");
console.log(
  `[fix-vercel-routes] patched ${patched} route(s); static/assets OK`,
);

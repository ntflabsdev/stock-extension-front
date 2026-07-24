/**
 * If an incomplete .vercel/output is present (common when someone committed
 * local Nitro output), Vercel switches to --prebuilt mode and fails with:
 *   Config file was not found at ".../.vercel/output/config.json"
 * Delete it before build so Vercel always runs a real build.
 */
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const vercelDir = join(process.cwd(), ".vercel");
const out = join(vercelDir, "output");
const cfg = join(out, "config.json");

if (existsSync(out) && !existsSync(cfg)) {
  console.warn(
    "[vercel-output] Removing incomplete .vercel/output (missing config.json)",
  );
  rmSync(vercelDir, { recursive: true, force: true });
} else if (existsSync(out)) {
  // Always rebuild fresh on CI
  if (process.env.VERCEL || process.env.CI) {
    console.warn("[vercel-output] CI detected — clearing .vercel for fresh build");
    rmSync(vercelDir, { recursive: true, force: true });
  }
}

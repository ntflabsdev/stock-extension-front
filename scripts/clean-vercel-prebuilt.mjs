/**
 * Run ONCE before `vite build` (via prebuild / vercel buildCommand).
 * Do NOT clear .vercel from inside Vite plugins — client/SSR/nitro each
 * call buildStart and would delete static assets mid-build (CSS/JS 404).
 */
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const vercelDir = join(process.cwd(), ".vercel");

if (existsSync(vercelDir)) {
  console.warn("[vercel-output] Clearing .vercel before build (once)");
  rmSync(vercelDir, { recursive: true, force: true });
}

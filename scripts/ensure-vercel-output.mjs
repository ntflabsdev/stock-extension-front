/**
 * Force-write Vercel Build Output API files after Nitro build.
 * Always overwrites config.json so deploy never misses it.
 */
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), ".vercel", "output");
const fnDir = join(out, "functions", "__server.func");
const entry = join(fnDir, "index.mjs");
const configPath = join(out, "config.json");
const vcPath = join(fnDir, ".vc-config.json");

if (!existsSync(out)) {
  console.error("[vercel-output] Missing .vercel/output after build.");
  process.exit(1);
}

if (!existsSync(entry)) {
  console.error("[vercel-output] Missing function entry:", entry);
  process.exit(1);
}

mkdirSync(fnDir, { recursive: true });

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

console.log("[vercel-output] wrote", configPath);
console.log("[vercel-output] wrote", vcPath);
console.log(
  "[vercel-output] ready — static=",
  existsSync(join(out, "static")),
  "config=",
  existsSync(configPath),
);

try {
  const cfg = JSON.parse(readFileSync(configPath, "utf8"));
  if (cfg.version !== 3) throw new Error("bad version");
} catch (e) {
  console.error("[vercel-output] config.json invalid", e);
  process.exit(1);
}

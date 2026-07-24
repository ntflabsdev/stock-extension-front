import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Official TanStack Start + Nitro on Vercel (zero-config).
// Do NOT force preset / rewrite .vercel/output — that breaks static CSS/JS.
export default defineConfig({
  server: {
    port: 8080,
    host: "localhost",
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
});

import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    port: 8080,
    host: "localhost",
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    // Always emit Vercel Build Output API (`.vercel/output`) so deploy
    // does not fall back to looking for a Vite `dist/` folder.
    nitro({
      preset: "vercel",
    }),
    viteReact(),
  ],
});

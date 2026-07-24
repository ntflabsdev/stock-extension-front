# Market Pulse UI

TanStack Start frontend for option-chain dashboard.

## API

```
VITE_API_BASE_URL=https://apistock.aistaging.in
```

## Local

```bash
npm install
npm run dev
```

## Vercel

1. Framework Preset: **TanStack Start**
2. Build Command: default (`npm run build`) — do not set Output Directory
3. Env: `VITE_API_BASE_URL=https://apistock.aistaging.in`
4. Redeploy with **Clear cache**

`vite.config` uses official `nitro()` (no custom preset). After build we only patch
asset routes with `continue: true` so CSS/JS are served from `.vercel/output/static`.

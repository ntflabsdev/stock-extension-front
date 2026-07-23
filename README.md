# Market Pulse UI

Frontend for live option-chain dashboard, My Stocks, and admin panel.

## Stack

- TanStack Start + React Router
- React Query + Socket.IO client
- Tailwind CSS 4
- Vite 8 + Nitro (`node-server`)

## API

Production / staging backend:

```
https://apistock.aistaging.in
```

Set in `.env` / `.env.production`:

```
VITE_API_BASE_URL=https://apistock.aistaging.in
```

## Scripts

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # production build
npm run preview  # preview build
```

## Deploy (Vercel)

1. Root Directory = `market-pulse-ui-main` (if monorepo)
2. Framework Preset = **TanStack Start** (not Vite / Other)
3. **Output Directory leave empty** (do not set `dist`)
4. Env: `VITE_API_BASE_URL=https://apistock.aistaging.in`

`vercel.json` already sets `"framework": "tanstack-start"`.

## Deploy (VPS / Node)

```bash
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs
```

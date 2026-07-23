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

## Deploy (VPS)

```bash
npm ci
npm run build
# serve Nitro node-server output (see .output/ after build)
```

Point nginx to the Node process. Frontend talks to `VITE_API_BASE_URL`.

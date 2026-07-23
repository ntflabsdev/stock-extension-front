# Alpha Terminal — Task Checklist

Premium Indian Stock Market Dashboard UI (Frontend Only).
No backend, no APIs, no auth — all data is placeholder/demo.

---

## ✅ Completed

### Foundation
- [x] Tailwind v4 design system with dark trading-terminal theme (`src/styles.css`)
- [x] Semantic tokens: `--bull`, `--bear`, `--surface`, `--elevated`, `--info`, `--warning`
- [x] Glassmorphism utilities (`glass-card`, `glass-panel`, `bull-bg`, `bear-bg`)
- [x] Price flash animations (`flash-up`, `flash-down`) + `skeleton` shimmer
- [x] Inter + JetBrains Mono fonts loaded via `__root.tsx`
- [x] Root shell forced to `dark` class

### Layout / Chrome
- [x] Collapsible animated **Sidebar** (Dashboard, All Stocks, Sensex, Settings)
- [x] **Header**: market-status pill, search, live indicator, clock (IST), notifications, avatar
- [x] `DashboardLayout` wrapper with ambient radial glow + page transition

### Page 1 — Dashboard (`/`)
- [x] `IndexCard` for **NIFTY 50**, **BANK NIFTY**, **SENSEX**
  - Animated counters, sparkline (Recharts), Open/High/Low/Prev
- [x] **Top Gainers** panel (green accents, ArrowUp)
- [x] **Top Losers** panel (red accents, ArrowDown)
- [x] **Market Breadth** card with SVG circular progress rings
- [x] Framer Motion staggered entry

### Page 2 — All Stocks (`/stocks`)
- [x] Premium trading-terminal table (40 stocks)
- [x] Sticky header + sticky first two columns (★ + Symbol)
- [x] Columns: ★, Symbol, Company, LTP, Change, %, Open, High, Low, Volume, Bid, Ask, Updated
- [x] Search box, gainers/losers filter, sortable columns
- [x] Pagination, Export button, Columns button, Filters button
- [x] Favorite (star) toggle
- [x] Color-coded % badges (bull/bear backgrounds), monospaced prices
- [x] Row entry animations (AnimatePresence)

### Page 3 — Sensex (`/sensex`)
- [x] Large hero card with animated price, change badge, Open/High/Low/Prev
- [x] Full Recharts area chart with gradient fill, custom tooltip, grid
- [x] Summary stats: Day Range, 52W High, Last Update
- [x] Top Movers grid (gainers + losers)
- [x] Recent Updates timeline

### Page 4 — Settings (`/settings`)
- [x] Profile / Notifications / Appearance / Security cards

### Reusable Components
- [x] `Sidebar`, `Header`, `DashboardLayout`
- [x] `IndexCard`, `MoverCard`, `BreadthCard`
- [x] `StockTable` (with toolbar, pagination, filters)
- [x] `AnimatedNumber` (Framer Motion motion values)

### Polish
- [x] Responsive across desktop / laptop / tablet / mobile
- [x] Per-route SEO `head()` with unique titles, descriptions, og tags
- [x] Smooth page transitions
- [x] Hover lifts, shadow depth, gradient accents

---

## ⏳ Not Done (Intentionally — out of scope)

These were **explicitly excluded** by the prompt (frontend-only build):

- [ ] Backend / server functions
- [ ] Real API integration (FYERS, NSE, BSE, etc.)
- [ ] Authentication / login flow
- [ ] WebSocket live price streaming (currently static demo data)
- [ ] Persistent favorites (currently in-memory `useState`)
- [ ] Real notifications feed
- [ ] Search results / global search backend

---

## 🔜 Nice-to-have (future, if you want more)

- [ ] Individual stock detail page (`/stocks/$symbol`) with deep chart
- [ ] Watchlist page powered by favorites
- [ ] Sector heatmap visualization
- [ ] Options chain UI
- [ ] Order ticket / trade panel mock
- [ ] Light-theme variant toggle
- [ ] Loading skeleton screens on route transitions
- [ ] Empty-state illustrations

---

**Stack:** React 19 · TanStack Start · Tailwind v4 · Framer Motion · Recharts · Lucide.

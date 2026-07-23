import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { fmtNum, fmtSigned } from "@/lib/format";
import { isAdmin, isLoggedIn } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Terminal — Indian Options Desk" },
      {
        name: "description",
        content: "Scrape, store and visualize NIFTY option chains. Login for your live desk.",
      },
    ],
  }),
  component: LandingPage,
});

/** Landing-only showcase numbers — not live feed */
const tickers = [
  { symbol: "NIFTY", name: "Nifty 50", ltp: 24812.4, pct: 0.62 },
  { symbol: "BANKNIFTY", name: "Bank Nifty", ltp: 52140.1, pct: -0.28 },
  { symbol: "FINNIFTY", name: "Fin Nifty", ltp: 23890.55, pct: 0.41 },
  { symbol: "RELIANCE", name: "Reliance", ltp: 2894.2, pct: 1.12 },
  { symbol: "HDFCBANK", name: "HDFC Bank", ltp: 1688.05, pct: -0.45 },
  { symbol: "TCS", name: "TCS", ltp: 3921.75, pct: 0.33 },
  { symbol: "INFY", name: "Infosys", ltp: 1782.4, pct: -0.18 },
  { symbol: "SBIN", name: "SBI", ltp: 812.6, pct: 0.88 },
  { symbol: "ICICIBANK", name: "ICICI Bank", ltp: 1245.3, pct: 0.21 },
  { symbol: "ITC", name: "ITC", ltp: 468.15, pct: -0.52 },
];

const board = [
  { symbol: "NIFTY", expiry: "28JUL26", callOI: "1.24 Cr", putOI: "1.51 Cr", pcr: "1.22", bias: "Put heavy" },
  { symbol: "BANKNIFTY", expiry: "28JUL26", callOI: "48.2 L", putOI: "52.8 L", pcr: "1.10", bias: "Balanced" },
  { symbol: "RELIANCE", expiry: "31JUL26", callOI: "12.4 L", putOI: "9.8 L", pcr: "0.79", bias: "Call heavy" },
  { symbol: "HDFCBANK", expiry: "31JUL26", callOI: "8.1 L", putOI: "11.3 L", pcr: "1.40", bias: "Put heavy" },
  { symbol: "TCS", expiry: "31JUL26", callOI: "6.2 L", putOI: "5.4 L", pcr: "0.87", bias: "Mild call" },
  { symbol: "SBIN", expiry: "31JUL26", callOI: "9.7 L", putOI: "10.1 L", pcr: "1.04", bias: "Neutral" },
];

function LandingPage() {
  const loggedIn = typeof window !== "undefined" && isLoggedIn();
  const admin = typeof window !== "undefined" && isAdmin();
  const enterTo = loggedIn ? (admin ? "/admin" : "/option-chain") : "/login";

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.45 0.14 235 / 35%), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 20%, oklch(0.5 0.12 145 / 12%), transparent 50%), radial-gradient(ellipse 40% 30% at 0% 80%, oklch(0.4 0.1 25 / 10%), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span
            className="text-lg font-extrabold tracking-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Alpha Terminal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin-login"
            className="rounded-xl px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground"
          >
            Admin
          </Link>
          {!loggedIn && (
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              Login
            </Link>
          )}
          <Link
            to={enterTo}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90"
          >
            {loggedIn ? "Enter desk" : "Get started"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero — one composition */}
      <section className="relative z-10 flex min-h-[78vh] flex-col justify-center px-5 pb-16 pt-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p
            className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Alpha Terminal
          </p>
          <h1 className="mt-5 text-xl font-medium text-foreground/90 md:text-2xl">
            Your Indian options desk, live from the chain.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Scrape NIFTY & F&O chains, store VWAP/OI, and open your private terminal after login.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={enterTo}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-info px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30"
            >
              {loggedIn ? "Open terminal" : "Login / Sign up"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#pulse"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
            >
              Preview market pulse
            </a>
          </div>
        </motion.div>

        {/* Dominant visual: scrolling ticker plane */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="relative mt-14 w-full overflow-hidden border-y border-white/10 bg-black/20 py-4 backdrop-blur-sm"
        >
          <div className="animate-[ticker_40s_linear_infinite] flex w-max gap-10 whitespace-nowrap px-4">
            {[...tickers, ...tickers].map((t, i) => (
              <span key={`${t.symbol}-${i}`} className="inline-flex items-baseline gap-2 font-mono text-sm">
                <span className="font-semibold text-primary">{t.symbol}</span>
                <span className="text-foreground">{fmtNum(t.ltp)}</span>
                <span className={t.pct >= 0 ? "text-bull" : "text-bear"}>
                  {fmtSigned(t.pct)}%
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Dummy board section */}
      <section id="pulse" className="relative z-10 px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Sample pulse
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              How your desk will feel
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Demo numbers for the landing only. After login you see your real scraped option chain.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <div className="grid grid-cols-[1.1fr_0.9fr_1fr_1fr_0.7fr_1fr] gap-2 border-b border-white/10 px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground max-md:hidden">
              <span>Symbol</span>
              <span>Expiry</span>
              <span className="text-right">Call OI</span>
              <span className="text-right">Put OI</span>
              <span className="text-right">PCR</span>
              <span className="text-right">Bias</span>
            </div>
            {board.map((row, i) => (
              <motion.div
                key={row.symbol}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-2 gap-2 border-b border-white/[0.04] px-4 py-3 text-sm last:border-0 md:grid-cols-[1.1fr_0.9fr_1fr_1fr_0.7fr_1fr]"
              >
                <div className="font-mono font-bold text-primary">{row.symbol}</div>
                <div className="font-mono text-xs text-muted-foreground md:text-sm">{row.expiry}</div>
                <div className="text-right font-mono text-bull max-md:col-span-1">{row.callOI}</div>
                <div className="text-right font-mono text-bear">{row.putOI}</div>
                <div className="text-right font-mono">{row.pcr}</div>
                <div
                  className={cn(
                    "text-right text-xs md:text-sm",
                    row.bias.includes("Put")
                      ? "text-bear"
                      : row.bias.includes("Call")
                        ? "text-bull"
                        : "text-muted-foreground",
                  )}
                >
                  {row.bias}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Sign in to load live chain
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-5 py-6 text-center text-xs text-muted-foreground md:px-10">
        Alpha Terminal · Demo pulse on this page · Live data after login
      </footer>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

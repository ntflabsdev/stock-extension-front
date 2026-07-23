import { o as isAdmin, s as isLoggedIn } from "./auth-Da7F6gv0.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { T as ArrowRight, a as Sparkles } from "../_libs/lucide-react.mjs";
import { n as fmtSigned, t as fmtNum } from "./format-C6TtUUs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CozDLL2b.js
var import_jsx_runtime = require_jsx_runtime();
/** Landing-only showcase numbers — not live feed */
var tickers = [
	{
		symbol: "NIFTY",
		name: "Nifty 50",
		ltp: 24812.4,
		pct: .62
	},
	{
		symbol: "BANKNIFTY",
		name: "Bank Nifty",
		ltp: 52140.1,
		pct: -.28
	},
	{
		symbol: "FINNIFTY",
		name: "Fin Nifty",
		ltp: 23890.55,
		pct: .41
	},
	{
		symbol: "RELIANCE",
		name: "Reliance",
		ltp: 2894.2,
		pct: 1.12
	},
	{
		symbol: "HDFCBANK",
		name: "HDFC Bank",
		ltp: 1688.05,
		pct: -.45
	},
	{
		symbol: "TCS",
		name: "TCS",
		ltp: 3921.75,
		pct: .33
	},
	{
		symbol: "INFY",
		name: "Infosys",
		ltp: 1782.4,
		pct: -.18
	},
	{
		symbol: "SBIN",
		name: "SBI",
		ltp: 812.6,
		pct: .88
	},
	{
		symbol: "ICICIBANK",
		name: "ICICI Bank",
		ltp: 1245.3,
		pct: .21
	},
	{
		symbol: "ITC",
		name: "ITC",
		ltp: 468.15,
		pct: -.52
	}
];
var board = [
	{
		symbol: "NIFTY",
		expiry: "28JUL26",
		callOI: "1.24 Cr",
		putOI: "1.51 Cr",
		pcr: "1.22",
		bias: "Put heavy"
	},
	{
		symbol: "BANKNIFTY",
		expiry: "28JUL26",
		callOI: "48.2 L",
		putOI: "52.8 L",
		pcr: "1.10",
		bias: "Balanced"
	},
	{
		symbol: "RELIANCE",
		expiry: "31JUL26",
		callOI: "12.4 L",
		putOI: "9.8 L",
		pcr: "0.79",
		bias: "Call heavy"
	},
	{
		symbol: "HDFCBANK",
		expiry: "31JUL26",
		callOI: "8.1 L",
		putOI: "11.3 L",
		pcr: "1.40",
		bias: "Put heavy"
	},
	{
		symbol: "TCS",
		expiry: "31JUL26",
		callOI: "6.2 L",
		putOI: "5.4 L",
		pcr: "0.87",
		bias: "Mild call"
	},
	{
		symbol: "SBIN",
		expiry: "31JUL26",
		callOI: "9.7 L",
		putOI: "10.1 L",
		pcr: "1.04",
		bias: "Neutral"
	}
];
function LandingPage() {
	const loggedIn = typeof window !== "undefined" && isLoggedIn();
	const admin = typeof window !== "undefined" && isAdmin();
	const enterTo = loggedIn ? admin ? "/admin" : "/option-chain" : "/login";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0",
				style: { background: "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.45 0.14 235 / 35%), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 20%, oklch(0.5 0.12 145 / 12%), transparent 50%), radial-gradient(ellipse 40% 30% at 0% 80%, oklch(0.4 0.1 25 / 10%), transparent 45%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0 opacity-[0.07]",
				style: {
					backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
					backgroundSize: "48px 48px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-20 flex items-center justify-between px-5 py-5 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-extrabold tracking-tight",
						style: { fontFamily: "Syne, sans-serif" },
						children: "Alpha Terminal"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin-login",
							className: "rounded-xl px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground",
							children: "Admin"
						}),
						!loggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "rounded-xl px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground",
							children: "Login"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: enterTo,
							className: "inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90",
							children: [loggedIn ? "Enter desk" : "Get started", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 flex min-h-[78vh] flex-col justify-center px-5 pb-16 pt-6 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .6 },
					className: "mx-auto max-w-4xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl",
							style: { fontFamily: "Syne, sans-serif" },
							children: "Alpha Terminal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 text-xl font-medium text-foreground/90 md:text-2xl",
							children: "Your Indian options desk, live from the chain."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base",
							children: "Scrape NIFTY & F&O chains, store VWAP/OI, and open your private terminal after login."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: enterTo,
								className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-info px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30",
								children: [loggedIn ? "Open terminal" : "Login / Sign up", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#pulse",
								className: "rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-muted-foreground transition hover:bg-white/10 hover:text-foreground",
								children: "Preview market pulse"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .35,
						duration: .8
					},
					className: "relative mt-14 w-full overflow-hidden border-y border-white/10 bg-black/20 py-4 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-[ticker_40s_linear_infinite] flex w-max gap-10 whitespace-nowrap px-4",
						children: [...tickers, ...tickers].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-baseline gap-2 font-mono text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary",
									children: t.symbol
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: fmtNum(t.ltp)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: t.pct >= 0 ? "text-bull" : "text-bear",
									children: [fmtSigned(t.pct), "%"]
								})
							]
						}, `${t.symbol}-${i}`))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "pulse",
				className: "relative z-10 px-5 pb-20 md:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-5xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
									children: "Sample pulse"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-3xl font-bold tracking-tight md:text-4xl",
									style: { fontFamily: "Syne, sans-serif" },
									children: "How your desk will feel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-lg text-sm text-muted-foreground",
									children: "Demo numbers for the landing only. After login you see your real scraped option chain."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[1.1fr_0.9fr_1fr_1fr_0.7fr_1fr] gap-2 border-b border-white/10 px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground max-md:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Symbol" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expiry" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-right",
										children: "Call OI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-right",
										children: "Put OI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-right",
										children: "PCR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-right",
										children: "Bias"
									})
								]
							}), board.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									x: -8
								},
								whileInView: {
									opacity: 1,
									x: 0
								},
								viewport: { once: true },
								transition: { delay: i * .05 },
								className: "grid grid-cols-2 gap-2 border-b border-white/[0.04] px-4 py-3 text-sm last:border-0 md:grid-cols-[1.1fr_0.9fr_1fr_1fr_0.7fr_1fr]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono font-bold text-primary",
										children: row.symbol
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-xs text-muted-foreground md:text-sm",
										children: row.expiry
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right font-mono text-bull max-md:col-span-1",
										children: row.callOI
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right font-mono text-bear",
										children: row.putOI
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right font-mono",
										children: row.pcr
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("text-right text-xs md:text-sm", row.bias.includes("Put") ? "text-bear" : row.bias.includes("Call") ? "text-bull" : "text-muted-foreground"),
										children: row.bias
									})
								]
							}, row.symbol))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								className: "inline-flex items-center gap-2 rounded-2xl bg-white/5 px-6 py-3 text-sm font-semibold transition hover:bg-white/10",
								children: ["Sign in to load live chain", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative z-10 border-t border-white/5 px-5 py-6 text-center text-xs text-muted-foreground md:px-10",
				children: "Alpha Terminal · Demo pulse on this page · Live data after login"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      ` })
		]
	});
}
//#endregion
export { LandingPage as component };

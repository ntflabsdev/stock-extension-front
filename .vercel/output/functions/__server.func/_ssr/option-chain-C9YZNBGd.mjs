import { o as __toESM } from "../_runtime.mjs";
import { i as getToken } from "./auth-Da7F6gv0.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { S as ChevronLeft, c as RefreshCw, f as LoaderCircle, s as Search, x as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as DashboardLayout } from "./DashboardLayout-D0t4WlQL.mjs";
import { r as resolveApiBase } from "./api-CbvcDHVc.mjs";
import { n as fetchOptionChainMeta, t as fetchOptionChain } from "./option-chain-api-BXjZ2eE1.mjs";
import { n as fetchMyStocks } from "./user-stocks-api-C6Yfj3WI.mjs";
import { n as fmtSigned, t as fmtNum } from "./format-C6TtUUs8.mjs";
import { a as Bar, c as Legend, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
import { t as lookup } from "../_libs/socket.io-client+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/option-chain-C9YZNBGd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Chg({ n }) {
	const v = n ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-mono text-xs", v >= 0 ? "text-bull" : "text-bear"),
		children: fmtSigned(v, 0)
	});
}
function OptionChainTable({ rows, page, totalPages, total, limit, onPageChange, strikeFilter, onStrikeFilterChange }) {
	const from = total === 0 ? 0 : (page - 1) * limit + 1;
	const to = Math.min(total, (page - 1) * limit + rows.length);
	const filteredHint = (0, import_react.useMemo)(() => {
		if (!strikeFilter.trim()) return null;
		return `Filter: ${strikeFilter}`;
	}, [strikeFilter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card overflow-hidden rounded-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 md:max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: strikeFilter,
						onChange: (e) => onStrikeFilterChange(e.target.value),
						placeholder: "Filter strike (this page)...",
						className: "w-full rounded-xl border border-white/5 bg-white/5 py-2 pl-10 pr-3 text-sm outline-none focus:border-primary/40"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						limit,
						"/page · total ",
						total,
						filteredHint ? ` · ${filteredHint}` : ""
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[960px] border-collapse text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("thead", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-white/5 text-[10px] uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								colSpan: 5,
								className: "bg-bull/15 px-3 py-2 text-center font-semibold text-bull",
								children: "Calls"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								colSpan: 3,
								className: "bg-white/5 px-3 py-2 text-center font-semibold",
								children: "Strike"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								colSpan: 4,
								className: "bg-bear/15 px-3 py-2 text-center font-semibold text-bear",
								children: "Puts"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-white/5 text-[10px] uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-left font-medium",
								children: "Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "OI Chg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "OI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "LTP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "VWAP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-center font-medium",
								children: "Strike"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "PE-CE OI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "PE-CE Chg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "VWAP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "LTP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "OI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "OI Chg"
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-white/[0.03] transition hover:bg-white/[0.03]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 font-mono text-[11px] text-muted-foreground",
								children: r.time || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, { n: r.callOIChg })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right font-mono text-xs",
								children: fmtNum(r.callOI ?? 0, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right font-mono text-xs text-info",
								children: fmtNum(r.callLTP ?? 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right font-mono text-xs",
								children: fmtNum(r.callVWAP ?? 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "bg-primary/10 px-2 py-2 text-center font-mono text-sm font-bold text-primary",
								children: r.strikePrice
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right font-mono text-xs",
								children: fmtNum(r.peCeOI ?? 0, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, { n: r.peCeOIChg })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right font-mono text-xs",
								children: fmtNum(r.putVWAP ?? 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right font-mono text-xs text-info",
								children: fmtNum(r.putLTP ?? 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right font-mono text-xs",
								children: fmtNum(r.putOI ?? 0, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chg, { n: r.putOIChg })
							})
						]
					}, `${r.strikePrice}-${r.scrapedAt ?? ""}`)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 12,
						className: "px-4 py-12 text-center text-sm text-muted-foreground",
						children: "No option chain rows on this page."
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 border-t border-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						"Showing ",
						from,
						"–",
						to,
						" of ",
						total
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: page <= 1,
							onClick: () => onPageChange(page - 1),
							className: "inline-flex items-center gap-1 rounded-xl bg-white/5 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), " Prev"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: [
								page,
								" / ",
								totalPages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: page >= totalPages,
							onClick: () => onPageChange(page + 1),
							className: "inline-flex items-center gap-1 rounded-xl bg-white/5 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-white/10",
							children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
						})
					]
				})]
			})
		]
	});
}
function useOptionChainSocket(enabled = true) {
	const queryClient = useQueryClient();
	const [connected, setConnected] = (0, import_react.useState)(false);
	const [lastEvent, setLastEvent] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!enabled || typeof window === "undefined") return;
		const socket = lookup(resolveApiBase(), {
			transports: ["websocket", "polling"],
			withCredentials: true
		});
		socket.on("connect", () => setConnected(true));
		socket.on("disconnect", () => setConnected(false));
		socket.on("optionchain:update", (payload) => {
			setLastEvent(payload);
			queryClient.invalidateQueries({ queryKey: ["optionchain"] });
			queryClient.invalidateQueries({ queryKey: ["optionchain-meta"] });
		});
		return () => {
			socket.disconnect();
		};
	}, [enabled, queryClient]);
	return {
		connected,
		lastEvent
	};
}
function OptionChainPage() {
	const [symbol, setSymbol] = (0, import_react.useState)("");
	const [expiry, setExpiry] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [strikeFilter, setStrikeFilter] = (0, import_react.useState)("");
	const { connected, lastEvent } = useOptionChainSocket(Boolean(getToken()));
	const myStocksQuery = useQuery({
		queryKey: ["my-stocks"],
		queryFn: () => fetchMyStocks({
			page: 1,
			limit: 200
		}),
		enabled: Boolean(getToken())
	});
	const metaQuery = useQuery({
		queryKey: ["optionchain-meta"],
		queryFn: fetchOptionChainMeta,
		enabled: Boolean(getToken()),
		refetchInterval: 12e4
	});
	const myStocks = myStocksQuery.data?.stocks ?? [];
	const pairs = metaQuery.data?.pairs ?? [];
	const watchList = (0, import_react.useMemo)(() => myStocks.map((s) => ({
		symbol: s.symbol,
		name: s.name || s.symbol,
		type: s.type === "index" ? "index" : "stock"
	})), [myStocks]);
	const indexList = (0, import_react.useMemo)(() => watchList.filter((s) => s.type === "index"), [watchList]);
	const stockList = (0, import_react.useMemo)(() => watchList.filter((s) => s.type === "stock"), [watchList]);
	const watchSymbols = (0, import_react.useMemo)(() => watchList.map((s) => s.symbol), [watchList]);
	(0, import_react.useEffect)(() => {
		if (!watchSymbols.length) {
			if (symbol) setSymbol("");
			return;
		}
		if (!symbol || !watchSymbols.includes(symbol)) {
			setSymbol(watchSymbols[0]);
			setExpiry("");
			setPage(1);
		}
	}, [watchSymbols, symbol]);
	const effectiveExpiry = expiry || pairs.find((p) => p.symbol === symbol)?.expiry || "";
	const chainQuery = useQuery({
		queryKey: [
			"optionchain",
			symbol,
			effectiveExpiry,
			page
		],
		queryFn: () => fetchOptionChain(symbol, effectiveExpiry || void 0, page, 40),
		enabled: Boolean(getToken()) && Boolean(symbol),
		refetchInterval: 12e4
	});
	(0, import_react.useEffect)(() => {
		if (!lastEvent?.symbol) return;
		if (!watchSymbols.includes(lastEvent.symbol)) return;
		if (!symbol) {
			setSymbol(lastEvent.symbol);
			if (lastEvent.expiry) setExpiry(String(lastEvent.expiry));
			setPage(1);
		}
	}, [
		lastEvent,
		symbol,
		watchSymbols
	]);
	const rows = (0, import_react.useMemo)(() => {
		const all = chainQuery.data?.rows ?? [];
		if (!strikeFilter.trim()) return all;
		return all.filter((r) => String(r.strikePrice).includes(strikeFilter.trim()));
	}, [chainQuery.data?.rows, strikeFilter]);
	const chartData = (0, import_react.useMemo)(() => rows.slice(0, 40).map((r) => ({
		strike: String(r.strikePrice),
		callOI: r.callOI ?? 0,
		putOI: r.putOI ?? 0
	})), [rows]);
	const expiries = (0, import_react.useMemo)(() => pairs.filter((p) => p.symbol === symbol).map((p) => p.expiry).filter(Boolean), [pairs, symbol]);
	const totals = chainQuery.data?.summary ?? {
		callOI: 0,
		putOI: 0,
		pcr: 0
	};
	const total = chainQuery.data?.total ?? chainQuery.data?.count ?? 0;
	const totalPages = chainQuery.data?.totalPages ?? 1;
	const selectedMeta = watchList.find((s) => s.symbol === symbol);
	const pickSymbol = (sym) => {
		setSymbol(sym);
		setExpiry("");
		setPage(1);
		setStrikeFilter("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-primary",
					children: "Live Feed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold tracking-tight md:text-3xl",
					style: { fontFamily: "Syne, sans-serif" },
					children: "Option Chain"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Live socket · ",
						40,
						"/page · full-width table"
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs", connected ? "bg-bull/15 text-bull" : "bg-white/5 text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", connected ? "animate-pulse bg-bull" : "bg-muted-foreground") }), connected ? "Live socket" : "Socket offline"]
					}),
					lastEvent?.symbol && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-primary/15 px-3 py-1.5 font-mono text-[11px] text-primary",
						children: [
							"Last: ",
							lastEvent.symbol,
							lastEvent.newRecords != null ? ` +${lastEvent.newRecords}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => chainQuery.refetch(),
						className: "inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs hover:bg-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: chainQuery.isFetching ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5" }), "Refresh"]
					})
				]
			})]
		}),
		myStocks.length === 0 && !myStocksQuery.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm",
			children: [
				"No stocks selected yet.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/my-stocks",
					className: "font-semibold text-primary underline",
					children: "Add stocks in My Stocks"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-w-[220px] flex-1 flex-col gap-1 sm:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Symbol (My Stocks)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: symbol,
						onChange: (e) => pickSymbol(e.target.value),
						className: "rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/40",
						children: [
							watchList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "No symbols"
							}),
							indexList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
								label: "Indices",
								children: indexList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: s.symbol,
									children: [
										s.name,
										" (",
										s.symbol,
										")"
									]
								}, s.symbol))
							}),
							stockList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
								label: "Stocks",
								children: stockList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: s.symbol,
									children: [
										s.name,
										" (",
										s.symbol,
										")"
									]
								}, s.symbol))
							}),
							watchList.length > 0 && indexList.length === 0 && stockList.length === 0 && watchList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: s.symbol,
								children: [
									s.name,
									" (",
									s.symbol,
									")"
								]
							}, s.symbol))
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-w-[160px] flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Expiry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: effectiveExpiry,
						onChange: (e) => {
							setExpiry(e.target.value);
							setPage(1);
						},
						className: "rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/40",
						children: [expiries.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "No expiry yet"
						}), expiries.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: ex,
							children: ex
						}, ex))]
					})]
				}),
				selectedMeta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:ml-auto sm:pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						style: { fontFamily: "Syne, sans-serif" },
						children: selectedMeta.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs text-primary",
						children: selectedMeta.symbol
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 grid grid-cols-2 gap-3 md:grid-cols-5",
			children: [
				["Strikes", String(total)],
				["Last scrape", chainQuery.data?.scrapedAt ? new Date(chainQuery.data.scrapedAt).toLocaleString("en-IN") : "No data"],
				["Call OI", fmtNum(totals.callOI, 0)],
				["Put OI", fmtNum(totals.putOI, 0)],
				["PCR", fmtNum(totals.pcr, 3)]
			].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card rounded-2xl px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-wider text-muted-foreground",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 truncate font-mono text-sm font-semibold",
					children: v
				})]
			}, k))
		}),
		chainQuery.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2 text-sm text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
				" Loading ",
				symbol,
				"..."
			]
		}),
		chainQuery.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 rounded-2xl border border-bear/30 bg-bear/10 px-4 py-3 text-sm text-bear",
			children: chainQuery.error?.message || "Failed to load"
		}),
		!chainQuery.isLoading && rows.length === 0 && symbol && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-muted-foreground",
			children: [
				"No scraped rows for ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-primary",
					children: symbol
				}),
				" yet."
			]
		}),
		chartData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "glass-card mb-5 rounded-2xl p-4 md:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 text-sm font-semibold",
				children: [symbol, " · Open Interest by Strike"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[220px] w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chartData,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "rgba(255,255,255,0.05)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "strike",
								tick: {
									fill: "var(--color-muted-foreground)",
									fontSize: 10
								},
								interval: "preserveStartEnd",
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-muted-foreground)",
									fontSize: 10
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "rgba(15,18,28,0.95)",
								border: "1px solid rgba(255,255,255,0.08)",
								borderRadius: 12,
								fontSize: 12
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "callOI",
								name: "Call OI",
								fill: "var(--color-bull)",
								radius: [
									4,
									4,
									0,
									0
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "putOI",
								name: "Put OI",
								fill: "var(--color-bear)",
								radius: [
									4,
									4,
									0,
									0
								]
							})
						]
					})
				})
			})]
		}, symbol),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionChainTable, {
			rows,
			page,
			totalPages,
			total,
			limit: 40,
			onPageChange: setPage,
			strikeFilter,
			onStrikeFilterChange: setStrikeFilter
		})
	] });
}
//#endregion
export { OptionChainPage as component };

import { o as __toESM } from "../_runtime.mjs";
import { i as getToken } from "./auth-Da7F6gv0.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { C as Check, S as ChevronLeft, a as Sparkles, f as LoaderCircle, s as Search, x as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as DashboardLayout } from "./DashboardLayout-D0t4WlQL.mjs";
import { n as fetchMyStocks, r as saveMyStocks, t as fetchCatalog } from "./user-stocks-api-C6Yfj3WI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-stocks-BFTcdije.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MyStocksPage() {
	const qc = useQueryClient();
	const [q, setQ] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [savedMsg, setSavedMsg] = (0, import_react.useState)("");
	const catalogQuery = useQuery({
		queryKey: [
			"user-catalog",
			tab,
			q,
			page
		],
		queryFn: () => fetchCatalog({
			q: q || void 0,
			type: tab === "all" ? void 0 : tab,
			page,
			limit: 40
		}),
		enabled: Boolean(getToken())
	});
	const mineQuery = useQuery({
		queryKey: ["my-stocks"],
		queryFn: () => fetchMyStocks({
			page: 1,
			limit: 200
		}),
		enabled: Boolean(getToken())
	});
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [q, tab]);
	(0, import_react.useEffect)(() => {
		if (!hydrated && mineQuery.isSuccess) {
			const map = /* @__PURE__ */ new Map();
			for (const s of mineQuery.data.stocks || []) map.set(s.symbol, {
				symbol: s.symbol,
				name: s.name,
				url: s.url,
				type: s.type === "index" ? "index" : "stock"
			});
			setSelected(map);
			setHydrated(true);
		}
	}, [
		mineQuery.isSuccess,
		mineQuery.data,
		hydrated
	]);
	const catalog = catalogQuery.data?.stocks ?? [];
	const totalPages = catalogQuery.data?.totalPages ?? 1;
	const total = catalogQuery.data?.total ?? 0;
	const indices = (0, import_react.useMemo)(() => [...selected.values()].filter((s) => s.type === "index"), [selected]);
	const equities = (0, import_react.useMemo)(() => [...selected.values()].filter((s) => s.type !== "index"), [selected]);
	const toggle = (s) => {
		setSelected((prev) => {
			const n = new Map(prev);
			if (n.has(s.symbol)) n.delete(s.symbol);
			else n.set(s.symbol, {
				symbol: s.symbol,
				name: s.name,
				url: s.url,
				type: s.type
			});
			return n;
		});
		setSavedMsg("");
	};
	const saveMut = useMutation({
		mutationFn: () => saveMyStocks([...selected.values()]),
		onSuccess: () => {
			setSavedMsg("Saved — re-activate extension to open these tabs");
			qc.invalidateQueries({ queryKey: ["my-stocks"] });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-primary",
					children: "Watchlist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold tracking-tight md:text-3xl",
					style: { fontFamily: "Syne, sans-serif" },
					children: "My Stocks"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Choose symbols for the extension. Next activate opens only these URLs."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => saveMut.mutate(),
				disabled: saveMut.isPending,
				className: "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-info px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
				children: [
					saveMut.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
					"Save (",
					selected.size,
					")"
				]
			})]
		}),
		savedMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 rounded-xl border border-bull/30 bg-bull/10 px-4 py-2 text-sm text-bull",
			children: [
				savedMsg,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/option-chain",
					className: "underline",
					children: "View option chain →"
				})
			]
		}),
		saveMut.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 rounded-xl border border-bear/30 bg-bear/10 px-4 py-2 text-sm text-bear",
			children: saveMut.error.message
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Selected",
					value: String(selected.size)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Indices",
					value: String(indices.length),
					tone: "text-info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Stocks",
					value: String(equities.length),
					tone: "text-bull"
				})
			]
		}),
		selected.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card mb-5 rounded-2xl p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Your list"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [...selected.values()].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setSelected((prev) => {
							const n = new Map(prev);
							n.delete(s.symbol);
							return n;
						});
						setSavedMsg("");
					},
					className: cn("rounded-full px-3 py-1 font-mono text-xs font-semibold transition", s.type === "index" ? "bg-info/15 text-info hover:bg-info/25" : "bg-primary/15 text-primary hover:bg-primary/25"),
					title: "Click to remove",
					children: [s.symbol, " ×"]
				}, s.symbol))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search NIFTY, RELIANCE...",
					className: "w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary/40"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				children: [
					"all",
					"index",
					"stock"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(t),
					className: cn("rounded-xl px-3 py-2 text-xs capitalize", tab === t ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"),
					children: t
				}, t))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"Catalog page ",
				page,
				"/",
				totalPages,
				" · ",
				40,
				"/page · total ",
				total
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: page <= 1,
					onClick: () => setPage((p) => Math.max(1, p - 1)),
					className: "inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 disabled:opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), " Prev"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: page >= totalPages,
					onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
					className: "inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 disabled:opacity-40",
					children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
				})]
			})]
		}),
		catalogQuery.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Loading catalog..."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3",
			children: catalog.map((s, i) => {
				const on = selected.has(s.symbol);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					type: "button",
					initial: {
						opacity: 0,
						y: 6
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: Math.min(i, 20) * .02 },
					onClick: () => toggle(s),
					className: cn("rounded-2xl border p-4 text-left transition", on ? "border-primary/40 bg-primary/10 shadow-inner" : "border-white/5 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-sm font-bold text-primary",
									children: s.symbol
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: s.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase", s.type === "index" ? "bg-info/15 text-info" : "bg-white/10 text-muted-foreground"),
								children: s.type
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 truncate font-mono text-[10px] text-muted-foreground/80",
							children: s.url
						}),
						on && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 inline-flex items-center gap-1 text-[11px] text-bull",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Selected for extension"]
						})
					]
				}, s._id);
			})
		}),
		!catalogQuery.isLoading && catalog.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "No stocks in catalog. Ask admin to add stock URLs."
		})
	] });
}
function Stat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card rounded-2xl px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mt-1 font-mono text-xl font-bold", tone),
			children: value
		})]
	});
}
//#endregion
export { MyStocksPage as component };

import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Trash2, l as Plus, t as X, u as Pencil } from "../_libs/lucide-react.mjs";
import { t as DashboardLayout } from "./DashboardLayout-D0t4WlQL.mjs";
import { i as createCatalogStock, l as fetchCatalogStocks, o as deleteCatalogStock, p as updateCatalogStock } from "./admin-api-Cezo27ni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-stocks-Dn_8_q0y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	symbol: "",
	name: "",
	url: "",
	type: "index",
	expiry: "",
	notes: "",
	isActive: true
};
function AdminStocksPage() {
	const qc = useQueryClient();
	const [q, setQ] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const stocks = useQuery({
		queryKey: ["catalog-stocks", q],
		queryFn: () => fetchCatalogStocks({ q: q || void 0 })
	}).data?.stocks ?? [];
	const refresh = () => qc.invalidateQueries({ queryKey: ["catalog-stocks"] });
	const deleteMut = useMutation({
		mutationFn: deleteCatalogStock,
		onSuccess: refresh
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-primary",
					children: "Admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold",
					children: "Stock URLs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Full CRUD — symbol, name, scrape URL, type"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					className: "rounded-xl bg-white/5 px-3 py-2 text-sm hover:bg-white/10",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setCreating(true),
					className: "inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Stock"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Search symbol / name / url",
			className: "mb-4 w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass-card overflow-hidden rounded-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[820px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-white/5 text-left text-[10px] uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Symbol"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "URL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [stocks.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-white/[0.04] hover:bg-white/[0.03]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 font-mono font-semibold text-primary",
								children: s.symbol
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-[280px] truncate px-3 py-3 text-xs text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: s.url,
									target: "_blank",
									rel: "noreferrer",
									className: "hover:text-info",
									children: s.url
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-xs capitalize",
								children: s.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full px-2 py-0.5 text-[11px]", s.isActive ? "bg-bull/15 text-bull" : "bg-white/10 text-muted-foreground"),
									children: s.isActive ? "Yes" : "No"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditing(s),
										className: "rounded-lg bg-white/5 p-1.5 hover:bg-white/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (confirm(`Delete ${s.symbol}?`)) deleteMut.mutate(s._id);
										},
										className: "rounded-lg bg-bear/10 p-1.5 text-bear hover:bg-bear/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})
							})
						]
					}, s._id)), stocks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-3 py-10 text-center text-muted-foreground",
						children: "No stocks yet — add NIFTY / BANKNIFTY URLs here"
					}) })] })]
				})
			})
		}),
		(creating || editing) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockFormModal, {
			initial: editing,
			onClose: () => {
				setCreating(false);
				setEditing(null);
			},
			onSaved: () => {
				setCreating(false);
				setEditing(null);
				refresh();
			}
		})
	] });
}
function StockFormModal({ initial, onClose, onSaved }) {
	const [form, setForm] = (0, import_react.useState)(initial ? {
		symbol: initial.symbol,
		name: initial.name,
		url: initial.url,
		type: initial.type,
		expiry: initial.expiry || "",
		notes: initial.notes || "",
		isActive: initial.isActive
	} : emptyForm);
	const [err, setErr] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErr("");
		try {
			if (initial) await updateCatalogStock(initial._id, form);
			else await createCatalogStock(form);
			onSaved();
		} catch (error) {
			setErr(error.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card w-full max-w-lg rounded-2xl p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: initial ? "Edit Stock" : "Add Stock"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-lg p-1 hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: "Symbol (e.g. NIFTY)",
						value: form.symbol,
						onChange: (e) => setForm({
							...form,
							symbol: e.target.value.toUpperCase()
						}),
						className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: "Name (e.g. Nifty 50)",
						value: form.name,
						onChange: (e) => setForm({
							...form,
							name: e.target.value
						}),
						className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: "URL (option chain / quote page)",
						value: form.url,
						onChange: (e) => setForm({
							...form,
							url: e.target.value
						}),
						className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.type,
							onChange: (e) => setForm({
								...form,
								type: e.target.value
							}),
							className: "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "index",
								children: "index"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "stock",
								children: "stock"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Expiry (optional)",
							value: form.expiry,
							onChange: (e) => setForm({
								...form,
								expiry: e.target.value
							}),
							className: "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						placeholder: "Notes (optional)",
						value: form.notes,
						onChange: (e) => setForm({
							...form,
							notes: e.target.value
						}),
						className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none",
						rows: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.isActive,
							onChange: (e) => setForm({
								...form,
								isActive: e.target.checked
							})
						}), "Active"]
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-bear",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: loading,
						className: "w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground",
						children: loading ? "Saving..." : "Save"
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminStocksPage as component };

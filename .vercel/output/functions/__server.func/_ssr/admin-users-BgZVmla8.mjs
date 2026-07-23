import { o as __toESM } from "../_runtime.mjs";
import { c as isSuperAdmin } from "./auth-Da7F6gv0.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Check, c as RefreshCw, i as Trash2, l as Plus, p as Link2, t as X } from "../_libs/lucide-react.mjs";
import { t as DashboardLayout } from "./DashboardLayout-D0t4WlQL.mjs";
import { a as deleteAdminUser, c as fetchAdminUsers, d as rejectUser, f as resetUserDevice, l as fetchCatalogStocks, n as assignUserStocks, r as createAdminUser, t as approveUser, u as fetchUserDetail } from "./admin-api-Cezo27ni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-users-BgZVmla8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function statusBadge(status) {
	return {
		pending: "bg-amber-500/15 text-amber-300",
		approved: "bg-bull/15 text-bull",
		rejected: "bg-bear/15 text-bear"
	}[status] || "bg-white/10 text-muted-foreground";
}
function AdminUsersPage() {
	const qc = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [showCreate, setShowCreate] = (0, import_react.useState)(false);
	const [assignFor, setAssignFor] = (0, import_react.useState)(null);
	const users = useQuery({
		queryKey: [
			"admin-users",
			filter,
			q
		],
		queryFn: () => fetchAdminUsers({
			status: filter === "all" ? void 0 : filter,
			q: q || void 0
		})
	}).data?.users ?? [];
	const refresh = () => qc.invalidateQueries({ queryKey: ["admin-users"] });
	const approveMut = useMutation({
		mutationFn: approveUser,
		onSuccess: refresh
	});
	const rejectMut = useMutation({
		mutationFn: rejectUser,
		onSuccess: refresh
	});
	const deleteMut = useMutation({
		mutationFn: deleteAdminUser,
		onSuccess: refresh
	});
	const resetMut = useMutation({
		mutationFn: resetUserDevice,
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
					children: "Manage Users"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Approve, edit, assign stocks, full CRUD"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					className: "rounded-xl bg-white/5 px-3 py-2 text-sm hover:bg-white/10",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowCreate(true),
					className: "inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add User"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search name / email / ACT-ID",
				className: "flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				children: [
					"all",
					"pending",
					"approved",
					"rejected"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(f),
					className: cn("rounded-xl px-3 py-2 text-xs capitalize", filter === f ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"),
					children: f
				}, f))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass-card overflow-hidden rounded-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[860px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-white/5 text-left text-[10px] uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "User"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Role"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Activation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3",
								children: "Device"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-white/[0.04] hover:bg-white/[0.03]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: u.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: u.email
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 font-mono text-xs",
								children: u.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium", statusBadge(u.approvalStatus)),
									children: u.approvalStatus
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 font-mono text-[11px]",
								children: u.activationId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-xs text-muted-foreground",
								children: u.deviceId ? "Bound" : "Free"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap justify-end gap-1",
									children: [
										u.approvalStatus === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Approve",
											onClick: () => approveMut.mutate(u._id),
											className: "rounded-lg bg-bull/15 p-1.5 text-bull hover:bg-bull/25",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Reject",
											onClick: () => rejectMut.mutate(u._id),
											className: "rounded-lg bg-bear/15 p-1.5 text-bear hover:bg-bear/25",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Assign stocks",
											onClick: () => setAssignFor(u),
											className: "rounded-lg bg-info/15 p-1.5 text-info hover:bg-info/25",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-3.5 w-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Reset device",
											onClick: () => resetMut.mutate(u._id),
											className: "rounded-lg bg-white/5 p-1.5 hover:bg-white/10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" })
										}),
										u.role !== "superadmin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Delete",
											onClick: () => {
												if (confirm(`Delete ${u.email}?`)) deleteMut.mutate(u._id);
											},
											className: "rounded-lg bg-bear/10 p-1.5 text-bear hover:bg-bear/20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								})
							})
						]
					}, u._id)), users.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "px-3 py-10 text-center text-muted-foreground",
						children: "No users found"
					}) })] })]
				})
			})
		}),
		showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateUserModal, {
			onClose: () => setShowCreate(false),
			onCreated: () => {
				setShowCreate(false);
				refresh();
			}
		}),
		assignFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignStocksModal, {
			user: assignFor,
			onClose: () => setAssignFor(null),
			onSaved: () => {
				setAssignFor(null);
				refresh();
			}
		})
	] });
}
function CreateUserModal({ onClose, onCreated }) {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		password: "",
		role: "user",
		approvalStatus: "approved"
	});
	const [err, setErr] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const staff = isSuperAdmin();
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErr("");
		try {
			await createAdminUser(form);
			onCreated();
		} catch (error) {
			setErr(error.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: "Create User",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-3",
			children: [
				[
					"name",
					"email",
					"password"
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					type: k === "password" ? "password" : k === "email" ? "email" : "text",
					placeholder: k,
					value: form[k],
					onChange: (e) => setForm({
						...form,
						[k]: e.target.value
					}),
					className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
				}, k)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: form.role,
					onChange: (e) => setForm({
						...form,
						role: e.target.value
					}),
					className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "user",
							children: "user"
						}),
						staff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "admin",
							children: "admin"
						}),
						staff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "superadmin",
							children: "superadmin"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: form.approvalStatus,
					onChange: (e) => setForm({
						...form,
						approvalStatus: e.target.value
					}),
					className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "approved",
							children: "approved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "pending",
							children: "pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "rejected",
							children: "rejected"
						})
					]
				}),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-bear",
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: loading,
					className: "w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground",
					children: loading ? "Creating..." : "Create"
				})
			]
		})
	});
}
function AssignStocksModal({ user, onClose, onSaved }) {
	const detailQuery = useQuery({
		queryKey: ["user-detail", user._id],
		queryFn: () => fetchUserDetail(user._id)
	});
	const catalog = useQuery({
		queryKey: ["catalog-stocks"],
		queryFn: () => fetchCatalogStocks()
	}).data?.stocks ?? [];
	const assigned = detailQuery.data?.stocks ?? [];
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!hydrated && detailQuery.isSuccess) {
			setSelected(new Set(assigned.map((s) => s.symbol)));
			setHydrated(true);
		}
	}, [
		assigned,
		detailQuery.isSuccess,
		hydrated
	]);
	const toggle = (symbol) => {
		setSelected((prev) => {
			const n = new Set(prev);
			n.has(symbol) ? n.delete(symbol) : n.add(symbol);
			return n;
		});
	};
	const save = async () => {
		setLoading(true);
		setErr("");
		try {
			const stocks = catalog.filter((s) => selected.has(s.symbol)).map((s) => ({
				symbol: s.symbol,
				name: s.name,
				url: s.url,
				type: s.type
			}));
			await assignUserStocks(user._id, stocks);
			onSaved();
		} catch (error) {
			setErr(error.message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: `Assign stocks · ${user.name}`,
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 max-h-72 space-y-1 overflow-y-auto",
				children: [catalog.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-start gap-2 rounded-xl px-2 py-2 hover:bg-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: selected.has(s.symbol),
						onChange: () => toggle(s.symbol),
						className: "mt-1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-medium",
							children: [
								s.symbol,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: ["· ", s.name]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-[11px] text-muted-foreground",
							children: s.url
						})]
					})]
				}, s._id)), catalog.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No stocks in catalog. Add some first."
				})]
			}),
			err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm text-bear",
				children: err
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: save,
				disabled: loading,
				className: "w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground",
				children: loading ? "Saving..." : `Save (${selected.size} selected)`
			})
		]
	});
}
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card w-full max-w-lg rounded-2xl p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-lg p-1 hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), children]
		})
	});
}
//#endregion
export { AdminUsersPage as component };

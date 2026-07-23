import { o as __toESM } from "../_runtime.mjs";
import { a as getUserName, o as isAdmin, r as getRole, s as isLoggedIn, t as clearAuth } from "./auth-Da7F6gv0.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { S as ChevronLeft, a as Sparkles, d as LogOut, m as Layers, n as Users, o as Shield, p as Link2, w as BookmarkPlus, y as CircleUser } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardLayout-D0t4WlQL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var userItems = [
	{
		to: "/option-chain",
		label: "Option Chain",
		icon: Layers
	},
	{
		to: "/my-stocks",
		label: "My Stocks",
		icon: BookmarkPlus
	},
	{
		to: "/settings",
		label: "Account",
		icon: CircleUser
	}
];
var adminItems = [
	{
		to: "/admin",
		label: "Admin Home",
		icon: Shield
	},
	{
		to: "/admin-users",
		label: "Users",
		icon: Users
	},
	{
		to: "/admin-stocks",
		label: "Stock URLs",
		icon: Link2
	},
	{
		to: "/settings",
		label: "Account",
		icon: CircleUser
	}
];
function Sidebar() {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const loggedIn = typeof window !== "undefined" && isLoggedIn();
	const admin = typeof window !== "undefined" && isAdmin();
	const name = typeof window !== "undefined" ? getUserName() : null;
	const items = admin ? adminItems : userItems;
	const logout = () => {
		const wasAdmin = admin;
		clearAuth();
		navigate({ to: wasAdmin ? "/admin-login" : "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		animate: { width: collapsed ? 76 : 244 },
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 30
		},
		className: "glass-panel sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden md:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-4 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-foreground" })
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-bold tracking-tight",
						children: "Alpha Terminal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-[10px] uppercase tracking-widest text-muted-foreground",
						children: admin ? "Super Admin" : "User Panel"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 space-y-1 px-3",
				children: loggedIn && items.map((it) => {
					const active = pathname === it.to;
					const Icon = it.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: it.to,
						className: cn("group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all", active ? "bg-gradient-to-r from-primary/20 to-info/10 text-foreground shadow-inner" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"),
						children: [
							active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								layoutId: "sidebar-active",
								className: "absolute inset-y-1.5 left-0 w-1 rounded-full bg-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-[18px] w-[18px] shrink-0" }),
							!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: it.label
							})
						]
					}, it.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 border-t border-white/5 p-3",
				children: [
					!collapsed && loggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate px-2 text-xs text-muted-foreground",
						children: name || "Signed in"
					}),
					loggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: logout,
						className: "flex w-full items-center justify-center gap-2 rounded-xl bg-bear/10 py-2 text-xs text-bear transition hover:bg-bear/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), !collapsed && "Logout"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setCollapsed((c) => !c),
						className: "flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2 text-xs text-muted-foreground transition hover:bg-white/10 hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: cn("h-4 w-4 transition-transform", collapsed && "rotate-180") }), !collapsed && "Collapse"]
					})
				]
			})
		]
	});
}
function Header() {
	const [now, setNow] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(id);
	}, []);
	const time = now.toLocaleTimeString("en-IN", { hour12: false });
	const name = typeof window !== "undefined" ? getUserName() : null;
	const role = typeof window !== "undefined" ? getRole() : null;
	const admin = typeof window !== "undefined" && isAdmin();
	const initials = (name || "U").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "glass-panel sticky top-0 z-40 flex items-center gap-3 border-b border-white/5 px-4 py-3 md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 items-center gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					animate: {
						scale: [
							1,
							1.3,
							1
						],
						opacity: [
							1,
							.6,
							1
						]
					},
					transition: {
						duration: 1.6,
						repeat: Infinity
					},
					className: `h-2 w-2 rounded-full ${admin ? "bg-primary" : "bg-bull"}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium",
					children: admin ? "Admin session" : "User session"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden rounded-full bg-white/5 px-3 py-1.5 font-mono text-xs md:block",
					children: [time, " IST"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden text-right sm:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold",
						children: name || "User"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: role || "user"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-info text-xs font-bold text-primary-foreground",
					children: initials
				})
			]
		})]
	});
}
function DashboardLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px] opacity-70",
					style: { background: "radial-gradient(60% 60% at 20% 0%, color-mix(in oklab, var(--color-info) 20%, transparent), transparent 60%), radial-gradient(50% 50% at 90% 10%, color-mix(in oklab, var(--color-bull) 12%, transparent), transparent 60%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.main, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .35,
						ease: "easeOut"
					},
					className: "relative z-10 min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8",
					children
				})
			]
		})]
	});
}
//#endregion
export { DashboardLayout as t };

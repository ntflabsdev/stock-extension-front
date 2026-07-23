import { t as clearAuth } from "./auth-Da7F6gv0.mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { _ as Clock3, b as CircleCheck, d as LogOut, h as Database, m as Layers, n as Users, v as CircleX } from "../_libs/lucide-react.mjs";
import { t as DashboardLayout } from "./DashboardLayout-D0t4WlQL.mjs";
import { s as fetchAdminStats } from "./admin-api-Cezo27ni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B-3X1WJX.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboardPage() {
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: fetchAdminStats,
		refetchInterval: 3e4
	});
	const stats = data?.stats;
	const cards = [
		{
			label: "Total Users",
			value: stats?.totalUsers ?? 0,
			icon: Users,
			tone: "text-info"
		},
		{
			label: "Pending Approval",
			value: stats?.pendingUsers ?? 0,
			icon: Clock3,
			tone: "text-amber-400"
		},
		{
			label: "Approved",
			value: stats?.approvedUsers ?? 0,
			icon: CircleCheck,
			tone: "text-bull"
		},
		{
			label: "Rejected",
			value: stats?.rejectedUsers ?? 0,
			icon: CircleX,
			tone: "text-bear"
		},
		{
			label: "Stock URLs",
			value: stats?.totalStocks ?? 0,
			icon: Layers,
			tone: "text-primary"
		},
		{
			label: "Option Rows",
			value: stats?.optionChainCount ?? 0,
			icon: Database,
			tone: "text-info"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-primary",
					children: "Super Admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold tracking-tight md:text-3xl",
					children: "Control Panel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Approve users, manage stock URLs, assign feeds."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin-users",
						className: "rounded-xl bg-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/30",
						children: "Manage Users"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin-stocks",
						className: "rounded-xl bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10",
						children: "Manage Stocks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							clearAuth();
							navigate({ to: "/admin-login" });
						},
						className: "inline-flex items-center gap-1.5 rounded-xl bg-bear/15 px-3 py-2 text-sm text-bear",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
					})
				]
			})]
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading stats..."
		}),
		isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 rounded-xl border border-bear/30 bg-bear/10 px-3 py-2 text-sm text-bear",
			children: error?.message || "Failed to load"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-3",
			children: cards.map((c, i) => {
				const Icon = c.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .04 },
					className: "glass-card rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-wider text-muted-foreground",
							children: c.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${c.tone}` })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 font-mono text-2xl font-bold",
						children: c.value
					})]
				}, c.label);
			})
		})
	] });
}
//#endregion
export { AdminDashboardPage as component };

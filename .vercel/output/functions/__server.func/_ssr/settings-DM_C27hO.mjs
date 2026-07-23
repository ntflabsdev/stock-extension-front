import { a as getUserName, n as getActivationId, o as isAdmin, r as getRole, t as clearAuth } from "./auth-Da7F6gv0.mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as LogOut, g as Copy, o as Shield, r as User } from "../_libs/lucide-react.mjs";
import { t as DashboardLayout } from "./DashboardLayout-D0t4WlQL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DM_C27hO.js
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const navigate = useNavigate();
	const name = getUserName() || "User";
	const role = getRole() || "user";
	const activationId = getActivationId() || "—";
	const admin = isAdmin();
	const logout = () => {
		const admin = isAdmin();
		clearAuth();
		navigate({ to: admin ? "/admin-login" : "/login" });
	};
	const copyAct = async () => {
		if (!activationId || activationId === "—") return;
		await navigator.clipboard.writeText(activationId);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-semibold uppercase tracking-widest text-primary",
				children: "Account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-2xl font-bold tracking-tight md:text-3xl",
				children: "Your profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Real session info — no demo data."
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid max-w-xl gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card flex items-center gap-4 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-info/10 text-primary",
					children: admin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-lg font-bold",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: role
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Extension Activation ID"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "flex-1 truncate font-mono text-sm",
							children: activationId
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: copyAct,
							className: "rounded-lg bg-white/5 p-2 hover:bg-white/10",
							title: "Copy",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Use this ID in the Chrome extension to activate scraping."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: logout,
				className: "inline-flex items-center justify-center gap-2 rounded-xl bg-bear/15 px-4 py-3 text-sm font-semibold text-bear hover:bg-bear/25",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
			})
		]
	})] });
}
//#endregion
export { AccountPage as component };

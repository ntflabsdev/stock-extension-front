import { o as __toESM } from "../_runtime.mjs";
import { t as clearAuth } from "./auth-Da7F6gv0.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { f as LoaderCircle, o as Shield } from "../_libs/lucide-react.mjs";
import { t as ApiError } from "./api-CbvcDHVc.mjs";
import { r as login } from "./option-chain-api-BXjZ2eE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-login-RnJG52il.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			clearAuth();
			const data = await login(email.trim(), password);
			if (!(data.role === "admin" || data.role === "superadmin")) {
				clearAuth();
				setError("This portal is for admins only. Use the user login instead.");
				return;
			}
			navigate({ to: "/admin" });
		} catch (err) {
			setError(err instanceof ApiError ? err.message : "Login failed. Is backend running?");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			style: { background: "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.4 0.12 235 / 30%), transparent 60%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "glass-card relative w-full max-w-md rounded-3xl p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-primary-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg font-bold tracking-tight",
						style: { fontFamily: "Syne, sans-serif" },
						children: "Admin Portal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Super admin / admin login"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted-foreground",
							children: "Admin email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10",
							placeholder: "admin@stock.com",
							autoComplete: "username"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted-foreground",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10",
							placeholder: "••••••••",
							autoComplete: "current-password"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-bear/30 bg-bear/10 px-3 py-2 text-sm text-bear",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-info py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60",
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), loading ? "Signing in..." : "Admin Sign in"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: [
						"End user?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-primary hover:underline",
							children: "User login"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:underline",
							children: "Home"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { AdminLoginPage as component };

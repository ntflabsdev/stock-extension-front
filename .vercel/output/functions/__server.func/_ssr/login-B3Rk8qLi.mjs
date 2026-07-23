import { o as __toESM } from "../_runtime.mjs";
import { t as clearAuth } from "./auth-Da7F6gv0.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { a as Sparkles, f as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as apiFetch, t as ApiError } from "./api-CbvcDHVc.mjs";
import { r as login } from "./option-chain-api-BXjZ2eE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B3Rk8qLi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [info, setInfo] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setInfo("");
		setLoading(true);
		try {
			if (mode === "signup") {
				const data = await apiFetch("/api/auth/signup", {
					method: "POST",
					body: JSON.stringify({
						name: name.trim(),
						email: email.trim(),
						password
					})
				});
				setInfo(`${data.msg}${data.activationId ? ` Activation ID: ${data.activationId}` : ""}`);
				setMode("login");
				setPassword("");
			} else {
				const data = await login(email.trim(), password);
				if (data.role === "admin" || data.role === "superadmin") {
					clearAuth();
					setError("Admin accounts use the Admin Portal.");
					return;
				}
				navigate({ to: "/option-chain" });
			}
		} catch (err) {
			setError(err instanceof ApiError ? err.message : "Request failed. Is backend running?");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-info/15 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						className: "mb-6 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-bold tracking-tight",
							children: "User Login"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: mode === "login" ? "Sign in to your desk" : "Create account"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 grid grid-cols-2 gap-1 rounded-xl bg-white/5 p-1",
						children: ["login", "signup"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMode(m);
								setError("");
								setInfo("");
							},
							className: cn("rounded-lg py-2 text-sm font-medium capitalize", mode === m ? "bg-primary/20 text-primary" : "text-muted-foreground"),
							children: m
						}, m))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "space-y-4",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10",
								placeholder: "Your name"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10",
								placeholder: "you@example.com",
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
								autoComplete: mode === "login" ? "current-password" : "new-password"
							})] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-bear/30 bg-bear/10 px-3 py-2 text-sm text-bear",
								children: error
							}),
							info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-bull/30 bg-bull/10 px-3 py-2 text-sm text-bull",
								children: info
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: loading,
								className: "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-info py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60",
								children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), loading ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-xs text-muted-foreground",
						children: [
							"Admin?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin-login",
								className: "text-primary hover:underline",
								children: "Admin login"
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
			})
		]
	});
}
//#endregion
export { LoginPage as component };

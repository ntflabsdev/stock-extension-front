import { o as __toESM } from "../_runtime.mjs";
import { o as isAdmin, s as isLoggedIn } from "./auth-Da7F6gv0.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BnBjgftT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-c0BX0Lsr.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error("[Market Pulse]", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Market Pulse" },
			{
				name: "description",
				content: "Live option chain, stocks & admin dashboard"
			},
			{
				name: "theme-color",
				content: "#0B0F19"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-background text-foreground",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$8 = () => import("./routes-CozDLL2b.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Alpha Terminal — Indian Options Desk" }, {
		name: "description",
		content: "Scrape, store and visualize NIFTY option chains. Login for your live desk."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
/** Landing-only showcase numbers — not live feed */
var $$splitComponentImporter$7 = () => import("./admin-B-3X1WJX.mjs");
var Route$7 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin — Alpha Terminal" }] }),
	beforeLoad: () => {
		if (typeof window !== "undefined") {
			if (!isLoggedIn() || !isAdmin()) throw redirect({ to: "/admin-login" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin-login-RnJG52il.mjs");
var Route$6 = createFileRoute("/admin-login")({
	head: () => ({ meta: [{ title: "Admin Login — Alpha Terminal" }] }),
	beforeLoad: () => {
		if (typeof window !== "undefined" && isLoggedIn() && isAdmin()) throw redirect({ to: "/admin" });
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin-stocks-Dn_8_q0y.mjs");
var Route$5 = createFileRoute("/admin-stocks")({
	head: () => ({ meta: [{ title: "Stocks — Admin" }] }),
	beforeLoad: () => {
		if (typeof window !== "undefined") {
			if (!isLoggedIn() || !isAdmin()) throw redirect({ to: "/admin-login" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin-users-BgZVmla8.mjs");
var Route$4 = createFileRoute("/admin-users")({
	head: () => ({ meta: [{ title: "Users — Admin" }] }),
	beforeLoad: () => {
		if (typeof window !== "undefined") {
			if (!isLoggedIn() || !isAdmin()) throw redirect({ to: "/admin-login" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./login-B3Rk8qLi.mjs");
var Route$3 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "User Login — Alpha Terminal" }, {
		name: "description",
		content: "Sign in to view live option chain data."
	}] }),
	beforeLoad: () => {
		if (typeof window !== "undefined" && isLoggedIn()) {
			if (isAdmin()) throw redirect({ to: "/admin" });
			throw redirect({ to: "/option-chain" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./my-stocks-BFTcdije.mjs");
var Route$2 = createFileRoute("/my-stocks")({
	head: () => ({ meta: [{ title: "My Stocks — Alpha Terminal" }] }),
	beforeLoad: () => {
		if (typeof window !== "undefined") {
			if (!isLoggedIn()) throw redirect({ to: "/login" });
			if (isAdmin()) throw redirect({ to: "/admin" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./option-chain-C9YZNBGd.mjs");
var Route$1 = createFileRoute("/option-chain")({
	head: () => ({ meta: [{ title: "Option Chain — Alpha Terminal" }] }),
	beforeLoad: () => {
		if (typeof window !== "undefined") {
			if (!isLoggedIn()) throw redirect({ to: "/login" });
			if (isAdmin()) throw redirect({ to: "/admin" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./settings-DM_C27hO.mjs");
var Route = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Account — Alpha Terminal" }] }),
	beforeLoad: () => {
		if (typeof window !== "undefined" && !isLoggedIn()) throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	AdminRoute: Route$7.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$9
	}),
	AdminLoginRoute: Route$6.update({
		id: "/admin-login",
		path: "/admin-login",
		getParentRoute: () => Route$9
	}),
	AdminStocksRoute: Route$5.update({
		id: "/admin-stocks",
		path: "/admin-stocks",
		getParentRoute: () => Route$9
	}),
	AdminUsersRoute: Route$4.update({
		id: "/admin-users",
		path: "/admin-users",
		getParentRoute: () => Route$9
	}),
	LoginRoute: Route$3.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$9
	}),
	MyStocksRoute: Route$2.update({
		id: "/my-stocks",
		path: "/my-stocks",
		getParentRoute: () => Route$9
	}),
	OptionChainRoute: Route$1.update({
		id: "/option-chain",
		path: "/option-chain",
		getParentRoute: () => Route$9
	}),
	SettingsRoute: Route.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

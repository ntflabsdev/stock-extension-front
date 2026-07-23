import { i as getToken, t as clearAuth } from "./auth-Da7F6gv0.mjs";
import { n as apiFetch } from "./api-CbvcDHVc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-stocks-api-C6Yfj3WI.js
async function authed(path, options = {}) {
	const token = getToken();
	if (!token) throw new Error("Not logged in");
	try {
		return await apiFetch(path, {
			...options,
			token
		});
	} catch (err) {
		if (err.status === 401) clearAuth();
		throw err;
	}
}
function fetchCatalog(params) {
	const qs = new URLSearchParams();
	if (params?.q) qs.set("q", params.q);
	if (params?.type) qs.set("type", params.type);
	qs.set("page", String(params?.page ?? 1));
	qs.set("limit", String(params?.limit ?? 40));
	return authed(`/api/user/catalog?${qs}`);
}
function fetchMyStocks(params) {
	const qs = new URLSearchParams();
	qs.set("page", String(params?.page ?? 1));
	qs.set("limit", String(params?.limit ?? 200));
	return authed(`/api/user/stocks?${qs}`);
}
function saveMyStocks(stocks) {
	return authed("/api/user/stocks", {
		method: "POST",
		body: JSON.stringify({ stocks })
	});
}
//#endregion
export { fetchMyStocks as n, saveMyStocks as r, fetchCatalog as t };

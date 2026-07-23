import { i as getToken, l as setAuth, t as clearAuth } from "./auth-Da7F6gv0.mjs";
import { n as apiFetch } from "./api-CbvcDHVc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/option-chain-api-BXjZ2eE1.js
async function login(email, password) {
	const data = await apiFetch("/api/auth/login", {
		method: "POST",
		body: JSON.stringify({
			email,
			password
		})
	});
	setAuth(data.token, {
		activationId: data.activationId,
		role: data.role,
		name: data.name
	});
	return data;
}
async function fetchOptionChain(symbol, expiry, page = 1, limit = 40) {
	const token = getToken();
	if (!token) throw new Error("Not logged in");
	const params = new URLSearchParams();
	if (symbol) params.set("symbol", symbol);
	if (expiry) params.set("expiry", expiry);
	params.set("page", String(page));
	params.set("limit", String(limit));
	try {
		return await apiFetch(`/api/user/optionchain?${params}`, { token });
	} catch (err) {
		if (err.status === 401) clearAuth();
		throw err;
	}
}
async function fetchOptionChainMeta() {
	const token = getToken();
	if (!token) throw new Error("Not logged in");
	try {
		return await apiFetch("/api/user/optionchain/meta", { token });
	} catch (err) {
		if (err.status === 401) clearAuth();
		throw err;
	}
}
//#endregion
export { fetchOptionChainMeta as n, login as r, fetchOptionChain as t };

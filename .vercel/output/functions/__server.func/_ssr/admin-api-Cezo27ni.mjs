import { i as getToken, t as clearAuth } from "./auth-Da7F6gv0.mjs";
import { n as apiFetch } from "./api-CbvcDHVc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-api-Cezo27ni.js
async function adminFetch(path, options = {}) {
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
function fetchAdminStats() {
	return adminFetch("/api/admin/stats");
}
function fetchAdminUsers(params) {
	const qs = new URLSearchParams();
	if (params?.status) qs.set("status", params.status);
	if (params?.q) qs.set("q", params.q);
	const q = qs.toString();
	return adminFetch(`/api/admin/users${q ? `?${q}` : ""}`);
}
function createAdminUser(body) {
	return adminFetch("/api/admin/users", {
		method: "POST",
		body: JSON.stringify(body)
	});
}
function approveUser(id) {
	return adminFetch(`/api/admin/users/${id}/approve`, { method: "POST" });
}
function rejectUser(id) {
	return adminFetch(`/api/admin/users/${id}/reject`, { method: "POST" });
}
function resetUserDevice(id) {
	return adminFetch(`/api/admin/users/${id}/reset-device`, { method: "POST" });
}
function deleteAdminUser(id) {
	return adminFetch(`/api/admin/users/${id}`, { method: "DELETE" });
}
function assignUserStocks(id, stocks) {
	return adminFetch(`/api/admin/users/${id}/stocks`, {
		method: "PUT",
		body: JSON.stringify({ stocks })
	});
}
function fetchUserDetail(id) {
	return adminFetch(`/api/admin/users/${id}`);
}
function fetchCatalogStocks(params) {
	const qs = new URLSearchParams();
	if (params?.q) qs.set("q", params.q);
	if (params?.type) qs.set("type", params.type);
	const q = qs.toString();
	return adminFetch(`/api/admin/stocks${q ? `?${q}` : ""}`);
}
function createCatalogStock(body) {
	return adminFetch("/api/admin/stocks", {
		method: "POST",
		body: JSON.stringify(body)
	});
}
function updateCatalogStock(id, body) {
	return adminFetch(`/api/admin/stocks/${id}`, {
		method: "PUT",
		body: JSON.stringify(body)
	});
}
function deleteCatalogStock(id) {
	return adminFetch(`/api/admin/stocks/${id}`, { method: "DELETE" });
}
//#endregion
export { deleteAdminUser as a, fetchAdminUsers as c, rejectUser as d, resetUserDevice as f, createCatalogStock as i, fetchCatalogStocks as l, assignUserStocks as n, deleteCatalogStock as o, updateCatalogStock as p, createAdminUser as r, fetchAdminStats as s, approveUser as t, fetchUserDetail as u };

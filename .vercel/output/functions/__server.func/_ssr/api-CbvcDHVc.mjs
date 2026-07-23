//#region node_modules/.nitro/vite/services/ssr/assets/api-CbvcDHVc.js
function resolveApiBase() {
	const fromEnv = typeof import.meta !== "undefined" && "https://apistock.aistaging.in";
	if (fromEnv && String(fromEnv).trim()) return String(fromEnv).replace(/\/$/, "");
	return "https://apistock.aistaging.in";
}
var ApiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.status = status;
	}
};
async function apiFetch(path, options = {}) {
	const { token, headers, ...rest } = options;
	const base = resolveApiBase();
	const res = await fetch(`${base}${path}`, {
		...rest,
		headers: {
			"Content-Type": "application/json",
			...token ? { Authorization: `Bearer ${token}` } : {},
			...headers
		}
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw new ApiError(data.msg || data.message || `Request failed (${res.status})`, res.status);
	return data;
}
//#endregion
export { apiFetch as n, resolveApiBase as r, ApiError as t };

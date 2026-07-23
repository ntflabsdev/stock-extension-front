//#region node_modules/.nitro/vite/services/ssr/assets/auth-Da7F6gv0.js
var TOKEN_KEY = "mp_token";
var ACTIVATION_KEY = "mp_activationId";
var ROLE_KEY = "mp_role";
var NAME_KEY = "mp_name";
function getToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(TOKEN_KEY);
}
function getRole() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(ROLE_KEY);
}
function getUserName() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(NAME_KEY);
}
function setAuth(token, opts) {
	localStorage.setItem(TOKEN_KEY, token);
	if (opts?.activationId) localStorage.setItem(ACTIVATION_KEY, opts.activationId);
	if (opts?.role) localStorage.setItem(ROLE_KEY, opts.role);
	if (opts?.name) localStorage.setItem(NAME_KEY, opts.name);
}
function clearAuth() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(ACTIVATION_KEY);
	localStorage.removeItem(ROLE_KEY);
	localStorage.removeItem(NAME_KEY);
}
function getActivationId() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(ACTIVATION_KEY);
}
function isLoggedIn() {
	return Boolean(getToken());
}
function isAdmin() {
	const role = getRole();
	return role === "admin" || role === "superadmin";
}
function isSuperAdmin() {
	return getRole() === "superadmin";
}
//#endregion
export { getUserName as a, isSuperAdmin as c, getToken as i, setAuth as l, getActivationId as n, isAdmin as o, getRole as r, isLoggedIn as s, clearAuth as t };

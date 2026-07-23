//#region node_modules/.nitro/vite/services/ssr/assets/format-C6TtUUs8.js
var fmtNum = (n, digits = 2) => n.toLocaleString("en-IN", {
	minimumFractionDigits: digits,
	maximumFractionDigits: digits
});
var fmtSigned = (n, digits = 2) => (n >= 0 ? "+" : "") + fmtNum(n, digits);
//#endregion
export { fmtSigned as n, fmtNum as t };

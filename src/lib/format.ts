export const fmtNum = (n: number, digits = 2) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const fmtVol = (n: number) => {
  if (n >= 1e7) return (n / 1e7).toFixed(2) + " Cr";
  if (n >= 1e5) return (n / 1e5).toFixed(2) + " L";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + " K";
  return n.toString();
};

export const fmtSigned = (n: number, digits = 2) =>
  (n >= 0 ? "+" : "") + fmtNum(n, digits);

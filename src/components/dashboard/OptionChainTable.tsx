import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { OptionChainRow } from "@/lib/option-chain-api";
import { fmtNum, fmtSigned } from "@/lib/format";
import { cn } from "@/lib/utils";

function Chg({ n }: { n?: number }) {
  const v = n ?? 0;
  return (
    <span className={cn("font-mono text-xs", v >= 0 ? "text-bull" : "text-bear")}>
      {fmtSigned(v, 0)}
    </span>
  );
}

type Props = {
  rows: OptionChainRow[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  strikeFilter: string;
  onStrikeFilterChange: (q: string) => void;
};

export function OptionChainTable({
  rows,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  strikeFilter,
  onStrikeFilterChange,
}: Props) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(total, (page - 1) * limit + rows.length);

  const filteredHint = useMemo(() => {
    if (!strikeFilter.trim()) return null;
    return `Filter: ${strikeFilter}`;
  }, [strikeFilter]);

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={strikeFilter}
            onChange={(e) => onStrikeFilterChange(e.target.value)}
            placeholder="Filter strike (this page)..."
            className="w-full rounded-xl border border-white/5 bg-white/5 py-2 pl-10 pr-3 text-sm outline-none focus:border-primary/40"
          />
        </div>
        <div className="text-xs text-muted-foreground">
          {limit}/page · total {total}
          {filteredHint ? ` · ${filteredHint}` : ""}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-muted-foreground">
              <th colSpan={5} className="bg-bull/15 px-3 py-2 text-center font-semibold text-bull">
                Calls
              </th>
              <th colSpan={3} className="bg-white/5 px-3 py-2 text-center font-semibold">
                Strike
              </th>
              <th colSpan={4} className="bg-bear/15 px-3 py-2 text-center font-semibold text-bear">
                Puts
              </th>
            </tr>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-2 py-2 text-left font-medium">Time</th>
              <th className="px-2 py-2 text-right font-medium">OI Chg</th>
              <th className="px-2 py-2 text-right font-medium">OI</th>
              <th className="px-2 py-2 text-right font-medium">LTP</th>
              <th className="px-2 py-2 text-right font-medium">VWAP</th>
              <th className="px-2 py-2 text-center font-medium">Strike</th>
              <th className="px-2 py-2 text-right font-medium">PE-CE OI</th>
              <th className="px-2 py-2 text-right font-medium">PE-CE Chg</th>
              <th className="px-2 py-2 text-right font-medium">VWAP</th>
              <th className="px-2 py-2 text-right font-medium">LTP</th>
              <th className="px-2 py-2 text-right font-medium">OI</th>
              <th className="px-2 py-2 text-right font-medium">OI Chg</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={`${r.strikePrice}-${r.scrapedAt ?? ""}`}
                className="border-b border-white/[0.03] transition hover:bg-white/[0.03]"
              >
                <td className="px-2 py-2 font-mono text-[11px] text-muted-foreground">
                  {r.time || "—"}
                </td>
                <td className="px-2 py-2 text-right">
                  <Chg n={r.callOIChg} />
                </td>
                <td className="px-2 py-2 text-right font-mono text-xs">
                  {fmtNum(r.callOI ?? 0, 0)}
                </td>
                <td className="px-2 py-2 text-right font-mono text-xs text-info">
                  {fmtNum(r.callLTP ?? 0)}
                </td>
                <td className="px-2 py-2 text-right font-mono text-xs">
                  {fmtNum(r.callVWAP ?? 0)}
                </td>
                <td className="bg-primary/10 px-2 py-2 text-center font-mono text-sm font-bold text-primary">
                  {r.strikePrice}
                </td>
                <td className="px-2 py-2 text-right font-mono text-xs">
                  {fmtNum(r.peCeOI ?? 0, 0)}
                </td>
                <td className="px-2 py-2 text-right">
                  <Chg n={r.peCeOIChg} />
                </td>
                <td className="px-2 py-2 text-right font-mono text-xs">
                  {fmtNum(r.putVWAP ?? 0)}
                </td>
                <td className="px-2 py-2 text-right font-mono text-xs text-info">
                  {fmtNum(r.putLTP ?? 0)}
                </td>
                <td className="px-2 py-2 text-right font-mono text-xs">
                  {fmtNum(r.putOI ?? 0, 0)}
                </td>
                <td className="px-2 py-2 text-right">
                  <Chg n={r.putOIChg} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={12} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No option chain rows on this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-muted-foreground">
          Showing {from}–{to} of {total}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="inline-flex items-center gap-1 rounded-xl bg-white/5 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-white/10"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>
          <span className="font-mono text-xs text-muted-foreground">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="inline-flex items-center gap-1 rounded-xl bg-white/5 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-white/10"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

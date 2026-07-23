import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OptionChainTable } from "@/components/dashboard/OptionChainTable";
import { getToken, isAdmin, isLoggedIn } from "@/lib/auth";
import { fetchOptionChain, fetchOptionChainMeta, PAGE_LIMIT } from "@/lib/option-chain-api";
import { fetchMyStocks } from "@/lib/user-stocks-api";
import { useOptionChainSocket } from "@/lib/useOptionChainSocket";
import { fmtNum } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/option-chain")({
  head: () => ({
    meta: [{ title: "Option Chain — Alpha Terminal" }],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      if (!isLoggedIn()) throw redirect({ to: "/login" });
      if (isAdmin()) throw redirect({ to: "/admin" });
    }
  },
  component: OptionChainPage,
});

function OptionChainPage() {
  const [symbol, setSymbol] = useState("");
  const [expiry, setExpiry] = useState("");
  const [page, setPage] = useState(1);
  const [strikeFilter, setStrikeFilter] = useState("");
  const { connected, lastEvent } = useOptionChainSocket(Boolean(getToken()));

  const myStocksQuery = useQuery({
    queryKey: ["my-stocks"],
    queryFn: () => fetchMyStocks({ page: 1, limit: 200 }),
    enabled: Boolean(getToken()),
  });

  const metaQuery = useQuery({
    queryKey: ["optionchain-meta"],
    queryFn: fetchOptionChainMeta,
    enabled: Boolean(getToken()),
    refetchInterval: 120_000,
  });

  const myStocks = myStocksQuery.data?.stocks ?? [];
  const pairs = metaQuery.data?.pairs ?? [];

  // Exact StockSelection list for this logged-in user (no extras)
  const watchList = useMemo(
    () =>
      myStocks.map((s) => ({
        symbol: s.symbol,
        name: s.name || s.symbol,
        type: s.type === "index" ? ("index" as const) : ("stock" as const),
      })),
    [myStocks],
  );

  const indexList = useMemo(
    () => watchList.filter((s) => s.type === "index"),
    [watchList],
  );
  const stockList = useMemo(
    () => watchList.filter((s) => s.type === "stock"),
    [watchList],
  );

  const watchSymbols = useMemo(
    () => watchList.map((s) => s.symbol),
    [watchList],
  );

  useEffect(() => {
    if (!watchSymbols.length) {
      if (symbol) setSymbol("");
      return;
    }
    if (!symbol || !watchSymbols.includes(symbol)) {
      setSymbol(watchSymbols[0]);
      setExpiry("");
      setPage(1);
    }
  }, [watchSymbols, symbol]);

  const effectiveExpiry =
    expiry ||
    pairs.find((p) => p.symbol === symbol)?.expiry ||
    "";

  const chainQuery = useQuery({
    queryKey: ["optionchain", symbol, effectiveExpiry, page],
    queryFn: () => fetchOptionChain(symbol, effectiveExpiry || undefined, page, PAGE_LIMIT),
    enabled: Boolean(getToken()) && Boolean(symbol),
    refetchInterval: 120_000,
  });

  // Socket: only jump if that symbol is in user's My Stocks
  useEffect(() => {
    if (!lastEvent?.symbol) return;
    if (!watchSymbols.includes(lastEvent.symbol)) return;
    if (!symbol) {
      setSymbol(lastEvent.symbol);
      if (lastEvent.expiry) setExpiry(String(lastEvent.expiry));
      setPage(1);
    }
  }, [lastEvent, symbol, watchSymbols]);

  const rows = useMemo(() => {
    const all = chainQuery.data?.rows ?? [];
    if (!strikeFilter.trim()) return all;
    return all.filter((r) => String(r.strikePrice).includes(strikeFilter.trim()));
  }, [chainQuery.data?.rows, strikeFilter]);

  const chartData = useMemo(
    () =>
      rows.slice(0, 40).map((r) => ({
        strike: String(r.strikePrice),
        callOI: r.callOI ?? 0,
        putOI: r.putOI ?? 0,
      })),
    [rows],
  );

  const expiries = useMemo(
    () =>
      pairs
        .filter((p) => p.symbol === symbol)
        .map((p) => p.expiry)
        .filter(Boolean),
    [pairs, symbol],
  );

  const totals = chainQuery.data?.summary ?? {
    callOI: 0,
    putOI: 0,
    pcr: 0,
  };

  const total = chainQuery.data?.total ?? chainQuery.data?.count ?? 0;
  const totalPages = chainQuery.data?.totalPages ?? 1;
  const selectedMeta = watchList.find((s) => s.symbol === symbol);

  const pickSymbol = (sym: string) => {
    setSymbol(sym);
    setExpiry("");
    setPage(1);
    setStrikeFilter("");
  };

  return (
    <DashboardLayout>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Live Feed
          </div>
          <h1
            className="mt-1 text-2xl font-bold tracking-tight md:text-3xl"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Option Chain
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live socket · {PAGE_LIMIT}/page · full-width table
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs",
              connected ? "bg-bull/15 text-bull" : "bg-white/5 text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                connected ? "animate-pulse bg-bull" : "bg-muted-foreground",
              )}
            />
            {connected ? "Live socket" : "Socket offline"}
          </span>
          {lastEvent?.symbol && (
            <span className="rounded-full bg-primary/15 px-3 py-1.5 font-mono text-[11px] text-primary">
              Last: {lastEvent.symbol}
              {lastEvent.newRecords != null ? ` +${lastEvent.newRecords}` : ""}
            </span>
          )}
          <button
            onClick={() => chainQuery.refetch()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
          >
            <RefreshCw
              className={chainQuery.isFetching ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"}
            />
            Refresh
          </button>
        </div>
      </div>

      {myStocks.length === 0 && !myStocksQuery.isLoading && (
        <div className="mb-4 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
          No stocks selected yet.{" "}
          <Link to="/my-stocks" className="font-semibold text-primary underline">
            Add stocks in My Stocks
          </Link>
        </div>
      )}

      {/* Compact selectors — symbol dropdown instead of side list */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex min-w-[220px] flex-1 flex-col gap-1 sm:max-w-sm">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Symbol (My Stocks)
          </span>
          <select
            value={symbol}
            onChange={(e) => pickSymbol(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/40"
          >
            {watchList.length === 0 && <option value="">No symbols</option>}
            {indexList.length > 0 && (
              <optgroup label="Indices">
                {indexList.map((s) => (
                  <option key={s.symbol} value={s.symbol}>
                    {s.name} ({s.symbol})
                  </option>
                ))}
              </optgroup>
            )}
            {stockList.length > 0 && (
              <optgroup label="Stocks">
                {stockList.map((s) => (
                  <option key={s.symbol} value={s.symbol}>
                    {s.name} ({s.symbol})
                  </option>
                ))}
              </optgroup>
            )}
            {watchList.length > 0 && indexList.length === 0 && stockList.length === 0 &&
              watchList.map((s) => (
                <option key={s.symbol} value={s.symbol}>
                  {s.name} ({s.symbol})
                </option>
              ))}
          </select>
        </label>

        <label className="flex min-w-[160px] flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Expiry
          </span>
          <select
            value={effectiveExpiry}
            onChange={(e) => {
              setExpiry(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/40"
          >
            {expiries.length === 0 && <option value="">No expiry yet</option>}
            {expiries.map((ex) => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
        </label>

        {selectedMeta && (
          <div className="sm:ml-auto sm:pt-5">
            <div className="text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
              {selectedMeta.name}
            </div>
            <div className="font-mono text-xs text-primary">{selectedMeta.symbol}</div>
          </div>
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          ["Strikes", String(total)],
          [
            "Last scrape",
            chainQuery.data?.scrapedAt
              ? new Date(chainQuery.data.scrapedAt).toLocaleString("en-IN")
              : "No data",
          ],
          ["Call OI", fmtNum(totals.callOI, 0)],
          ["Put OI", fmtNum(totals.putOI, 0)],
          ["PCR", fmtNum(totals.pcr, 3)],
        ].map(([k, v]) => (
          <div key={k} className="glass-card rounded-2xl px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="mt-1 truncate font-mono text-sm font-semibold">{v}</div>
          </div>
        ))}
      </div>

      {chainQuery.isLoading && (
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading {symbol}...
        </div>
      )}

      {chainQuery.isError && (
        <div className="mb-4 rounded-2xl border border-bear/30 bg-bear/10 px-4 py-3 text-sm text-bear">
          {(chainQuery.error as Error)?.message || "Failed to load"}
        </div>
      )}

      {!chainQuery.isLoading && rows.length === 0 && symbol && (
        <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-muted-foreground">
          No scraped rows for <span className="font-mono text-primary">{symbol}</span> yet.
        </div>
      )}

      {chartData.length > 0 && (
        <motion.div
          key={symbol}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card mb-5 rounded-2xl p-4 md:p-5"
        >
          <div className="mb-3 text-sm font-semibold">{symbol} · Open Interest by Strike</div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="strike"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  interval="preserveStartEnd"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,18,28,0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Legend />
                <Bar dataKey="callOI" name="Call OI" fill="var(--color-bull)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="putOI" name="Put OI" fill="var(--color-bear)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      <OptionChainTable
        rows={rows}
        page={page}
        totalPages={totalPages}
        total={total}
        limit={PAGE_LIMIT}
        onPageChange={setPage}
        strikeFilter={strikeFilter}
        onStrikeFilterChange={setStrikeFilter}
      />
    </DashboardLayout>
  );
}

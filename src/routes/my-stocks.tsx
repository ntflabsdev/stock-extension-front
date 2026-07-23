import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2, Search, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getToken, isAdmin, isLoggedIn } from "@/lib/auth";
import {
  fetchCatalog,
  fetchMyStocks,
  saveMyStocks,
  PAGE_LIMIT,
  type CatalogStock,
  type UserStock,
} from "@/lib/user-stocks-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-stocks")({
  head: () => ({
    meta: [{ title: "My Stocks — Alpha Terminal" }],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      if (!isLoggedIn()) throw redirect({ to: "/login" });
      if (isAdmin()) throw redirect({ to: "/admin" });
    }
  },
  component: MyStocksPage,
});

function MyStocksPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all" | "index" | "stock">("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Map<string, UserStock>>(new Map());
  const [hydrated, setHydrated] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  const catalogQuery = useQuery({
    queryKey: ["user-catalog", tab, q, page],
    queryFn: () =>
      fetchCatalog({
        q: q || undefined,
        type: tab === "all" ? undefined : tab,
        page,
        limit: PAGE_LIMIT,
      }),
    enabled: Boolean(getToken()),
  });

  const mineQuery = useQuery({
    queryKey: ["my-stocks"],
    queryFn: () => fetchMyStocks({ page: 1, limit: 200 }),
    enabled: Boolean(getToken()),
  });

  useEffect(() => {
    setPage(1);
  }, [q, tab]);

  useEffect(() => {
    if (!hydrated && mineQuery.isSuccess) {
      const map = new Map<string, UserStock>();
      for (const s of mineQuery.data.stocks || []) {
        map.set(s.symbol, {
          symbol: s.symbol,
          name: s.name,
          url: s.url,
          type: s.type === "index" ? "index" : "stock",
        });
      }
      setSelected(map);
      setHydrated(true);
    }
  }, [mineQuery.isSuccess, mineQuery.data, hydrated]);

  const catalog = catalogQuery.data?.stocks ?? [];
  const totalPages = catalogQuery.data?.totalPages ?? 1;
  const total = catalogQuery.data?.total ?? 0;

  const indices = useMemo(
    () => [...selected.values()].filter((s) => s.type === "index"),
    [selected],
  );
  const equities = useMemo(
    () => [...selected.values()].filter((s) => s.type !== "index"),
    [selected],
  );

  const toggle = (s: CatalogStock) => {
    setSelected((prev) => {
      const n = new Map(prev);
      if (n.has(s.symbol)) n.delete(s.symbol);
      else {
        n.set(s.symbol, {
          symbol: s.symbol,
          name: s.name,
          url: s.url,
          type: s.type,
        });
      }
      return n;
    });
    setSavedMsg("");
  };

  const saveMut = useMutation({
    mutationFn: () => saveMyStocks([...selected.values()]),
    onSuccess: () => {
      setSavedMsg("Saved — re-activate extension to open these tabs");
      qc.invalidateQueries({ queryKey: ["my-stocks"] });
    },
  });

  return (
    <DashboardLayout>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Watchlist
          </div>
          <h1
            className="mt-1 text-2xl font-bold tracking-tight md:text-3xl"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            My Stocks
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose symbols for the extension. Next activate opens only these URLs.
          </p>
        </div>
        <button
          onClick={() => saveMut.mutate()}
          disabled={saveMut.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-info px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {saveMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Save ({selected.size})
        </button>
      </div>

      {savedMsg && (
        <div className="mb-4 rounded-xl border border-bull/30 bg-bull/10 px-4 py-2 text-sm text-bull">
          {savedMsg}{" "}
          <Link to="/option-chain" className="underline">
            View option chain →
          </Link>
        </div>
      )}
      {saveMut.isError && (
        <div className="mb-4 rounded-xl border border-bear/30 bg-bear/10 px-4 py-2 text-sm text-bear">
          {(saveMut.error as Error).message}
        </div>
      )}

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Stat label="Selected" value={String(selected.size)} />
        <Stat label="Indices" value={String(indices.length)} tone="text-info" />
        <Stat label="Stocks" value={String(equities.length)} tone="text-bull" />
      </div>

      {selected.size > 0 && (
        <div className="glass-card mb-5 rounded-2xl p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your list
          </div>
          <div className="flex flex-wrap gap-2">
            {[...selected.values()].map((s) => (
              <button
                key={s.symbol}
                onClick={() => {
                  setSelected((prev) => {
                    const n = new Map(prev);
                    n.delete(s.symbol);
                    return n;
                  });
                  setSavedMsg("");
                }}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-xs font-semibold transition",
                  s.type === "index"
                    ? "bg-info/15 text-info hover:bg-info/25"
                    : "bg-primary/15 text-primary hover:bg-primary/25",
                )}
                title="Click to remove"
              >
                {s.symbol} ×
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search NIFTY, RELIANCE..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary/40"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "index", "stock"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-xl px-3 py-2 text-xs capitalize",
                tab === t ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Catalog page {page}/{totalPages} · {PAGE_LIMIT}/page · total {total}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 disabled:opacity-40"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {catalogQuery.isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading catalog...
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {catalog.map((s, i) => {
          const on = selected.has(s.symbol);
          return (
            <motion.button
              key={s._id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 20) * 0.02 }}
              onClick={() => toggle(s)}
              className={cn(
                "rounded-2xl border p-4 text-left transition",
                on
                  ? "border-primary/40 bg-primary/10 shadow-inner"
                  : "border-white/5 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-mono text-sm font-bold text-primary">{s.symbol}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.name}</div>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase",
                    s.type === "index" ? "bg-info/15 text-info" : "bg-white/10 text-muted-foreground",
                  )}
                >
                  {s.type}
                </span>
              </div>
              <div className="mt-2 truncate font-mono text-[10px] text-muted-foreground/80">
                {s.url}
              </div>
              {on && (
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-bull">
                  <Sparkles className="h-3 w-3" /> Selected for extension
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {!catalogQuery.isLoading && catalog.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No stocks in catalog. Ask admin to add stock URLs.
        </p>
      )}
    </DashboardLayout>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="glass-card rounded-2xl px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={cn("mt-1 font-mono text-xl font-bold", tone)}>{value}</div>
    </div>
  );
}

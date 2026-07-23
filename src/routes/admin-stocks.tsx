import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { isAdmin, isLoggedIn } from "@/lib/auth";
import {
  createCatalogStock,
  deleteCatalogStock,
  fetchCatalogStocks,
  updateCatalogStock,
  type CatalogStock,
} from "@/lib/admin-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin-stocks")({
  head: () => ({ meta: [{ title: "Stocks — Admin" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      if (!isLoggedIn() || !isAdmin()) throw redirect({ to: "/admin-login" });
    }
  },
  component: AdminStocksPage,
});

const emptyForm = {
  symbol: "",
  name: "",
  url: "",
  type: "index" as "stock" | "index",
  expiry: "",
  notes: "",
  isActive: true,
};

function AdminStocksPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<CatalogStock | null>(null);
  const [creating, setCreating] = useState(false);

  const stocksQuery = useQuery({
    queryKey: ["catalog-stocks", q],
    queryFn: () => fetchCatalogStocks({ q: q || undefined }),
  });

  const stocks = stocksQuery.data?.stocks ?? [];
  const refresh = () => qc.invalidateQueries({ queryKey: ["catalog-stocks"] });

  const deleteMut = useMutation({
    mutationFn: deleteCatalogStock,
    onSuccess: refresh,
  });

  return (
    <DashboardLayout>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Admin</div>
          <h1 className="mt-1 text-2xl font-bold">Stock URLs</h1>
          <p className="text-sm text-muted-foreground">
            Full CRUD — symbol, name, scrape URL, type
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin" className="rounded-xl bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
            Dashboard
          </Link>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> Add Stock
          </button>
        </div>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search symbol / name / url"
        className="mb-4 w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
      />

      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-3">Symbol</th>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">URL</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Active</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s) => (
                <tr key={s._id} className="border-b border-white/[0.04] hover:bg-white/[0.03]">
                  <td className="px-3 py-3 font-mono font-semibold text-primary">{s.symbol}</td>
                  <td className="px-3 py-3">{s.name}</td>
                  <td className="max-w-[280px] truncate px-3 py-3 text-xs text-muted-foreground">
                    <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-info">
                      {s.url}
                    </a>
                  </td>
                  <td className="px-3 py-3 text-xs capitalize">{s.type}</td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px]",
                        s.isActive ? "bg-bull/15 text-bull" : "bg-white/10 text-muted-foreground",
                      )}
                    >
                      {s.isActive ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => setEditing(s)}
                        className="rounded-lg bg-white/5 p-1.5 hover:bg-white/10"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${s.symbol}?`)) deleteMut.mutate(s._id);
                        }}
                        className="rounded-lg bg-bear/10 p-1.5 text-bear hover:bg-bear/20"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {stocks.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-muted-foreground">
                    No stocks yet — add NIFTY / BANKNIFTY URLs here
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(creating || editing) && (
        <StockFormModal
          initial={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            setCreating(false);
            setEditing(null);
            refresh();
          }}
        />
      )}
    </DashboardLayout>
  );
}

function StockFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: CatalogStock | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(
    initial
      ? {
          symbol: initial.symbol,
          name: initial.name,
          url: initial.url,
          type: initial.type,
          expiry: initial.expiry || "",
          notes: initial.notes || "",
          isActive: initial.isActive,
        }
      : emptyForm,
  );
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      if (initial) await updateCatalogStock(initial._id, form);
      else await createCatalogStock(form);
      onSaved();
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="glass-card w-full max-w-lg rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{initial ? "Edit Stock" : "Add Stock"}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input
            required
            placeholder="Symbol (e.g. NIFTY)"
            value={form.symbol}
            onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
          />
          <input
            required
            placeholder="Name (e.g. Nifty 50)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
          />
          <input
            required
            placeholder="URL (option chain / quote page)"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as "stock" | "index" })
              }
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <option value="index">index</option>
              <option value="stock">stock</option>
            </select>
            <input
              placeholder="Expiry (optional)"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
            />
          </div>
          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
            rows={2}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active
          </label>
          {err && <p className="text-sm text-bear">{err}</p>}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

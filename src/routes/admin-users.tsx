import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Check, Link2, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { isAdmin, isLoggedIn, isSuperAdmin } from "@/lib/auth";
import {
  approveUser,
  assignUserStocks,
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  fetchCatalogStocks,
  fetchUserDetail,
  rejectUser,
  resetUserDevice,
  type AdminUser,
  type CatalogStock,
} from "@/lib/admin-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin-users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      if (!isLoggedIn() || !isAdmin()) throw redirect({ to: "/admin-login" });
    }
  },
  component: AdminUsersPage,
});

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-300",
    approved: "bg-bull/15 text-bull",
    rejected: "bg-bear/15 text-bear",
  };
  return map[status] || "bg-white/10 text-muted-foreground";
}

function AdminUsersPage() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [q, setQ] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [assignFor, setAssignFor] = useState<AdminUser | null>(null);

  const usersQuery = useQuery({
    queryKey: ["admin-users", filter, q],
    queryFn: () =>
      fetchAdminUsers({
        status: filter === "all" ? undefined : filter,
        q: q || undefined,
      }),
  });

  const users = usersQuery.data?.users ?? [];

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-users"] });

  const approveMut = useMutation({
    mutationFn: approveUser,
    onSuccess: refresh,
  });
  const rejectMut = useMutation({
    mutationFn: rejectUser,
    onSuccess: refresh,
  });
  const deleteMut = useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: refresh,
  });
  const resetMut = useMutation({
    mutationFn: resetUserDevice,
    onSuccess: refresh,
  });

  return (
    <DashboardLayout>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Admin</div>
          <h1 className="mt-1 text-2xl font-bold">Manage Users</h1>
          <p className="text-sm text-muted-foreground">Approve, edit, assign stocks, full CRUD</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin" className="rounded-xl bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
            Dashboard
          </Link>
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> Add User
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name / email / ACT-ID"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
        />
        <div className="flex gap-1">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-xl px-3 py-2 text-xs capitalize",
                filter === f ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-3">User</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Activation</th>
                <th className="px-3 py-3">Device</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-white/[0.04] hover:bg-white/[0.03]">
                  <td className="px-3 py-3">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs">{u.role}</td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        statusBadge(u.approvalStatus),
                      )}
                    >
                      {u.approvalStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono text-[11px]">{u.activationId}</td>
                  <td className="px-3 py-3 text-xs text-muted-foreground">
                    {u.deviceId ? "Bound" : "Free"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap justify-end gap-1">
                      {u.approvalStatus === "pending" && (
                        <>
                          <button
                            title="Approve"
                            onClick={() => approveMut.mutate(u._id)}
                            className="rounded-lg bg-bull/15 p-1.5 text-bull hover:bg-bull/25"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button
                            title="Reject"
                            onClick={() => rejectMut.mutate(u._id)}
                            className="rounded-lg bg-bear/15 p-1.5 text-bear hover:bg-bear/25"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                      <button
                        title="Assign stocks"
                        onClick={() => setAssignFor(u)}
                        className="rounded-lg bg-info/15 p-1.5 text-info hover:bg-info/25"
                      >
                        <Link2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        title="Reset device"
                        onClick={() => resetMut.mutate(u._id)}
                        className="rounded-lg bg-white/5 p-1.5 hover:bg-white/10"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                      {u.role !== "superadmin" && (
                        <button
                          title="Delete"
                          onClick={() => {
                            if (confirm(`Delete ${u.email}?`)) deleteMut.mutate(u._id);
                          }}
                          className="rounded-lg bg-bear/10 p-1.5 text-bear hover:bg-bear/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            refresh();
          }}
        />
      )}

      {assignFor && (
        <AssignStocksModal
          user={assignFor}
          onClose={() => setAssignFor(null)}
          onSaved={() => {
            setAssignFor(null);
            refresh();
          }}
        />
      )}
    </DashboardLayout>
  );
}

function CreateUserModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    approvalStatus: "approved",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const staff = isSuperAdmin();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await createAdminUser(form);
      onCreated();
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Create User" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {(["name", "email", "password"] as const).map((k) => (
          <input
            key={k}
            required
            type={k === "password" ? "password" : k === "email" ? "email" : "text"}
            placeholder={k}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
          />
        ))}
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
        >
          <option value="user">user</option>
          {staff && <option value="admin">admin</option>}
          {staff && <option value="superadmin">superadmin</option>}
        </select>
        <select
          value={form.approvalStatus}
          onChange={(e) => setForm({ ...form, approvalStatus: e.target.value })}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
        >
          <option value="approved">approved</option>
          <option value="pending">pending</option>
          <option value="rejected">rejected</option>
        </select>
        {err && <p className="text-sm text-bear">{err}</p>}
        <button
          disabled={loading}
          className="w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </Modal>
  );
}

function AssignStocksModal({
  user,
  onClose,
  onSaved,
}: {
  user: AdminUser;
  onClose: () => void;
  onSaved: () => void;
}) {
  const detailQuery = useQuery({
    queryKey: ["user-detail", user._id],
    queryFn: () => fetchUserDetail(user._id),
  });
  const catalogQuery = useQuery({
    queryKey: ["catalog-stocks"],
    queryFn: () => fetchCatalogStocks(),
  });

  const catalog = catalogQuery.data?.stocks ?? [];
  const assigned = detailQuery.data?.stocks ?? [];
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!hydrated && detailQuery.isSuccess) {
      setSelected(new Set(assigned.map((s) => s.symbol)));
      setHydrated(true);
    }
  }, [assigned, detailQuery.isSuccess, hydrated]);

  const toggle = (symbol: string) => {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(symbol) ? n.delete(symbol) : n.add(symbol);
      return n;
    });
  };

  const save = async () => {
    setLoading(true);
    setErr("");
    try {
      const stocks = catalog
        .filter((s) => selected.has(s.symbol))
        .map((s) => ({
          symbol: s.symbol,
          name: s.name,
          url: s.url,
          type: s.type,
        }));
      await assignUserStocks(user._id, stocks);
      onSaved();
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={`Assign stocks · ${user.name}`} onClose={onClose}>
      <div className="mb-3 max-h-72 space-y-1 overflow-y-auto">
        {catalog.map((s: CatalogStock) => (
          <label
            key={s._id}
            className="flex cursor-pointer items-start gap-2 rounded-xl px-2 py-2 hover:bg-white/5"
          >
            <input
              type="checkbox"
              checked={selected.has(s.symbol)}
              onChange={() => toggle(s.symbol)}
              className="mt-1"
            />
            <div className="min-w-0">
              <div className="text-sm font-medium">
                {s.symbol} <span className="text-muted-foreground">· {s.name}</span>
              </div>
              <div className="truncate text-[11px] text-muted-foreground">{s.url}</div>
            </div>
          </label>
        ))}
        {catalog.length === 0 && (
          <p className="text-sm text-muted-foreground">No stocks in catalog. Add some first.</p>
        )}
      </div>
      {err && <p className="mb-2 text-sm text-bear">{err}</p>}
      <button
        onClick={save}
        disabled={loading}
        className="w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground"
      >
        {loading ? "Saving..." : `Save (${selected.size} selected)`}
      </button>
    </Modal>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="glass-card w-full max-w-lg rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

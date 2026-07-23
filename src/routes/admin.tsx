import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Database,
  Layers,
  LogOut,
  Users,
  XCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { clearAuth, isAdmin, isLoggedIn } from "@/lib/auth";
import { fetchAdminStats } from "@/lib/admin-api";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Alpha Terminal" }],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      if (!isLoggedIn() || !isAdmin()) throw redirect({ to: "/admin-login" });
    }
  },
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchAdminStats,
    refetchInterval: 30_000,
  });

  const stats = data?.stats;

  const cards = [
    { label: "Total Users", value: stats?.totalUsers ?? 0, icon: Users, tone: "text-info" },
    { label: "Pending Approval", value: stats?.pendingUsers ?? 0, icon: Clock3, tone: "text-amber-400" },
    { label: "Approved", value: stats?.approvedUsers ?? 0, icon: CheckCircle2, tone: "text-bull" },
    { label: "Rejected", value: stats?.rejectedUsers ?? 0, icon: XCircle, tone: "text-bear" },
    { label: "Stock URLs", value: stats?.totalStocks ?? 0, icon: Layers, tone: "text-primary" },
    { label: "Option Rows", value: stats?.optionChainCount ?? 0, icon: Database, tone: "text-info" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Super Admin
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Control Panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Approve users, manage stock URLs, assign feeds.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin-users"
            className="rounded-xl bg-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/30"
          >
            Manage Users
          </Link>
          <Link
            to="/admin-stocks"
            className="rounded-xl bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            Manage Stocks
          </Link>
          <button
            onClick={() => {
              clearAuth();
              navigate({ to: "/admin-login" });
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-bear/15 px-3 py-2 text-sm text-bear"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading stats...</p>}
      {isError && (
        <p className="mb-4 rounded-xl border border-bear/30 bg-bear/10 px-3 py-2 text-sm text-bear">
          {(error as Error)?.message || "Failed to load"}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>
                <Icon className={`h-4 w-4 ${c.tone}`} />
              </div>
              <div className="mt-2 font-mono text-2xl font-bold">{c.value}</div>
            </motion.div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

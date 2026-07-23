import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Copy, LogOut, Shield, User } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  clearAuth,
  getActivationId,
  getRole,
  getUserName,
  isAdmin,
  isLoggedIn,
} from "@/lib/auth";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [{ title: "Account — Alpha Terminal" }],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !isLoggedIn()) {
      throw redirect({ to: "/login" });
    }
  },
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const name = getUserName() || "User";
  const role = getRole() || "user";
  const activationId = getActivationId() || "—";
  const admin = isAdmin();

  const logout = () => {
    const admin = isAdmin();
    clearAuth();
    navigate({ to: admin ? "/admin-login" : "/login" });
  };

  const copyAct = async () => {
    if (!activationId || activationId === "—") return;
    await navigator.clipboard.writeText(activationId);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">Account</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Your profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Real session info — no demo data.
        </p>
      </div>

      <div className="grid max-w-xl gap-4">
        <div className="glass-card flex items-center gap-4 rounded-2xl p-5">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-info/10 text-primary">
            {admin ? <Shield className="h-5 w-5" /> : <User className="h-5 w-5" />}
          </div>
          <div>
            <div className="text-lg font-bold">{name}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{role}</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Extension Activation ID
          </div>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 truncate font-mono text-sm">{activationId}</code>
            <button
              onClick={copyAct}
              className="rounded-lg bg-white/5 p-2 hover:bg-white/10"
              title="Copy"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Use this ID in the Chrome extension to activate scraping.
          </p>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-bear/15 px-4 py-3 text-sm font-semibold text-bear hover:bg-bear/25"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </DashboardLayout>
  );
}

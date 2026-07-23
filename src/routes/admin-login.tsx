import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Shield } from "lucide-react";
import { login } from "@/lib/option-chain-api";
import { clearAuth, isAdmin, isLoggedIn } from "@/lib/auth";
import { ApiError } from "@/lib/api";

export const Route = createFileRoute("/admin-login")({
  head: () => ({
    meta: [{ title: "Admin Login — Alpha Terminal" }],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && isLoggedIn() && isAdmin()) {
      throw redirect({ to: "/admin" });
    }
  },
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Clear any previous user session first
      clearAuth();
      const data = await login(email.trim(), password);
      const staff = data.role === "admin" || data.role === "superadmin";
      if (!staff) {
        clearAuth();
        setError("This portal is for admins only. Use the user login instead.");
        return;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.4 0.12 235 / 30%), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative w-full max-w-md rounded-3xl p-8"
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Admin Portal
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Super admin / admin login
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Admin email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10"
              placeholder="admin@stock.com"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-bear/30 bg-bear/10 px-3 py-2 text-sm text-bear">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-info py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Signing in..." : "Admin Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          End user?{" "}
          <Link to="/login" className="text-primary hover:underline">
            User login
          </Link>
          {" · "}
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

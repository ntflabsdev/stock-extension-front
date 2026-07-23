import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Sparkles,
  Layers,
  Shield,
  Users,
  Link2,
  UserCircle,
  LogOut,
  BookmarkPlus,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { clearAuth, getUserName, isAdmin, isLoggedIn } from "@/lib/auth";

type NavItem = {
  to: "/option-chain" | "/my-stocks" | "/admin" | "/admin-users" | "/admin-stocks" | "/settings";
  label: string;
  icon: typeof Layers;
};

const userItems: NavItem[] = [
  { to: "/option-chain", label: "Option Chain", icon: Layers },
  { to: "/my-stocks", label: "My Stocks", icon: BookmarkPlus },
  { to: "/settings", label: "Account", icon: UserCircle },
];

const adminItems: NavItem[] = [
  { to: "/admin", label: "Admin Home", icon: Shield },
  { to: "/admin-users", label: "Users", icon: Users },
  { to: "/admin-stocks", label: "Stock URLs", icon: Link2 },
  { to: "/settings", label: "Account", icon: UserCircle },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const loggedIn = typeof window !== "undefined" && isLoggedIn();
  const admin = typeof window !== "undefined" && isAdmin();
  const name = typeof window !== "undefined" ? getUserName() : null;

  const items = admin ? adminItems : userItems;

  const logout = () => {
    const wasAdmin = admin;
    clearAuth();
    navigate({ to: wasAdmin ? "/admin-login" : "/login" });
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 244 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="glass-panel sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden md:flex"
    >
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate text-sm font-bold tracking-tight">Alpha Terminal</div>
            <div className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
              {admin ? "Super Admin" : "User Panel"}
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {loggedIn &&
          items.map((it) => {
            const active = pathname === it.to;
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-gradient-to-r from-primary/20 to-info/10 text-foreground shadow-inner"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-y-1.5 left-0 w-1 rounded-full bg-primary"
                  />
                )}
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && <span className="truncate">{it.label}</span>}
              </Link>
            );
          })}
      </nav>

      <div className="space-y-2 border-t border-white/5 p-3">
        {!collapsed && loggedIn && (
          <div className="truncate px-2 text-xs text-muted-foreground">{name || "Signed in"}</div>
        )}
        {loggedIn && (
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-bear/10 py-2 text-xs text-bear transition hover:bg-bear/20"
          >
            <LogOut className="h-3.5 w-3.5" />
            {!collapsed && "Logout"}
          </button>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2 text-xs text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
          {!collapsed && "Collapse"}
        </button>
      </div>
    </motion.aside>
  );
}

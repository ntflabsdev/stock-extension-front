import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getRole, getUserName, isAdmin } from "@/lib/auth";

export function Header() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-IN", { hour12: false });
  const name = typeof window !== "undefined" ? getUserName() : null;
  const role = typeof window !== "undefined" ? getRole() : null;
  const admin = typeof window !== "undefined" && isAdmin();
  const initials = (name || "U")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="glass-panel sticky top-0 z-40 flex items-center gap-3 border-b border-white/5 px-4 py-3 md:px-6">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className={`h-2 w-2 rounded-full ${admin ? "bg-primary" : "bg-bull"}`}
          />
          <span className="text-xs font-medium">{admin ? "Admin session" : "User session"}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden rounded-full bg-white/5 px-3 py-1.5 font-mono text-xs md:block">
          {time} IST
        </div>
        <div className="hidden text-right sm:block">
          <div className="text-xs font-semibold">{name || "User"}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {role || "user"}
          </div>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-info text-xs font-bold text-primary-foreground">
          {initials}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UtensilsCrossed, CalendarCheck, MessageSquare, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Reservations", href: "/admin/reservations", icon: CalendarCheck },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminShell({
  children,
  logoutAction,
}: {
  children: React.ReactNode;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-cream/10 bg-noir-soft px-5 py-8 md:flex">
        <p className="px-2 font-display text-xl italic text-cream">L&apos;Oro Italiano</p>
        <p className="px-2 text-[10px] uppercase tracking-[0.3em] text-cream/40">Admin</p>

        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active ? "bg-gold-soft/15 text-gold-soft" : "text-cream/60 hover:bg-cream/5 hover:text-cream"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream/50 transition-colors hover:bg-italian-red/15 hover:text-italian-red-bright"
          >
            <LogOut size={16} />
            Log out
          </button>
        </form>

        <Link href="/" className="mt-4 px-3 text-xs text-cream/30 hover:text-cream/60">
          ← Back to site
        </Link>
      </aside>

      <main className="flex-1 px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}

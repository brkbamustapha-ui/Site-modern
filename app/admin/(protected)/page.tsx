import Link from "next/link";
import { UtensilsCrossed, CalendarCheck, MessageSquare, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [productCount, pendingReservations, unreadMessages, upcoming] = await Promise.all([
    prisma.product.count(),
    prisma.reservation.count({ where: { status: "PENDING" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.reservation.findMany({
      where: { date: { gte: new Date(new Date().toDateString()) } },
      orderBy: [{ date: "asc" }, { time: "asc" }],
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Menu Items", value: productCount, icon: UtensilsCrossed, href: "/admin/menu" },
    { label: "Pending Reservations", value: pendingReservations, icon: CalendarCheck, href: "/admin/reservations" },
    { label: "Unread Messages", value: unreadMessages, icon: MessageSquare, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream">Dashboard</h1>
      <p className="mt-1 text-sm text-cream/50">A quick overview of La Dolce Vita.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-cream/10 bg-noir-soft p-6 transition-colors hover:border-gold-soft/40"
          >
            <Icon size={20} className="text-gold-soft" />
            <p className="mt-4 font-display text-3xl italic text-cream">{value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/50">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-cream/10 bg-noir-soft p-6">
        <p className="flex items-center gap-2 text-sm font-medium text-cream">
          <Clock size={16} className="text-gold-soft" /> Upcoming Reservations
        </p>
        <div className="mt-4 divide-y divide-cream/5">
          {upcoming.length === 0 && <p className="py-4 text-sm text-cream/40">No upcoming reservations.</p>}
          {upcoming.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-3 text-sm">
              <span className="text-cream/80">{r.name}</span>
              <span className="text-cream/50">
                {r.date.toLocaleDateString("en-GB")} · {r.time} · {r.guests} guests
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

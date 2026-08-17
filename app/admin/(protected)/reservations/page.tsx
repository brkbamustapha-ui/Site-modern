import { prisma } from "@/lib/prisma";
import { updateReservationStatusAction, deleteReservationAction } from "@/app/admin/actions";
import { ReservationRowActions } from "@/components/admin/ReservationRowActions";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-amber-400",
  CONFIRMED: "text-emerald-400",
  CANCELLED: "text-cream/30",
  COMPLETED: "text-cream/50",
};

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: [{ date: "desc" }, { time: "desc" }],
  });

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream">Reservations</h1>
      <p className="mt-1 text-sm text-cream/50">{reservations.length} total bookings.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-cream/10">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-noir-soft text-[10px] uppercase tracking-[0.2em] text-cream/40">
            <tr>
              <th className="px-5 py-3 font-medium">Guest</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Date & Time</th>
              <th className="px-5 py-3 font-medium">Guests</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/5">
            {reservations.map((r) => (
              <tr key={r.id} className="text-cream/80">
                <td className="px-5 py-3 text-cream">{r.name}</td>
                <td className="px-5 py-3 text-cream/60">
                  <p>{r.email}</p>
                  <p className="text-xs text-cream/40">{r.phone}</p>
                </td>
                <td className="px-5 py-3">
                  {r.date.toLocaleDateString("en-GB")} · {r.time}
                </td>
                <td className="px-5 py-3">{r.guests}</td>
                <td className={`px-5 py-3 text-xs font-medium ${STATUS_COLORS[r.status]}`}>{r.status}</td>
                <td className="px-5 py-3">
                  <ReservationRowActions
                    id={r.id}
                    status={r.status}
                    updateAction={updateReservationStatusAction}
                    deleteAction={deleteReservationAction}
                  />
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-cream/40">
                  No reservations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

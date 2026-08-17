import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream">Users</h1>
      <p className="mt-1 text-sm text-cream/50">
        Admin access is currently controlled by a shared passcode (see Settings → environment variables in the
        README). This table reflects staff records stored in the database.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-cream/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-noir-soft text-[10px] uppercase tracking-[0.2em] text-cream/40">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/5">
            {users.map((user) => (
              <tr key={user.id} className="text-cream/80">
                <td className="px-5 py-3 text-cream">{user.name}</td>
                <td className="px-5 py-3 text-cream/60">{user.email}</td>
                <td className="px-5 py-3 text-cream/60">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { loginAction } from "@/app/admin/actions";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-svh items-center justify-center bg-noir px-6">
      <div className="w-full max-w-sm rounded-2xl border border-cream/10 bg-noir-soft p-8">
        <p className="font-display text-2xl italic text-cream">La Dolce Vita</p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cream/40">Admin Access</p>

        <form action={loginAction} className="mt-8 space-y-4">
          <div>
            <label htmlFor="passcode" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
              Passcode
            </label>
            <input
              id="passcode"
              name="passcode"
              type="password"
              required
              autoFocus
              className="w-full rounded-xl border border-cream/15 bg-transparent px-4 py-3.5 text-sm text-cream focus:border-gold-soft focus:outline-none"
            />
          </div>

          {error && <p className="text-xs text-italian-red-bright">Incorrect passcode. Please try again.</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-cream py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-noir transition-colors hover:bg-gold-soft"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

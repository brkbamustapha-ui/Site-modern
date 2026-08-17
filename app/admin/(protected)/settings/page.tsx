import { prisma } from "@/lib/prisma";
import { updateContentAction } from "@/app/admin/actions";

export default async function AdminSettingsPage() {
  const story = await prisma.restaurantContent.findUnique({ where: { key: "story" } });

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream">Settings</h1>
      <p className="mt-1 text-sm text-cream/50">Manage the restaurant&apos;s public content.</p>

      <form action={updateContentAction} className="mt-8 max-w-2xl space-y-4">
        <div>
          <label htmlFor="story" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
            Our Story (shown in the &quot;About&quot; section)
          </label>
          <textarea
            id="story"
            name="story"
            rows={6}
            defaultValue={story?.value}
            className="w-full resize-none rounded-xl border border-cream/15 bg-transparent px-4 py-3 text-sm text-cream focus:border-gold-soft focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-fit rounded-full bg-gold-soft px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-noir"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { deleteProductAction } from "@/app/admin/actions";

export default async function AdminMenuPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl italic text-cream">Menu</h1>
          <p className="mt-1 text-sm text-cream/50">{products.length} dishes across the menu.</p>
        </div>
        <Link
          href="/admin/menu/new"
          className="flex items-center gap-2 rounded-full bg-gold-soft px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-noir"
        >
          <Plus size={14} /> Add Dish
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-cream/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-noir-soft text-[10px] uppercase tracking-[0.2em] text-cream/40">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/5">
            {products.map((product) => (
              <tr key={product.id} className="text-cream/80">
                <td className="px-5 py-3">
                  <p className="text-cream">{product.name}</p>
                  {product.isSignature && <span className="text-[10px] uppercase tracking-wide text-gold-soft">Signature</span>}
                </td>
                <td className="px-5 py-3 text-cream/60">{product.category.name}</td>
                <td className="px-5 py-3">{formatPrice(product.priceCents)}</td>
                <td className="px-5 py-3">
                  <span
                    className={
                      product.isAvailable ? "text-xs text-emerald-400" : "text-xs text-cream/30"
                    }
                  >
                    {product.isAvailable ? "Available" : "Hidden"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/menu/${product.id}/edit`} className="text-cream/50 hover:text-gold-soft">
                      <Pencil size={15} />
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <button type="submit" className="text-cream/50 hover:text-italian-red-bright">
                        <Trash2 size={15} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

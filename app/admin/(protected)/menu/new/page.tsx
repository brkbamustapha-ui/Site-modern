import { prisma } from "@/lib/prisma";
import { createProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream">Add a Dish</h1>
      {error && <p className="mt-2 text-sm text-italian-red-bright">Please check the form for errors.</p>}
      <div className="mt-8">
        <ProductForm action={createProductAction} categories={categories} />
      </div>
    </div>
  );
}

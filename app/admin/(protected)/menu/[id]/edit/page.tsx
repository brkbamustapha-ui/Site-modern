import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream">Edit {product.name}</h1>
      {error && <p className="mt-2 text-sm text-italian-red-bright">Please check the form for errors.</p>}
      <div className="mt-8">
        <ProductForm action={boundAction} categories={categories} product={product} />
      </div>
    </div>
  );
}

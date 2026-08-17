import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const signatureOnly = searchParams.get("signature") === "true";

  const products = await prisma.product.findMany({
    where: {
      isAvailable: true,
      ...(category ? { category: { slug: category } } : {}),
      ...(signatureOnly ? { isSignature: true } : {}),
    },
    include: { category: true },
    orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
  });

  return NextResponse.json({ products });
}

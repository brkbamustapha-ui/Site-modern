import { prisma } from "@/lib/prisma";

export async function getMenu() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      products: {
        where: { isAvailable: true },
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getSignatureDishes() {
  return prisma.product.findMany({
    where: { isAvailable: true, isSignature: true },
    include: { category: true },
    orderBy: { order: "asc" },
    take: 6,
  });
}

export async function getStoryContent() {
  const entry = await prisma.restaurantContent.findUnique({ where: { key: "story" } });
  return (
    entry?.value ??
    "Fondé par la famille Romano, L'Oro Italiano est né d'un rêve simple : faire voyager Paris jusqu'aux collines toscanes, une table à la fois."
  );
}

import { Leaf, Utensils, Pizza, Beef, Cookie, Wine, type LucideIcon } from "lucide-react";

export const CATEGORY_VISUALS: Record<string, { icon: LucideIcon; gradient: string }> = {
  antipasti: { icon: Leaf, gradient: "from-[#33421f] via-[#1c2a12] to-[#0a0806]" },
  pasta: { icon: Utensils, gradient: "from-[#8a6a2b] via-[#4a3418] to-[#0a0806]" },
  pizza: { icon: Pizza, gradient: "from-[#7d1f1a] via-[#4a1310] to-[#0a0806]" },
  secondi: { icon: Beef, gradient: "from-[#5c2a1c] via-[#341811] to-[#0a0806]" },
  dolci: { icon: Cookie, gradient: "from-[#8a7040] via-[#4a3a22] to-[#0a0806]" },
  drinks: { icon: Wine, gradient: "from-[#5c1a30] via-[#33111e] to-[#0a0806]" },
};

export function getCategoryVisual(slug: string) {
  return CATEGORY_VISUALS[slug] ?? { icon: Utensils, gradient: "from-[#4a3418] via-[#241a0c] to-[#0a0806]" };
}

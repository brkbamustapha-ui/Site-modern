"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Category, Product } from "@prisma/client";
import { formatPrice, cn } from "@/lib/utils";
import { getCategoryVisual } from "./menu-visuals";

type CategoryWithProducts = Category & { products: Product[] };

export function MenuInteractive({ categories }: { categories: CategoryWithProducts[] }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const [selected, setSelected] = useState<Product | null>(null);

  const active = categories.find((c) => c.slug === activeSlug) ?? categories[0];

  // Remembers which card opened the dialog so focus can return there on close.
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus();
    };
  }, [selected]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Menu categories"
        className="scrollbar-none -mx-6 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0"
      >
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            role="tab"
            aria-selected={activeSlug === category.slug}
            onClick={() => setActiveSlug(category.slug)}
            data-cursor="View"
            className={cn(
              "shrink-0 rounded-full border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] transition-colors",
              activeSlug === category.slug
                ? "border-gold-soft bg-gold-soft text-noir"
                : "border-cream/20 text-cream/70 hover:border-cream/50 hover:text-cream"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <motion.div
        key={active?.slug}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {active?.products.map((product) => {
          const visual = getCategoryVisual(active.slug);
          const Icon = visual.icon;
          return (
            <button
              key={product.id}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setSelected(product);
              }}
              aria-haspopup="dialog"
              aria-label={`${product.name} — view details`}
              data-cursor="Open"
              className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-noir-soft text-left transition-transform duration-500 hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
            >
              <div
                className={cn(
                  "relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br",
                  visual.gradient
                )}
              >
                <Icon
                  size={54}
                  strokeWidth={1}
                  className="text-cream/70 transition-transform duration-700 ease-out group-hover:scale-125"
                />
                {product.isSignature && (
                  <span className="absolute left-3 top-3 rounded-full border border-gold-soft/60 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                    Signature
                  </span>
                )}
                <div className="absolute inset-0 bg-noir/0 transition-colors duration-500 group-hover:bg-noir/10" />
              </div>

              <div className="p-5 transition-transform duration-500 group-hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg italic text-cream">{product.name}</h3>
                  <span className="whitespace-nowrap text-sm text-gold-soft">{formatPrice(product.priceCents)}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-cream/55">{product.description}</p>
              </div>
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-noir/85 p-6 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="dish-dialog-title"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-cream/10 bg-noir-soft"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close dish details"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-noir/60 text-cream hover:bg-noir focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-soft"
              >
                <X size={18} />
              </button>
              {(() => {
                const visual = getCategoryVisual(active?.slug ?? "");
                const Icon = visual.icon;
                return (
                  <div className={cn("flex h-56 items-center justify-center bg-gradient-to-br", visual.gradient)}>
                    <Icon size={72} strokeWidth={1} className="text-cream/80" />
                  </div>
                );
              })()}
              <div className="p-8">
                <h3 id="dish-dialog-title" className="font-display text-3xl italic text-cream">
                  {selected.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{selected.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl text-gold-soft">{formatPrice(selected.priceCents)}</span>
                  {selected.tags.length > 0 && (
                    <div className="flex gap-2">
                      {selected.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cream/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

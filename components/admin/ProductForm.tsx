"use client";

import { useState } from "react";
import type { Category, Product } from "@prisma/client";

const inputClass =
  "w-full rounded-xl border border-cream/15 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-gold-soft focus:outline-none";
const labelClass = "mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({
  action,
  categories,
  product,
}: {
  action: (formData: FormData) => void | Promise<void>;
  categories: Category[];
  product?: Product;
}) {
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product));

  return (
    <form action={action} className="grid max-w-2xl gap-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClass}>
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          defaultValue={product?.description}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="priceCents" className={labelClass}>
            Price (cents)
          </label>
          <input
            id="priceCents"
            name="priceCents"
            type="number"
            min={0}
            required
            defaultValue={product?.priceCents ?? 1500}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="categoryId" className={labelClass}>
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={product?.categoryId ?? categories[0]?.id}
            className={inputClass}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id} className="bg-noir">
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="imageQuery" className={labelClass}>
          Visual keyword (optional)
        </label>
        <input
          id="imageQuery"
          name="imageQuery"
          type="text"
          defaultValue={product?.imageQuery ?? ""}
          placeholder="e.g. burrata"
          className={inputClass}
        />
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm text-cream/70">
          <input
            type="checkbox"
            name="isSignature"
            defaultChecked={product?.isSignature ?? false}
            className="h-4 w-4 accent-gold-soft"
          />
          Signature dish
        </label>
        <label className="flex items-center gap-2 text-sm text-cream/70">
          <input
            type="checkbox"
            name="isAvailable"
            defaultChecked={product?.isAvailable ?? true}
            className="h-4 w-4 accent-gold-soft"
          />
          Available on menu
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-gold-soft px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-noir"
      >
        {product ? "Save Changes" : "Create Dish"}
      </button>
    </form>
  );
}

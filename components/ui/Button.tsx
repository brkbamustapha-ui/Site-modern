"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden " +
  "rounded-full font-sans font-medium tracking-[0.08em] uppercase " +
  "transition-[transform,color,background-color,border-color,box-shadow] duration-500 " +
  "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] " +
  "will-change-transform active:scale-[0.97] " +
  // 44px min target on touch, per WCAG 2.5.5 / iOS HIG.
  "min-h-11 select-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.72rem] sm:text-xs",
  lg: "px-7 py-3.5 text-[0.74rem] sm:text-[0.8rem]",
};

const variants: Record<Variant, string> = {
  gold:
    "bg-gradient-to-r from-[#b8934e] via-[#e0c489] to-[#b8934e] text-noir " +
    "shadow-[0_10px_34px_-14px_rgba(198,161,91,0.85)] " +
    "hover:shadow-[0_16px_44px_-14px_rgba(198,161,91,0.95)] hover:-translate-y-0.5",
  outline:
    "border border-[color-mix(in_srgb,var(--color-gold)_45%,transparent)] text-offwhite " +
    "hover:border-gold hover:text-gold-light hover:-translate-y-0.5 " +
    "hover:bg-[color-mix(in_srgb,var(--color-gold)_8%,transparent)]",
  ghost:
    "border border-[color-mix(in_srgb,var(--color-steel)_26%,transparent)] text-offwhite " +
    "hover:border-[color-mix(in_srgb,var(--color-steel)_55%,transparent)] " +
    "hover:bg-[color-mix(in_srgb,var(--color-steel)_10%,transparent)] hover:-translate-y-0.5",
};

/** The light sweep that crosses the button on hover (pointer devices only). */
function Sheen() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
        from-transparent via-white/25 to-transparent
        transition-transform duration-[900ms] ease-out
        motion-safe:group-hover:translate-x-full
        motion-reduce:hidden"
    />
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export type ButtonLinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    { variant = "gold", size = "md", className, children, ...props },
    ref
  ) {
    return (
      <a
        ref={ref}
        data-cursor="hover"
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        <Sheen />
        <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
      </a>
    );
  }
);

export type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "gold", size = "md", className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      data-cursor="hover"
      className={cn(
        base,
        sizes[size],
        variants[variant],
        "disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0",
        className
      )}
      {...props}
    >
      <Sheen />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
});

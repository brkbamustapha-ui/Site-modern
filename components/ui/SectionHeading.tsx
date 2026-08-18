"use client";

import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { cn } from "@/lib/utils";

/**
 * Shared section header: hairline + eyebrow, display title, optional lede.
 * `as` keeps the heading level correct for the document outline.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  id,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  /** Put on the heading itself so sections can `aria-labelledby` it. */
  id?: string;
  className?: string;
  titleClassName?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className={cn("flex items-center gap-3.5", centered && "justify-center")}>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-gold sm:w-11"
            />
            <span className="eyebrow">{eyebrow}</span>
            {centered ? (
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gradient-to-l from-transparent to-gold sm:w-11"
              />
            ) : null}
          </span>
        </Reveal>
      ) : null}

      <Tag
        id={id}
        className={cn(
          "font-display text-[clamp(2rem,6vw,3.9rem)] font-light leading-[1.06] tracking-[-0.015em] text-chalk",
          titleClassName
        )}
      >
        <TextReveal text={title} />
      </Tag>

      {lede ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-[58ch] text-[0.98rem] leading-relaxed text-steel sm:text-[1.03rem]",
              centered && "mx-auto"
            )}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

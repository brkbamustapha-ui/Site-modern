import { RevealText } from "./RevealText";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  align = "left",
  className,
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <ScrollReveal>
        <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold-soft">{kicker}</p>
      </ScrollReveal>
      <RevealText
        as="h2"
        className={cn(
          "mt-4 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl",
          align === "center" && "justify-center"
        )}
      >
        {title}
      </RevealText>
    </div>
  );
}

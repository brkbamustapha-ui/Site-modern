import { getMenu } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuInteractive } from "./MenuInteractive";

export async function Menu() {
  const categories = await getMenu();

  return (
    <section id="menu" className="bg-noir px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Il Menu" title="Façonné par la Tradition" />
        <div className="mt-14">
          <MenuInteractive categories={categories} />
        </div>
      </div>
    </section>
  );
}

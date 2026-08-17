import { Hero } from "@/components/sections/Hero";
import { Menu } from "@/components/sections/Menu";
import { ExperienceTable } from "@/components/sections/ExperienceTable";
import { Story } from "@/components/sections/Story";
import { Chef } from "@/components/sections/Chef";
import { Gallery } from "@/components/sections/Gallery";
import { Reservation } from "@/components/sections/Reservation";
import { Contact } from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <ExperienceTable />
      <Story />
      <Chef />
      <Gallery />
      <Reservation />
      <Contact />
    </>
  );
}

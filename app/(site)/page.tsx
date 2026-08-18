import { Hero } from "@/components/sections/Hero";
import { Properties } from "@/components/sections/Properties";
import { FeaturedProperty } from "@/components/sections/FeaturedProperty";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Properties />
      <FeaturedProperty />
      <Services />
      <About />
      <Process />
      <Contact />
    </>
  );
}

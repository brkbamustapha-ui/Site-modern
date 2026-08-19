import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyPremium } from "@/components/sections/WhyPremium";
import { Portfolio } from "@/components/sections/Portfolio";
import { Method } from "@/components/sections/Method";
import { Audience } from "@/components/sections/Audience";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyPremium />
        <Portfolio />
        <Method />
        <Audience />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { IntroSequence } from "@/components/ui/IntroSequence";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroSequence />
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

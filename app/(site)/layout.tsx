import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

import PixelGrid from "@/components/PixelGrid";
import Navbar from "@/components/Navbar";
import TopBanner from "@/components/TopBanner";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import ProgramsSection from "@/components/ProgramsSection";
import BlogSection from "@/components/BlogSection";
import PartnershipSection from "@/components/PartnershipSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import RegistrationPopup from "@/components/RegistrationPopup";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <RegistrationPopup />
      <PixelGrid />
      <div className="sticky top-0 z-50">
        <TopBanner />
        <Navbar />
      </div>
      <main>
        <HeroSection />
        <div className="neon-divider" />
        <AboutSection />
        <div className="neon-divider" />
        <StatsSection />
        <div className="neon-divider" />
        <ProgramsSection />
        <div className="neon-divider" />
        <TeamSection />
        <div className="neon-divider" />
        <BlogSection />
        <div className="neon-divider" />
        <PartnershipSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

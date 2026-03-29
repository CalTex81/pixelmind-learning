import PixelGrid from "@/components/PixelGrid";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import BlogSection from "@/components/BlogSection";
import PartnershipSection from "@/components/PartnershipSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PixelGrid />
      <Navbar />
      <main>
        <HeroSection />
        <div className="neon-divider" />
        <AboutSection />
        <div className="neon-divider" />
        <ProgramsSection />
        <div className="neon-divider" />
        <BlogSection />
        <div className="neon-divider" />
        <PartnershipSection />
        <div className="neon-divider" />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

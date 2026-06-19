import { Button } from "@/components/ui/button";
import PixelParticles from "./PixelParticles";
import AnimatedLogo from "./AnimatedLogo";
import { motion } from "framer-motion";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <PixelParticles />
      <div className="scanline absolute inset-0 pointer-events-none z-10" />

      <div className="container mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center gap-12 pt-20">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-6">
            <span className="text-primary text-glow-cyan">Pixel</span>
            <span className="text-secondary text-glow-purple">Mind</span>
            <br />
            <span className="text-foreground">Learning</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 font-body leading-relaxed">
            Empowering the next generation through code, creativity, and community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              variant="glow"
              size="lg"
              className="text-base px-8 py-6"
              onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Programs (For Students)
            </Button>
            <Button
              variant="glow-outline"
              size="lg"
              className="text-base px-8 py-6"
              disabled
            >
              Recruitment Closed
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 max-w-sm lg:max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <AnimatedLogo />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

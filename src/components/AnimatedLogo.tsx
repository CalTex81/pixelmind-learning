import { motion } from "framer-motion";
import pixelmindLogo from "@/assets/pixelmind-logo.png";

const AnimatedLogo = ({ className = "" }: { className?: string }) => {
  // Create pixel overlay pieces that float
  const pixels = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 15 + Math.random() * 70,
    y: 10 + Math.random() * 80,
    size: 3 + Math.random() * 6,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    amplitude: 4 + Math.random() * 8,
    color: ["#00F0FF", "#A259FF", "#FF3EB5", "#6B3FA0", "#00B8D4"][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className={`relative ${className}`}>
      {/* Main logo image with subtle float */}
      <motion.img
        src={pixelmindLogo}
        alt="PixelMind Learning"
        className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating pixel particles around the logo */}
      {pixels.map((p) => (
        <motion.div
          key={p.id}
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.size > 6 ? 1 : 0,
          }}
          animate={{
            y: [-p.amplitude, p.amplitude, -p.amplitude],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedLogo;

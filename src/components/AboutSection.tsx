import { motion } from "framer-motion";

const CircuitIllustration = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
    {/* Lightbulb body */}
    <path
      d="M150 50 C100 50 70 90 70 130 C70 165 100 185 110 200 L190 200 C200 185 230 165 230 130 C230 90 200 50 150 50Z"
      stroke="#00F0FF"
      strokeWidth="2"
      opacity="0.5"
      fill="none"
    >
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
    </path>
    {/* Bulb base */}
    <rect x="115" y="200" width="70" height="8" rx="2" fill="#A259FF" opacity="0.4" />
    <rect x="120" y="212" width="60" height="8" rx="2" fill="#A259FF" opacity="0.3" />
    <rect x="125" y="224" width="50" height="8" rx="4" fill="#A259FF" opacity="0.2" />
    {/* Circuit lines inside */}
    {[
      "M130 100 L130 160", "M150 80 L150 170", "M170 100 L170 160",
      "M110 120 L190 120", "M115 140 L185 140",
    ].map((d, i) => (
      <path key={i} d={d} stroke="#00F0FF" strokeWidth="1" opacity="0.3" strokeDasharray="4 6">
        <animate attributeName="stroke-dashoffset" values="0;10" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
      </path>
    ))}
    {/* Circuit nodes */}
    {[[130, 100], [150, 80], [170, 100], [130, 140], [150, 120], [170, 140], [150, 160]].map(
      ([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#FF3EB5" opacity="0.6">
          <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      )
    )}
    {/* Glow rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 150 + Math.cos(rad) * 75;
      const y1 = 120 + Math.sin(rad) * 75;
      const x2 = 150 + Math.cos(rad) * 95;
      const y2 = 120 + Math.sin(rad) * 95;
      return (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00F0FF" strokeWidth="1" opacity="0.15">
          <animate attributeName="opacity" values="0.05;0.25;0.05" dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
        </line>
      );
    })}
  </svg>
);

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="glass rounded-xl p-8 border border-primary/20"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-glow-cyan mb-6">
              Our Mission
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              PixelMind Learning is on a mission to make computer science education accessible,
              creative, and empowering for every young learner. We believe that technology
              is a superpower — and every kid deserves the chance to wield it.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Through hands-on workshops, mentorship, and project-based curricula, we help
              students from underrepresented communities discover their passion for code,
              digital art, game design, and beyond.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Founded on the belief that creativity and technology go hand-in-hand, we're
              building a community where curiosity leads to innovation.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="w-72 h-72 md:w-96 md:h-96 animate-float">
              <CircuitIllustration />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

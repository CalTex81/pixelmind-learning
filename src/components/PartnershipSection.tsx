import { motion } from "framer-motion";
import { Award } from "lucide-react";

const partners = [
  "Future Leaders Initiative",
  "Code.org",
  "National Science Foundation",
  "Google for Education",
  "Mozilla Foundation",
];

const PartnershipSection = () => {
  return (
    <section id="partners" className="relative py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 mb-10 border border-accent/30 glow-magenta"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Award className="w-5 h-5 text-accent" />
          <span className="text-sm font-display text-foreground">
            In partnership with <strong className="text-accent">Future Leaders Initiative</strong> (501(c)(3))
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Partners
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8 items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              className="glass rounded-lg px-6 py-4 font-display text-sm text-muted-foreground transition-all duration-500 hover:text-primary hover:glow-cyan cursor-default grayscale hover:grayscale-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;

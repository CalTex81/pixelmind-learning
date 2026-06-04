import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { Users, BookOpen, Calendar, School, GraduationCap } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  { value: "4", label: "Mentors", icon: <Users size={28} /> },
  { value: "4", label: "Courses", icon: <BookOpen size={28} /> },
  { value: "2", label: "Years in Operation", icon: <Calendar size={28} /> },
  { value: "3", label: "Schools Taught", icon: <School size={28} /> },
  { value: "30+", label: "Students Taught", icon: <GraduationCap size={28} /> },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const StatsSection = () => {
  return (
    <section id="stats" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl md:text-4xl font-heading font-bold text-accent mb-4"
            style={{ textShadow: "0 0 10px hsl(330 100% 62% / 0.5)" }}
          >
            By the Numbers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our impact so far.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, i) => {
            const numericValue = parseInt(stat.value);
            const suffix = stat.value.replace(/\d/g, "");
            return (
              <motion.div
                key={stat.label}
                className="glass rounded-xl p-6 text-center group transition-all duration-300 hover:glow-cyan border border-primary/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-center mb-4 text-primary group-hover:text-accent transition-colors">
                  {stat.icon}
                </div>
                <div className="font-heading text-4xl font-bold text-foreground mb-2">
                  <CountUp target={numericValue} suffix={suffix} />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-display">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

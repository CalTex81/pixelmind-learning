import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { programs } from "@/data/programs";

type Difficulty = "All" | "Beginner" | "Intermediate";

const filters: Difficulty[] = ["All", "Beginner", "Intermediate"];

const difficultyColor: Record<string, string> = {
  Beginner: "text-primary",
  Intermediate: "text-secondary",
};

const ProgramsSection = () => {
  const [filter, setFilter] = useState<Difficulty>("All");

  const filtered = filter === "All" ? programs : programs.filter((p) => p.difficulty === filter);

  return (
    <section id="programs" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-glow-cyan mb-4">
            Our Programs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From first lines of code to advanced AI — find the perfect program for every young mind.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded font-heading text-xs uppercase tracking-widest border transition-all duration-300 ${
                filter === f
                  ? "bg-primary text-primary-foreground glow-cyan border-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((program, i) => (
            <Link key={program.slug} to={`/courses/${program.slug}`}>
              <motion.div
                className="glass rounded-xl p-6 group cursor-pointer transition-all duration-300 hover:glow-cyan h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ rotateX: -2, rotateY: 3, scale: 1.02 }}
                style={{ transformPerspective: 800 }}
              >
                <div className="text-primary mb-4 group-hover:text-glow-cyan transition-all">
                  {program.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {program.description}
                </p>
                {program.disclaimer && (
                  <p className="text-xs text-secondary font-semibold mb-2 italic whitespace-pre-line">
                    {program.disclaimer}
                  </p>
                )}
                <p className="text-xs text-secondary font-semibold mb-4 italic">
                  <u>Registration closes by May 31st.</u>
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-heading uppercase tracking-wider ${difficultyColor[program.difficulty]}`}>
                    {program.difficulty}
                  </span>
                  <span className="text-muted-foreground">{program.ageRange}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;

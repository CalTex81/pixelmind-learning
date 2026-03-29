import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Box, BarChart3, Trophy, Calculator } from "lucide-react";

type Difficulty = "All" | "Beginner" | "Intermediate" | "Advanced";

interface Program {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  ageRange: string;
  icon: React.ReactNode;
}

const programs: Program[] = [
  {
    title: "Python 101",
    description: "Learn the fundamentals of Python through hands-on projects, problem-solving, and real-world applications.",
    difficulty: "Beginner",
    ageRange: "Ages 11–15",
    icon: <Code className="w-8 h-8" />,
  },
  {
    title: "Intro to Computer-Aided Design (CAD)",
    description: "Explore 3D modeling, engineering design principles, and CAD tools used in modern product development.",
    difficulty: "Intermediate",
    ageRange: "Ages 12–16",
    icon: <Box className="w-8 h-8" />,
  },
  {
    title: "Data Science Exploration / Basics of Machine Learning",
    description: "Discover data analysis, visualization, and introductory machine learning concepts using beginner-friendly tools.",
    difficulty: "Intermediate",
    ageRange: "Ages 13–17",
    icon: <BarChart3 className="w-8 h-8" />,
  },
  {
    title: "ACSL Bootcamp",
    description: "Prepare for the American Computer Science League with focused lessons on Boolean algebra, data structures, and FSAs.",
    difficulty: "Advanced",
    ageRange: "Ages 13–18",
    icon: <Trophy className="w-8 h-8" />,
  },
  {
    title: "Fundamentals of Algebra (ALG1)",
    description: "Master foundational algebra concepts including equations, functions, graphing, and problem-solving strategies.",
    difficulty: "Beginner",
    ageRange: "Ages 11–14",
    icon: <Calculator className="w-8 h-8" />,
  },
];

const filters: Difficulty[] = ["All", "Beginner", "Intermediate", "Advanced"];

const difficultyColor: Record<string, string> = {
  Beginner: "text-primary",
  Intermediate: "text-secondary",
  Advanced: "text-accent",
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
            <motion.div
              key={program.title}
              className="glass rounded-xl p-6 group cursor-pointer transition-all duration-300 hover:glow-cyan"
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
              <div className="flex items-center justify-between text-xs">
                <span className={`font-heading uppercase tracking-wider ${difficultyColor[program.difficulty]}`}>
                  {program.difficulty}
                </span>
                <span className="text-muted-foreground">{program.ageRange}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;

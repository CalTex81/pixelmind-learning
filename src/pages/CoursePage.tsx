import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { programs } from "@/data/programs";
import PixelGrid from "@/components/PixelGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const toolIcons: Record<string, string> = {
  "PyCharm": "https://resources.jetbrains.com/storage/products/company/brand/logos/PyCharm_icon.svg",
  "VS Code": "https://code.visualstudio.com/assets/images/code-stable.png",
  "Onshape": "https://www.onshape.com/global-assets/img/favicons/favicon-32x32.png",
  "Tinkercad": "https://www.tinkercad.com/favicon.ico",
  "Google Colab": "https://colab.research.google.com/img/colab_favicon_256px.png",
  "Jupyter Notebook": "https://jupyter.org/assets/favicons/apple-touch-icon-152x152.png",
  "Python 3.x": "https://www.python.org/static/favicon.ico",
  "ACSL Website": "https://www.acsl.org/favicon.ico",
  "Desmos": "https://www.desmos.com/assets/img/apps/desmos.png",
  "GeoGebra": "https://www.geogebra.org/favicon.ico",
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CoursePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = programs.find((p) => p.slug === slug);

  if (!course) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <PixelGrid />
        <Navbar />
        <main className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-heading font-bold text-primary text-glow-cyan mb-4">
            Course Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The course you're looking for doesn't exist.
          </p>
          <Link
            to="/#programs"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Programs
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PixelGrid />
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 space-y-12">
        {/* Back link */}
        <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
          <Link
            to="/#programs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Programs
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div className="flex items-center gap-4">
              <span className="text-primary">{course.icon}</span>
              <div>
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary text-glow-cyan">
                  {course.title}
                </h1>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="text-muted-foreground">{course.ageRange}</span>
                  <span className="text-secondary font-heading uppercase tracking-wider text-xs">
                    {course.difficulty}
                  </span>
                </div>
                {course.classSchedule && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">
                      Class Schedule
                    </h4>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          {course.classSchedule.day}
                        </div>
                        <div className="text-lg font-semibold text-primary">
                          {course.classSchedule.time}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {course.classSchedule.dateRange}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {course.disclaimer && (
                  <div className="mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                    <p className="text-sm text-secondary font-semibold italic whitespace-pre-line">
                      {course.disclaimer}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Link to="/signup">
              <Button variant="glow" size="sm" className="w-fit">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Overview */}
        <Section title="Overview" delay={0.2}>
          <p className="text-muted-foreground leading-relaxed">{course.overview}</p>
        </Section>

        {/* Learning Objectives */}
        <Section title="What You'll Learn" delay={0.3}>
          <ul className="space-y-3">
            {course.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </Section>

        {/* Course Outline / Weekly Breakdown */}
        {course.weeklyBreakdown && course.weeklyBreakdown.length > 0 ? (
          <Section title={course.curriculumTitle || "The Course Outline"} delay={0.4}>
            <div className="space-y-4">
              {course.weeklyBreakdown.map((week, i) => (
                <div key={i} className="glass rounded-lg p-4 border border-border/50">
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    {week.title}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {week.description}
                  </p>
                  <ul className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1">
                    {week.topics.map((topic, j) => (
                      <li key={j} className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span className="mt-1.5 w-2 h-1.5 rounded-full bg-primary shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-foreground text-sm">
                      Weekly Project:
                    </h5>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {week.project}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {/* Prerequisites */}
        <Section title="Prerequisites" delay={0.5}>
          <ul className="space-y-2">
            {course.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </Section>

        {/* Tools & Software */}
        <Section title="Tools & Software" delay={0.6}>
          <div className="flex flex-wrap gap-3">
            {course.toolsSoftware.map((tool, i) => {
              const link = course.toolsLinks?.[tool];
              const iconUrl = toolIcons[tool];
              const content = (
                <>
                  {iconUrl && (
                    <img src={iconUrl} alt={tool} className="w-5 h-5 object-contain" />
                  )}
                  {tool}
                </>
              );
              return link ? (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-4 py-2 rounded-lg text-sm text-foreground border border-border/50 font-heading hover:border-primary/50 hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  {content}
                </a>
              ) : (
                <span
                  key={i}
                  className="glass px-4 py-2 rounded-lg text-sm text-foreground border border-border/50 font-heading inline-flex items-center gap-2"
                >
                  {content}
                </span>
              );
            })}
          </div>
        </Section>

        {/* Outcomes */}
        <Section title="Outcomes" delay={0.7}>
          <ul className="space-y-3">
            {course.outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0" />
                {o}
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

const Section = ({
  title,
  delay = 0,
  children,
}: {
  title: string;
  delay?: number;
  children: React.ReactNode;
}) => (
  <motion.section
    className="glass rounded-xl p-6 md:p-8 pixel-border"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={sectionVariants}
    transition={{ delay }}
  >
    <h2 className="text-xl md:text-2xl font-heading font-bold text-primary text-glow-cyan mb-4">
      {title}
    </h2>
    {children}
  </motion.section>
);

export default CoursePage;

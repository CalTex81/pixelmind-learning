import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  socials: { type: string; url: string }[];
  grade: string;
  school: string;
  experience: string;
}

const team: TeamMember[] = [
  {
    name: "Anish Sahoo",
    role: "Founder & Executive Director",
    bio: "Freshman at Mission San Jose High | Passionate Computer Science & Artificial Intelligence Student",
    socials: [
      { type: "linkedin", url: "#" },
      { type: "github", url: "https://github.com/CalTex81" },
    ],
    grade: "Freshman",
    school: "Mission San Jose High School",
    experience: [
      "Freshman at Mission San Jose High School",
      "Has participated in various computer science and mathematical competitions ranging from the Math Kangaroo, AMC10 to ACSL (American Computer Science League)",
      "ACSL Elementary School National Winner + 3-Year Finalist",
      "Math Kangaroo Elementary 1st Place Winner",
      "AMC8 Achievement Award + Honor Roll",
      "Noetic National Honor Roll",
      "Has experience in the languages of Python, Java, C++, and HTML",
      "Hackabyte Hackathon Honorable Mention + 3rd Place at an AI Hackathon",
      "Math League CA State 3rd Place",
      "Been on MOEMS Honor Roll since elementary school",
      "Has experience educating students through hours of mentorship at school and volunteering at FCSN (Friends of Children with Special Needs)",
      "Has been mentoring students in abacus since third grade and has mentored a FLL (First Lego League - Robotics) team",
    ].join("\n"),
  },
  {
    name: "Anant Kuppa",
    role: "Math Instructor",
    bio: "Freshman at Mission San Jose High | Dedicated Mathematics Learner",
    socials: [],
    grade: "Freshman",
    school: "Mission San Jose High School",
    experience: [
      "Freshman at Mission San Jose High School",
      "Completed Algebra 1 at Hopkins Middle School",
      "Currently pursuing higher education in mathematics at Mission San Jose High School and other programs",
      "Taught and helped middle schoolers during after-school tutoring sessions at Hopkins Middle School",
    ].join("\n"),
  },
];

const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "linkedin": return <Linkedin size={16} />;
    case "github": return <Github size={16} />;
    default: return null;
  }
};

const TeamSection = () => {
  return (
    <section id="team" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-4" style={{ textShadow: "0 0 10px hsl(330 100% 62% / 0.5)" }}>
            Meet the Team
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The humans behind the pixels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="glass rounded-xl p-8 group transition-all duration-300 hover:glow-magenta pixel-border w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 mb-4 rounded-lg bg-muted flex items-center justify-center font-heading text-3xl text-primary font-bold">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-primary font-display uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="space-y-4 border-t border-border/50 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-wider text-primary mb-1">Grade</h4>
                    <p className="text-foreground text-sm">{member.grade}</p>
                  </div>
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-wider text-primary mb-1">School</h4>
                    <p className="text-foreground text-sm">{member.school}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading text-xs uppercase tracking-wider text-primary mb-2">About</h4>
                  <ul className="text-muted-foreground text-sm leading-relaxed list-disc pl-5 space-y-1.5 text-left">
                    {member.experience.split("\n").map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-border/50">
                {member.socials.map((s) => (
                  <a
                    key={s.type}
                    href={s.url}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={s.type}
                  >
                    <SocialIcon type={s.type} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  socials: { type: string; url: string }[];
}

const team: TeamMember[] = [
  {
    name: "Maya Chen",
    role: "Founder & Executive Director",
    bio: "Former CS teacher turned nonprofit leader. Passionate about making tech education fun and accessible for all kids.",
    socials: [
      { type: "twitter", url: "#" },
      { type: "linkedin", url: "#" },
    ],
  },
  {
    name: "Jordan Ellis",
    role: "Head of Curriculum",
    bio: "Game developer and educator with 10+ years of experience designing hands-on learning experiences.",
    socials: [
      { type: "github", url: "#" },
      { type: "linkedin", url: "#" },
    ],
  },
  {
    name: "Dr. Amara Osei",
    role: "Director of Research",
    bio: "PhD in CS Education. Focused on equitable access to STEM and measuring impact in youth programs.",
    socials: [
      { type: "twitter", url: "#" },
      { type: "linkedin", url: "#" },
    ],
  },
  {
    name: "Liam Torres",
    role: "Community Manager",
    bio: "Student advocate and community builder. Connects students with mentors and opportunities across the country.",
    socials: [
      { type: "twitter", url: "#" },
      { type: "github", url: "#" },
    ],
  },
];

const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "twitter": return <Twitter size={16} />;
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="glass rounded-xl p-6 text-center group transition-all duration-300 hover:glow-magenta pixel-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center font-heading text-2xl text-primary font-bold">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-heading text-sm font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-xs text-primary font-display uppercase tracking-wider mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                {member.bio}
              </p>
              <div className="flex justify-center gap-3">
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

import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";

interface BlogPost {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  featured?: boolean;
}

const posts: BlogPost[] = [
  {
    title: "Why Every Kid Should Learn to Code",
    subtitle: "Coding isn't just about computers — it's about thinking, creating, and solving problems.",
    author: "Maya Chen",
    date: "Mar 15, 2026",
    featured: true,
  },
  {
    title: "Inside Our Game Lab: Student Spotlight",
    subtitle: "Meet the young developers who built their first indie game in just 8 weeks.",
    author: "Jordan Ellis",
    date: "Mar 8, 2026",
  },
  {
    title: "The Future of Creative Technology Education",
    subtitle: "How blending art and code is reshaping what it means to learn CS.",
    author: "Dr. Amara Osei",
    date: "Feb 28, 2026",
  },
  {
    title: "5 Projects Our Students Built This Month",
    subtitle: "From chatbots to pixel art generators — see what our community created.",
    author: "Liam Torres",
    date: "Feb 20, 2026",
  },
];

const BlogSection = () => {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <section id="blog" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary text-glow-purple mb-4">
            Within the Pixel
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stories, insights, and updates from our community.
          </p>
        </motion.div>

        {/* Featured post */}
        {featured && (
          <motion.div
            className="glass rounded-xl p-8 mb-10 border border-secondary/30 cursor-pointer group transition-all duration-300 hover:glow-purple"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-heading text-xs uppercase tracking-widest text-accent mb-3 inline-block">
              Featured
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
              {featured.title}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-2xl">{featured.subtitle}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><User size={12} /> {featured.author}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {featured.date}</span>
            </div>
          </motion.div>
        )}

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.article
              key={post.title}
              className="glass rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:glow-purple"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{post.subtitle}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

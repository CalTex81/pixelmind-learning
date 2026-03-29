import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";

interface BlogPost {
  title: string;
  summary: string;
  author: string;
  date: string;
  url: string;
}

const parseFeed = (data: any): BlogPost[] => {
  try {
    const entries = data?.feed?.entry;
    if (!Array.isArray(entries)) return [];
    return entries.map((entry: any) => {
      const link = entry.link?.find((l: any) => l.rel === "alternate")?.href || "#";

      const strip = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
      const rawSummary = entry.summary?.$t ? strip(entry.summary.$t) : "";
      const rawContent = entry.content?.$t ? strip(entry.content.$t) : "";
      let cleanSummary = rawSummary.length > 20 ? rawSummary : rawContent;
      
      // Add newline after dashed separator
      cleanSummary = cleanSummary.replace(/(---+) /g, "$1\n");

      if (!cleanSummary) cleanSummary = "A new story from Within the Pixel.";
      // Trim to ~220 chars ending at a word boundary
      if (cleanSummary.length > 220) {
        cleanSummary = cleanSummary.slice(0, 220).replace(/\s+\S*$/, "") + "…";
      }

      const published = entry.published?.$t;
      const date = published ? new Date(published).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

      return {
        title: entry.title?.$t || "Untitled",
        summary: cleanSummary,
        author: "Anish Sahoo",
        date,
        url: link,
      };
    });
  } catch {
    return [];
  }
};

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const callbackName = `blogger_cb_${Date.now()}`;
    const script = document.createElement("script");
    script.src = `https://withinthepixel.blogspot.com/feeds/posts/default?alt=json-in-script&callback=${callbackName}&max-results=7`;
    (window as any)[callbackName] = (data: any) => {
      setPosts(parseFeed(data));
      setLoading(false);
      delete (window as any)[callbackName];
      script.remove();
    };
    script.onerror = () => {
      setPosts([]);
      setLoading(false);
      delete (window as any)[callbackName];
      script.remove();
    };
    document.head.appendChild(script);
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  const Placeholder = ({ text }: { text: string }) => (
    <motion.div
      className="glass rounded-xl p-8 border border-secondary/30 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className="font-heading text-muted-foreground text-sm animate-pulse">{text}</span>
    </motion.div>
  );

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

        {loading ? (
          <Placeholder text="Loading posts…" />
        ) : posts.length === 0 ? (
          <Placeholder text="No posts available" />
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <motion.a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-8 mb-10 border border-secondary/30 cursor-pointer group transition-all duration-300 hover:glow-purple block"
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
                <p className="text-muted-foreground mb-4 max-w-2xl whitespace-pre-line">{featured.summary}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User size={12} /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {featured.date}</span>
                </div>
              </motion.a>
            )}

            {/* Post grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.a
                  key={post.url}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:glow-purple block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed whitespace-pre-line">{post.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

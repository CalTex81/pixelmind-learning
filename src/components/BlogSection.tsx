import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const BlogSection = () => {
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
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Our articles have moved to Medium. You can read all our latest stories, insights, and updates there.
          </p>
          <Button
            variant="glow"
            size="lg"
            className="text-base px-8 py-6"
            asChild
          >
            <a href="https://medium.com/@sa.anishsahoo" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Read on Medium
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;

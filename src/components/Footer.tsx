import { Instagram, Facebook, Heart } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Blog", href: "#blog" },
  { label: "Partners", href: "#partners" },
  { label: "Team", href: "#team" },
];

const socials = [
  { icon: <Instagram size={18} />, href: "https://www.instagram.com/pixelmindlearning/", label: "Instagram" },
  { icon: <Facebook size={18} />, href: "https://www.facebook.com/profile.php?id=61582190049665", label: "Facebook" },
];

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-8">
      <div className="neon-divider mb-12" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <span className="font-heading text-xl font-bold text-primary text-glow-cyan">
              PixelMind Learning
            </span>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              Empowering youth through code, creativity, and community. A program of the Future Leaders Initiative, a 501(c)(3) nonprofit.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:glow-cyan transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="neon-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} PixelMind Learning. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-accent" /> for the next generation
          </p>
        </div>

        {/* Tiny pixel animation */}
        <div className="absolute bottom-4 right-4 flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-primary/30 animate-glow-pulse"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

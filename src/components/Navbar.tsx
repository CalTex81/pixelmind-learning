import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Blog", href: "#blog" },
  { label: "Partners", href: "#partners" },
  { label: "Team", href: "#team" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a href="#" className="flex items-center gap-2">
          <img
            src="https://www.pixelmindlearning.org/logo"
            alt="PixelMind Learning"
            className="h-8 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="font-heading text-lg font-bold text-primary text-glow-cyan">
            PixelMind
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-display text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <Button variant="glow-outline" size="sm" asChild>
            <Link to="/join">Get Involved (For Mentors)</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-primary glow-cyan rounded"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-border/50 animate-fade-in-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-display text-muted-foreground hover:text-primary transition-colors py-2 tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <Button variant="glow-outline" size="sm" className="w-fit" asChild>
              <Link to="/join">Get Involved (For Mentors)</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

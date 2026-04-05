import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TopBanner = () => {
  return (
    <div className="w-full bg-secondary/20 border-b border-secondary/30 py-2 px-4 text-center z-[60] relative">
      <span className="text-sm font-display text-secondary-foreground">
        🚀 <strong className="text-secondary">We're hiring mentors!</strong> Share your skills and inspire the next generation.
      </span>
      <Button variant="glow-outline" size="sm" className="ml-3 h-7 text-xs px-3" asChild>
        <Link to="/join">Apply Now</Link>
      </Button>
    </div>
  );
};

export default TopBanner;

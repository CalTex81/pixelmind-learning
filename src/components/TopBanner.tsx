import { useState } from "react";
import { X } from "lucide-react";

const TopBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-secondary/20 border-b border-secondary/30 py-2 px-4 text-center z-[60] relative">
      <span className="text-sm font-display text-secondary-foreground">
        🔒 <strong className="text-secondary">Registration for Summer 2026 is now closed.</strong> Check back soon for our next session!
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default TopBanner;


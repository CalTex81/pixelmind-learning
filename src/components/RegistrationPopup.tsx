import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Timer } from "lucide-react";

const RegistrationPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("registration-popup-seen");
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("registration-popup-seen", "true");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="glass border-secondary/50 max-w-md text-center gap-0">
        <DialogHeader className="space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center glow-cyan">
            <Timer className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="font-heading text-2xl text-glow-cyan">
            Registration Closing Soon!
          </DialogTitle>
          <DialogDescription className="text-base text-foreground/90 space-y-3">
            <p>
              Registration for{" "}
              <strong className="text-primary">Summer 2026</strong> closes on
            </p>
            <p className="font-heading text-xl text-secondary">
              June 10th at 11:59 PM
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Button asChild variant="glow" className="w-full" onClick={handleClose}>
            <Link to="/signup">Sign Up Now</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationPopup;

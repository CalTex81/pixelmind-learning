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

const TARGET_DATE = new Date(2026, 5, 10, 23, 59, 0); // June 10, 2026 11:59 PM

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = target.getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = target.getTime() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds, expired: timeLeft === 0 };
}

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="font-heading text-2xl sm:text-3xl text-primary text-glow-cyan tabular-nums">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
      {label}
    </div>
  </div>
);

const RegistrationPopup = () => {
  const [open, setOpen] = useState(false);
  const { days, hours, minutes, seconds, expired } = useCountdown(TARGET_DATE);

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
            {expired ? "Registration Closed" : "Registration Closing Soon!"}
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

        {!expired && (
          <div className="mt-6 mb-2">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <CountdownUnit value={days} label="Days" />
              <span className="font-heading text-xl text-primary pb-4">:</span>
              <CountdownUnit value={hours} label="Hours" />
              <span className="font-heading text-xl text-primary pb-4">:</span>
              <CountdownUnit value={minutes} label="Mins" />
              <span className="font-heading text-xl text-primary pb-4">:</span>
              <CountdownUnit value={seconds} label="Secs" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <Button
            asChild
            variant="glow"
            className="w-full"
            disabled={expired}
            onClick={handleClose}
          >
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PixelGrid from "@/components/PixelGrid";

const JoinPage = () => {
  const navigate = useNavigate();
  const [submitted] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <PixelGrid />
      <Card className="relative z-10 max-w-md w-full mx-4 border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-4">
          <div className="text-4xl">🔒</div>
          <h2 className="text-2xl font-heading font-bold text-primary">Recruitment Closed</h2>
          <p className="text-muted-foreground">
            Mentor recruitment for Summer 2026 is now closed. Check back soon for our next session!
          </p>
          <Button variant="glow" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinPage;
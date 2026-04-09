import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import PixelGrid from "@/components/PixelGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, CheckCircle, XCircle, MailX } from "lucide-react";

type Status = "loading" | "valid" | "already_unsubscribed" | "invalid" | "confirming" | "success" | "error";

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: anonKey } }
        );
        const data = await res.json();
        if (res.ok && data.valid === true) {
          setStatus("valid");
        } else if (data.reason === "already_unsubscribed" || data.valid === false) {
          setStatus("already_unsubscribed");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    setStatus("confirming");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already_unsubscribed");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PixelGrid />
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 flex items-center justify-center min-h-[70vh]">
        <Card className="glass border-border/50 max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-primary text-glow-cyan text-2xl">Email Preferences</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {status === "loading" && (
              <>
                <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                <p className="text-muted-foreground">Validating your request...</p>
              </>
            )}
            {status === "valid" && (
              <>
                <MailX className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-foreground">Would you like to unsubscribe from PixelMind Learning emails?</p>
                <Button onClick={handleUnsubscribe} variant="destructive" className="w-full">
                  Confirm Unsubscribe
                </Button>
              </>
            )}
            {status === "confirming" && (
              <>
                <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                <p className="text-muted-foreground">Processing...</p>
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <p className="text-foreground font-semibold">You've been unsubscribed.</p>
                <p className="text-muted-foreground text-sm">You will no longer receive emails from PixelMind Learning.</p>
              </>
            )}
            {status === "already_unsubscribed" && (
              <>
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-foreground">You're already unsubscribed.</p>
              </>
            )}
            {status === "invalid" && (
              <>
                <XCircle className="w-12 h-12 text-destructive mx-auto" />
                <p className="text-foreground">This unsubscribe link is invalid or has expired.</p>
              </>
            )}
            {status === "error" && (
              <>
                <XCircle className="w-12 h-12 text-destructive mx-auto" />
                <p className="text-foreground">Something went wrong. Please try again later.</p>
              </>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default UnsubscribePage;

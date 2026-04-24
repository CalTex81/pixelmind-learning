import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CoursePage from "./pages/CoursePage.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ThankYouPage from "./pages/ThankYouPage.tsx";
import UnsubscribePage from "./pages/UnsubscribePage.tsx";

// Catch-all that redirects any case variation of known routes (e.g. /SignUp -> /signup)
const CaseInsensitiveRedirect = () => {
  const location = useLocation();
  const lower = location.pathname.toLowerCase();
  const knownRoutes = ["/signup", "/join", "/thank-you", "/unsubscribe"];
  if (knownRoutes.includes(lower) && lower !== location.pathname) {
    return <Navigate to={lower + location.search + location.hash} replace />;
  }
  return <NotFound />;
};

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses/:slug" element={<CoursePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<CaseInsensitiveRedirect />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

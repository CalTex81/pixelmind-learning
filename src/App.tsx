import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CoursePage from "./pages/CoursePage.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ThankYouPage from "./pages/ThankYouPage.tsx";
import UnsubscribePage from "./pages/UnsubscribePage.tsx";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

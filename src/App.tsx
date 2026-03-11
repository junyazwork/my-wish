import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CampaignsProvider } from "@/contexts/CampaignsContext";
import { ReturnOrdersProvider } from "@/contexts/ReturnOrdersContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import SponsorPolicyPage from "./pages/SponsorPolicyPage";
import ServiceGuidePage from "./pages/ServiceGuidePage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import BusinessAnalysisPage from "./pages/BusinessAnalysisPage";
import ERDiagramPage from "./pages/ERDiagramPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CampaignsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sponsor-policy" element={<SponsorPolicyPage />} />
            <Route path="/service-guide" element={<ServiceGuidePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/business-analysis" element={<BusinessAnalysisPage />} />
            <Route path="/er-diagram" element={<ERDiagramPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CampaignsProvider>
  </QueryClientProvider>
);

export default App;

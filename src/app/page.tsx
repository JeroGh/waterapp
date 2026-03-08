import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dashboard } from "@/components/sections/Dashboard";
import { BillingSection } from "@/components/sections/BillingSection";
import { IssueReporting } from "@/components/sections/IssueReporting";
import { ServiceAlerts } from "@/components/sections/ServiceAlerts";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-secondary selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Dashboard />
        <ServiceAlerts />
        <BillingSection />
        <IssueReporting />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
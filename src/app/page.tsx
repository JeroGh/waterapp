
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { Testimonials } from "@/components/sections/Testimonials";
import { AIChatAdvisor } from "@/components/sections/AIChatAdvisor";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductCatalog />
        <Testimonials />
        <AIChatAdvisor />
        <ConsultationForm />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}


import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, CheckCircle } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cloud');

  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
                Unleash the Power of <span className="text-accent">Enterprise</span> Cloud
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
                AuraCloud provides scalable, secure, and intelligent infrastructure solutions designed for the modern enterprise. Elevate your business efficiency today.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                <Link href="#consultation">
                  Request a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Explore Products
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 items-center text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>99.99% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>24/7 Priority Support</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-full" />
            <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden">
              <Image 
                src={heroImage?.imageUrl || ""} 
                alt={heroImage?.description || "Cloud Platform"}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
                data-ai-hint="cloud computing abstract"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Switching to AuraCloud was the best decision for our scaling infrastructure. We've seen a 40% reduction in latency and significant cost savings.",
    author: "Jane Doe",
    role: "CTO, Acme Corp",
    logoId: "logo-acme"
  },
  {
    quote: "The reliability of AuraCloud's global network is unparalleled. Our enterprise data is more secure and accessible than ever before.",
    author: "John Smith",
    role: "VP Infrastructure, Globex Corp",
    logoId: "logo-globex"
  },
  {
    quote: "AuraCloud's customer support is truly enterprise-grade. They were with us every step of the migration process.",
    author: "Alice Johnson",
    role: "IT Director, Soylent Corp",
    logoId: "logo-soylent"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20">Success Stories</Badge>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Trusted by Enterprise Leaders
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {testimonials.map((t, idx) => {
            const logo = PlaceHolderImages.find(img => img.id === t.logoId);
            return (
              <div key={idx} className="flex flex-col gap-6 p-8 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <Quote className="h-8 w-8 text-accent/20" />
                  {logo && (
                    <div className="relative w-24 h-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                      <Image 
                        src={logo.imageUrl} 
                        alt={logo.description} 
                        fill 
                        className="object-contain"
                        data-ai-hint="company logo"
                      />
                    </div>
                  )}
                </div>
                <p className="text-lg italic text-muted-foreground leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-primary">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

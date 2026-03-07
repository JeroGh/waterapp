
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, PhoneCall, Mail, Building } from "lucide-react";

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to store data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "Success",
      description: "Your consultation request has been sent. Our team will contact you shortly.",
    });
  };

  return (
    <section id="consultation" className="py-24 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                Ready to Accelerate Your Journey to the Cloud?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our solutions architects are ready to help you design an infrastructure that fuels your business growth.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold">Expert consultation</p>
                  <p className="text-sm text-muted-foreground">Direct access to cloud architects.</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold">Fast response</p>
                  <p className="text-sm text-muted-foreground">We typically respond within 12 business hours.</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold">Enterprise solutions</p>
                  <p className="text-sm text-muted-foreground">Custom pricing and SLAs for large scale needs.</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-muted/20">
            <CardHeader>
              <CardTitle>Request a Consultation</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you with a tailored plan.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold">Request Received!</p>
                    <p className="text-muted-foreground max-w-[300px]">Thank you for reaching out. One of our experts will contact you shortly.</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>Send another request</Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" required placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" required placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" required placeholder="john@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" required placeholder="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project requirements..." 
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Request"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

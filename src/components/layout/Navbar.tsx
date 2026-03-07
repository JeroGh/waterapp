
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline font-bold text-primary text-xl tracking-tight">
          <Cloud className="h-6 w-6 text-accent" />
          <span>AuraCloud</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#products" className="hover:text-primary transition-colors">Products</Link>
          <Link href="#testimonials" className="hover:text-primary transition-colors">Success Stories</Link>
          <Link href="#advisor" className="hover:text-primary transition-colors">AI Advisor</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:inline-flex">Login</Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#consultation">Request Consultation</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

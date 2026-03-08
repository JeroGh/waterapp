"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Droplets, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-xl tracking-tight">
          <Droplets className="h-6 w-6 text-secondary" />
          <span>AquaFlow</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <Link href="#billing" className="hover:text-primary transition-colors">My Bills</Link>
          <Link href="#report" className="hover:text-primary transition-colors">Report Issue</Link>
          <Link href="#alerts" className="hover:text-primary transition-colors">Alerts</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="#billing">Pay Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
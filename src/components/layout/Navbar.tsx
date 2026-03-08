"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Droplets, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-xl tracking-tight">
          <Droplets className="h-6 w-6 text-secondary" />
          <span className="hidden sm:inline">GWCL AquaFlow</span>
          <span className="sm:hidden">GWCL</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <Link href="#billing" className="hover:text-primary transition-colors">Bills & MoMo</Link>
          <Link href="#report" className="hover:text-primary transition-colors">Report Burst</Link>
          <Link href="#alerts" className="hover:text-primary transition-colors">Service Alerts</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
            <Link href="#billing">Pay Bill</Link>
          </Button>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="#dashboard" className="text-lg font-medium">Dashboard</Link>
                  <Link href="#billing" className="text-lg font-medium">Bills & MoMo</Link>
                  <Link href="#report" className="text-lg font-medium">Report Burst</Link>
                  <Link href="#alerts" className="text-lg font-medium">Service Alerts</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

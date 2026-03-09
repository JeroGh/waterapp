"use client";

import { useState, useEffect } from "react";
import { Droplets, Mail, Phone, MapPin, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <Droplets className="h-6 w-6 text-secondary" />
              <span>GWCL AquaFlow</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-[250px]">
              Ghana Water Company Limited. Providing reliable water services for a sustainable community across Ghana.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-secondary transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-secondary transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-secondary transition-colors"><Instagram className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="#dashboard" className="hover:text-secondary transition-colors">My Dashboard</Link></li>
              <li><Link href="#billing" className="hover:text-secondary transition-colors">Pay via Mobile Money</Link></li>
              <li><Link href="#report" className="hover:text-secondary transition-colors">Report Burst/Leak</Link></li>
              <li><Link href="#alerts" className="hover:text-secondary transition-colors">District Alerts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Customer Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="#" className="hover:text-secondary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Water Quality Reports</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Billing Policy</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Request a Meter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact GWCL</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +233 800-40-000</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@gwcl.com.gh</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1" /> Head Office, 28th February Road, <br />Accra, Ghana</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© {year || "2024"} Ghana Water Company Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

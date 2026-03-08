import { Droplets, Mail, Phone, MapPin, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <Droplets className="h-6 w-6 text-secondary" />
              <span>AquaFlow</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-[200px]">
              Reliable water services for a sustainable community.
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
              <li><Link href="#billing" className="hover:text-secondary transition-colors">Pay My Bill</Link></li>
              <li><Link href="#report" className="hover:text-secondary transition-colors">Report Leak</Link></li>
              <li><Link href="#alerts" className="hover:text-secondary transition-colors">Service Alerts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="#" className="hover:text-secondary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Water Quality Reports</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Conservation Tips</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Commercial Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1-800-AQUA-FLOW</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@aquaflow.com</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1" /> 123 Utility Way, <br />Metro City, MC 45678</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} AquaFlow Utility. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
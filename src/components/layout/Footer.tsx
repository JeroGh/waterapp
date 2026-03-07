
import { Cloud, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl tracking-tight">
              <Cloud className="h-6 w-6 text-accent" />
              <span>AuraCloud</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-[200px]">
              Empowering enterprise scale through intelligent cloud solutions and infrastructure.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Github className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="#products" className="hover:text-accent transition-colors">Compute</Link></li>
              <li><Link href="#products" className="hover:text-accent transition-colors">Storage</Link></li>
              <li><Link href="#products" className="hover:text-accent transition-colors">Networking</Link></li>
              <li><Link href="#products" className="hover:text-accent transition-colors">Database</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="#" className="hover:text-accent transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">SLA</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Legal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} AuraCloud. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

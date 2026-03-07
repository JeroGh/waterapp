
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Database, Shield, Zap, Globe, BarChart } from "lucide-react";

const products = [
  {
    name: "AuraCompute",
    description: "Scalable virtual machines and high-performance container clusters for your workloads.",
    price: "From $0.05/hr",
    features: ["Auto-scaling", "High Availability", "GPU support"],
    icon: Server,
    color: "bg-blue-50 text-blue-600"
  },
  {
    name: "AuraDB",
    description: "Fully managed SQL and NoSQL databases with automated backups and global replication.",
    price: "From $15/month",
    features: ["Multi-region", "Auto-backups", "High throughput"],
    icon: Database,
    color: "bg-purple-50 text-purple-600"
  },
  {
    name: "AuraSecurity",
    description: "Comprehensive DDoS protection, IAM, and WAF to keep your enterprise assets safe.",
    price: "Included with platform",
    features: ["Threat detection", "SSO integration", "Audit logs"],
    icon: Shield,
    color: "bg-green-50 text-green-600"
  },
  {
    name: "AuraAnalytics",
    description: "Data warehousing and real-time BI tools to transform data into actionable insights.",
    price: "Pay-per-query",
    features: ["Serverless analytics", "Visual BI", "Fast ingestion"],
    icon: BarChart,
    color: "bg-orange-50 text-orange-600"
  },
  {
    name: "AuraEdge",
    description: "Global CDN and edge computing to deliver content at lightning speeds anywhere.",
    price: "From $0.02/GB",
    features: ["Low latency", "Global footprint", "Smart caching"],
    icon: Globe,
    color: "bg-cyan-50 text-cyan-600"
  },
  {
    name: "AuraAI",
    description: "Pre-trained models and ML infrastructure to build intelligent applications faster.",
    price: "Custom tier",
    features: ["Vision AI", "Natural Language", "MLOps"],
    icon: Zap,
    color: "bg-yellow-50 text-yellow-600"
  }
];

export function ProductCatalog() {
  return (
    <section id="products" className="py-24 bg-white/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20">Our Solutions</Badge>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Integrated Cloud Services for Scale
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg">
            Choose from a wide array of specialized cloud products designed to interoperate seamlessly.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.name} className="flex flex-col h-full border-muted/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${product.color}`}>
                  <product.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed pt-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t pt-6 bg-muted/5 mt-auto">
                <div className="flex flex-col w-full">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Starting Price</span>
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

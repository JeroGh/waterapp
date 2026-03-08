"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle2, Info } from "lucide-react";

const activeAlerts = [
  {
    id: 1,
    title: "Scheduled Maintenance - Central District",
    status: "Active",
    time: "Today, 14:00 - 16:00",
    description: "Temporary water interruption for pipe replacement. Affecting blocks 12 to 45.",
    type: "maintenance"
  },
  {
    id: 2,
    title: "Burst Main Repair - South Avenue",
    status: "Ongoing",
    time: "Until further notice",
    description: "Emergency repair work in progress. Estimated restoration by 20:00 tonight.",
    type: "outage"
  }
];

export function ServiceAlerts() {
  return (
    <section id="alerts" className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Info className="h-6 w-6 text-secondary" />
            Service Status & Alerts
          </h2>
          <p className="text-muted-foreground">Real-time updates on water supply in your area.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeAlerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-secondary shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="text-secondary border-secondary">
                    {alert.status}
                  </Badge>
                  {alert.type === 'outage' ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-secondary" />
                  )}
                </div>
                <CardTitle className="text-lg mt-2">{alert.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground">{alert.time}</p>
                <p className="text-sm leading-relaxed">{alert.description}</p>
              </CardContent>
            </Card>
          ))}
          
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-green-800">Your Area Status</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700">
                Supply to <strong>North Hill Park</strong> is currently stable. No interruptions planned for the next 48 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
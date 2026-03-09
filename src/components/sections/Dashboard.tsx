"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, AlertTriangle, Wallet, Calendar, TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const usageData = [
  { month: "Jan", usage: 4.2 },
  { month: "Feb", usage: 3.8 },
  { month: "Mar", usage: 5.1 },
  { month: "Apr", usage: 4.5 },
  { month: "May", usage: 6.2 },
  { month: "Jun", usage: 7.5 },
];

export function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="dashboard" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome, Alex Boateng</h1>
          <p className="text-muted-foreground">Account Summary - District: Accra Central</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="border-l-4 border-l-orange-500 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Current Balance</CardTitle>
              <Wallet className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">GH₵ 450.50</div>
              <p className="text-xs text-muted-foreground mt-1">Due Date: Oct 20, 2023</p>
              <Badge variant="destructive" className="mt-3 animate-pulse">Disconnection Risk</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Monthly Usage</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5 kL</div>
              <div className="flex items-center gap-1 text-xs text-red-500 mt-1 font-medium">
                <TrendingUp className="h-3 w-3" />
                +12% vs last month
              </div>
              <Progress value={75} className="h-2 mt-4" />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Next Reading</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Oct 24</div>
              <p className="text-xs text-muted-foreground mt-1">Scheduled regular check-up</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-primary-foreground/70 tracking-wider">Service Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">1 Active Outage</div>
              <p className="text-xs text-primary-foreground/70 mt-1">Maintenance near North Ridge</p>
              <Badge variant="secondary" className="mt-3 bg-white/20 hover:bg-white/30 text-white border-none">Check Status</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <Card className="lg:col-span-2 shadow-sm border-muted/20 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Usage History (6 Months)</CardTitle>
              <CardDescription>Measured in kiloliters (kL) for Accra District</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] px-2 sm:px-6 pb-6">
              {mounted ? (
                <ChartContainer config={{ usage: { label: "Water Usage", color: "hsl(var(--primary))" } }} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted)/0.3)' }} />
                      <Bar dataKey="usage" fill="var(--color-usage)" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-muted/10 rounded-lg">
                  <p className="text-xs text-muted-foreground animate-pulse">Loading usage history...</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-muted/20">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription>Stay updated on your GWCL account</CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Disconnection Warning</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Account #992818 is past due. Pay GH₵ 450.50 via MoMo to prevent disconnection.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Maintenance Notice</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Supply interrupted on Oct 15, 2PM - 4PM for main pipe repairs in North Ridge.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Payment Setup</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">MTN Mobile Money wallet (024****420) successfully set for easy pay.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-muted mt-2 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Meter Reading</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Last reading confirmed on Sep 24. Usage: 6.2 kL.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

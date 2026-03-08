"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, AlertTriangle, Wallet, Calendar } from "lucide-react";
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
  return (
    <section id="dashboard" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome Back, Alex</h1>
          <p className="text-muted-foreground">Here's a summary of your water account in Ghana Cedis.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Current Balance</CardTitle>
              <Wallet className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GH₵ 450.50</div>
              <p className="text-xs text-muted-foreground mt-1">Due in 4 days</p>
              <Badge variant="destructive" className="mt-3">Disconnection Risk</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Monthly Usage</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5 kL</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
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
              <p className="text-xs text-muted-foreground mt-1">Scheduled regular check</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-primary-foreground/70 tracking-wider">Service Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">1 Active Outage</div>
              <p className="text-xs text-primary-foreground/70 mt-1">Scheduled maintenance near you</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>Your water consumption over the last 6 months (kiloliters)</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pb-6">
              <ChartContainer config={{ usage: { label: "Usage", color: "hsl(var(--primary))" } }} className="h-full w-full">
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
                    <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted)/0.5)' }} />
                    <Bar dataKey="usage" fill="var(--color-usage)" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Stay updated on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Payment Overdue</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Your bill from Sep 10 is past due. Avoid disconnection by paying via MoMo today.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Maintenance Alert</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Water supply interrupted on Oct 15, 2PM - 4PM for repairs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">MoMo Auto-Pay Enrolled</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">MTN Mobile Money successfully set for automatic payments.</p>
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

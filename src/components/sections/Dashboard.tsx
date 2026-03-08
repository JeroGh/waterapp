"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, AlertTriangle, CreditCard, Calendar } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
          <p className="text-muted-foreground">Here's a summary of your water account.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Current Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$124.50</div>
              <p className="text-xs text-muted-foreground mt-1">Due in 4 days</p>
              <Badge variant="destructive" className="mt-3">Disconnection Risk</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Monthly Usage</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5 kL</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              <Progress value={75} className="h-2 mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Next Reading</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Oct 24</div>
              <p className="text-xs text-muted-foreground mt-1">Scheduled regular check</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase text-primary-foreground/70">Service Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">1 Active Outage</div>
              <p className="text-xs text-primary-foreground/70 mt-1">Scheduled maintenance near you</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>Your water consumption over the last 6 months (kiloliters)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer config={{ usage: { label: "Usage", color: "hsl(var(--primary))" } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="usage" fill="var(--color-usage)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Stay updated on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Payment Overdue</p>
                    <p className="text-xs text-muted-foreground">Your bill from Sep 10 is past due. Avoid disconnection by paying today.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Maintenance Alert</p>
                    <p className="text-xs text-muted-foreground">Water supply interrupted on Oct 15, 2PM - 4PM for repairs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Auto-Pay Enrolled</p>
                    <p className="text-xs text-muted-foreground">Your account is now set for automatic monthly payments.</p>
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
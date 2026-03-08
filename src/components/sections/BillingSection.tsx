"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, CreditCard, Clock } from "lucide-react";

const bills = [
  { id: "INV-2023-09", date: "2023-09-10", amount: 124.50, status: "Unpaid", usage: "7.5 kL" },
  { id: "INV-2023-08", date: "2023-08-10", amount: 110.20, status: "Paid", usage: "6.2 kL" },
  { id: "INV-2023-07", date: "2023-07-10", amount: 95.80, status: "Paid", usage: "5.5 kL" },
];

export function BillingSection() {
  const [isPaying, setIsPaying] = useState(false);
  const { toast } = useToast();

  const handlePay = async () => {
    setIsPaying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPaying(false);
    toast({
      title: "Payment Successful",
      description: "Thank you for your payment of $124.50.",
    });
  };

  return (
    <section id="billing" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary">Billing & Payments</h2>
            <p className="text-muted-foreground">Manage your invoices and payment methods.</p>
          </div>
          <Button onClick={handlePay} disabled={isPaying} className="bg-primary hover:bg-primary/90">
            {isPaying ? "Processing..." : "Pay Current Bill ($124.50)"}
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-sm border-muted/20">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>History of your last 12 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.usage}</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={bill.status === "Paid" ? "secondary" : "destructive"}>
                          {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-sm border-muted/20">
              <CardHeader>
                <CardTitle className="text-lg">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Badge variant="outline">Default</Badge>
                </div>
                <Button variant="outline" className="w-full">Add New Method</Button>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Disconnection Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700">
                  Your account is at risk of disconnection. Please settle the outstanding balance of <strong>$124.50</strong> by Oct 20th to maintain service.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handlePay}>Pay Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
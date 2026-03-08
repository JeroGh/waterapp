"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, CreditCard, Clock, Smartphone, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const bills = [
  { id: "INV-2023-09", date: "2023-09-10", amount: 450.50, status: "Unpaid", usage: "7.5 kL" },
  { id: "INV-2023-08", date: "2023-08-10", amount: 380.20, status: "Paid", usage: "6.2 kL" },
  { id: "INV-2023-07", date: "2023-07-10", amount: 315.80, status: "Paid", usage: "5.5 kL" },
];

export function BillingSection() {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'selection' | 'momo-details' | 'processing' | 'success'>('selection');
  const [momoProvider, setMomoProvider] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const { toast } = useToast();

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    await new Promise(resolve => setTimeout(resolve, 3000));
    setPaymentStep('success');
    toast({
      title: "Payment Received",
      description: `GH₵ 450.50 paid via ${momoProvider} MoMo.`,
    });
  };

  const resetPayment = () => {
    setPaymentStep('selection');
    setMomoNumber("");
    setMomoProvider("");
  };

  return (
    <section id="billing" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary">Billing & Payments</h2>
            <p className="text-muted-foreground">Manage your invoices and pay via Mobile Money or Card.</p>
          </div>
          <Dialog onOpenChange={(open) => !open && resetPayment()}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-lg py-6 px-8">
                Pay Current Bill (GH₵ 450.50)
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Make a Payment</DialogTitle>
                <DialogDescription>
                  Settle your outstanding balance of GH₵ 450.50
                </DialogDescription>
              </DialogHeader>

              {paymentStep === 'selection' && (
                <div className="grid gap-4 py-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-between h-16 px-4"
                    onClick={() => setPaymentStep('momo-details')}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-6 w-6 text-primary" />
                      <div className="text-left">
                        <p className="font-bold">Mobile Money</p>
                        <p className="text-xs text-muted-foreground">MTN, Telecel, AirtelTigo</p>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-between h-16 px-4" disabled>
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-muted-foreground" />
                      <div className="text-left">
                        <p className="font-bold">Credit/Debit Card</p>
                        <p className="text-xs text-muted-foreground">Temporarily unavailable</p>
                      </div>
                    </div>
                  </Button>
                </div>
              )}

              {paymentStep === 'momo-details' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider">Select Network Provider</Label>
                    <Select required onValueChange={setMomoProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MTN">MTN Mobile Money</SelectItem>
                        <SelectItem value="Telecel">Telecel Cash</SelectItem>
                        <SelectItem value="AirtelTigo">AirtelTigo Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Mobile Money Number</Label>
                    <Input 
                      id="number" 
                      placeholder="e.g. 024XXXXXXX" 
                      required 
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                    />
                    <p className="text-[10px] text-muted-foreground italic">You will receive a prompt on your phone to authorize this transaction.</p>
                  </div>
                  <Button type="submit" className="w-full py-6 text-lg">
                    Confirm & Pay GH₵ 450.50
                  </Button>
                </form>
              )}

              {paymentStep === 'processing' && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="font-medium animate-pulse">Waiting for authorization...</p>
                  <p className="text-sm text-muted-foreground text-center">Please check your phone for the MoMo PIN prompt.</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                  <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Payment Successful</h3>
                    <p className="text-muted-foreground">Your account balance has been updated. Reference: #MM-99212</p>
                  </div>
                  <Button variant="outline" onClick={resetPayment}>Close</Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-sm border-muted/20">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>History of your last 12 months in Ghana Cedis.</CardDescription>
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
                      <TableCell>GH₵ {bill.amount.toFixed(2)}</TableCell>
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
                <CardTitle className="text-lg">Saved MoMo Wallets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">MTN (024****420)</p>
                      <p className="text-xs text-muted-foreground">Verified Wallet</p>
                    </div>
                  </div>
                  <Badge variant="outline">Default</Badge>
                </div>
                <Button variant="outline" className="w-full">Link New Wallet</Button>
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
                  Your account is at risk of disconnection. Please settle the outstanding balance of <strong>GH₵ 450.50</strong> by Oct 20th to maintain service.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Resolve with MoMo</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

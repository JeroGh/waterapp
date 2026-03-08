"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Camera, Send, MessageSquare, AlertCircle, Droplets } from "lucide-react";
import { aiChatWaterAssistant, type AIWaterAssistantOutput } from "@/ai/flows/water-assistant-flow";

export function IssueReporting() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIWaterAssistantOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setIsSubmitting(true);
    try {
      const result = await aiChatWaterAssistant({ message: description, history: [] });
      setAiAnalysis(result);
      if (result.isIssueUrgent) {
        toast({
          variant: "destructive",
          title: "Urgent Burst Detected",
          description: "Our AI flagged this as a major burst. Emergency crew dispatched to " + (location || "your area") + ".",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate report submission
    setTimeout(() => {
      toast({
        title: "Report Filed Successfully",
        description: "Your reference number is #GWCL-ACC-99812. You will receive SMS updates.",
      });
      setDescription("");
      setLocation("");
      setAiAnalysis(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="report" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
              <Droplets className="h-8 w-8 text-secondary" />
              Report a Problem
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Help us maintain Ghana's water network. Found a burst pipe, illegal connection, or have no water? Use our AI-assisted reporting tool to get help faster.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/50 border border-muted/50">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Attach Photos</h4>
                  <p className="text-sm text-muted-foreground">Photos help our crews locate and assess the burst severity.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-white/50 border border-muted/50">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Priority Processing</h4>
                  <p className="text-sm text-muted-foreground">AI analysis identifies major bursts for immediate emergency response.</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-muted/20 overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground py-8">
              <CardTitle className="text-2xl">Submit Report</CardTitle>
              <CardDescription className="text-primary-foreground/70">Provide details for the GWCL maintenance team.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="type" className="font-semibold">Type of Issue</Label>
                  <Select required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leak">Burst Pipe / Leak</SelectItem>
                      <SelectItem value="outage">Total Supply Failure</SelectItem>
                      <SelectItem value="pressure">Very Low Water Pressure</SelectItem>
                      <SelectItem value="illegal">Illegal Water Connection</SelectItem>
                      <SelectItem value="billing">Meter/Billing Problem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-semibold">Exact Location</Label>
                  <Input 
                    placeholder="Street name, house number, or landmark" 
                    className="h-12"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desc" className="font-semibold">Describe what you see</Label>
                  <Textarea 
                    id="desc"
                    placeholder="E.g. Large pipe burst under the road, water is flooding the street..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] resize-none"
                    required
                  />
                  {description.length > 15 && !aiAnalysis && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAnalyze}
                      disabled={isSubmitting}
                      className="text-xs font-semibold text-primary border-primary/20 hover:bg-primary/5"
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-2" />
                      {isSubmitting ? "Analyzing details..." : "Verify Urgency with AI"}
                    </Button>
                  )}
                </div>

                {aiAnalysis && (
                  <div className={`p-4 rounded-xl text-sm border-2 animate-in fade-in slide-in-from-top-2 ${aiAnalysis.isIssueUrgent ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className={`h-4 w-4 ${aiAnalysis.isIssueUrgent ? 'text-red-600' : 'text-blue-600'}`} />
                      <span className="font-bold uppercase tracking-tight">GWCL AI Recommendation</span>
                    </div>
                    <p className="leading-relaxed">{aiAnalysis.response}</p>
                  </div>
                )}

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-7 text-lg font-bold shadow-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Submit to Maintenance
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/50 py-4 justify-center">
              <p className="text-xs text-muted-foreground italic">You will receive a reference code via SMS after submission.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

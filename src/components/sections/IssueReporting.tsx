"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Camera, Send, MessageSquare, AlertCircle } from "lucide-react";
import { aiChatWaterAssistant, type AIWaterAssistantOutput } from "@/ai/flows/ai-chat-product-advisor-flow";

export function IssueReporting() {
  const [description, setDescription] = useState("");
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
          title: "Urgent Issue Detected",
          description: "This looks like a major burst. Dispatching emergency crew.",
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
    toast({
      title: "Issue Reported",
      description: "Your report has been received. Reference: #AQ-99812",
    });
    setDescription("");
    setAiAnalysis(null);
  };

  return (
    <section id="report" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Report a Service Issue</h2>
            <p className="text-muted-foreground mb-8">
              Found a leak? No water? Tell us about it. Our AI assistant will help prioritize your request based on the description you provide.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Attach Photos</h4>
                  <p className="text-sm text-muted-foreground">Photos help our crews find and fix issues faster.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Real-time Updates</h4>
                  <p className="text-sm text-muted-foreground">Get SMS updates on the status of your reported issue.</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-lg border-muted/20">
            <CardHeader>
              <CardTitle>Submit Report</CardTitle>
              <CardDescription>Provide details about the issue.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Issue Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leak">Pipe Leak / Burst</SelectItem>
                      <SelectItem value="outage">No Water Supply</SelectItem>
                      <SelectItem value="pressure">Low Pressure</SelectItem>
                      <SelectItem value="billing">Billing Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input placeholder="Street address or nearest landmark" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desc">Describe the issue</Label>
                  <Textarea 
                    id="desc"
                    placeholder="E.g. Large burst pipe on the sidewalk, water is gushing out..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                  {description.length > 10 && !aiAnalysis && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleAnalyze}
                      disabled={isSubmitting}
                      className="text-xs text-blue-600"
                    >
                      <MessageSquare className="h-3 w-3 mr-2" />
                      {isSubmitting ? "Analyzing..." : "Analyze with AI Assistant"}
                    </Button>
                  )}
                </div>

                {aiAnalysis && (
                  <div className={`p-3 rounded-lg text-sm border ${aiAnalysis.isIssueUrgent ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                    <p className="font-bold mb-1">AI Suggestion:</p>
                    <p>{aiAnalysis.response}</p>
                  </div>
                )}

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                  <Send className="h-5 w-5 mr-2" />
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
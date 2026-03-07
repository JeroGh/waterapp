
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Sparkles, User, Cloud } from "lucide-react";
import { aiChatProductAdvisor, type AIChatProductAdvisorOutput } from "@/ai/flows/ai-chat-product-advisor-flow";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function AIChatAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm your AuraCloud Solution Advisor. To help you find the best cloud products, could you tell me a bit about your business and your main goals for cloud infrastructure?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const avatar = PlaceHolderImages.find(img => img.id === 'advisor-avatar');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const result: AIChatProductAdvisorOutput = await aiChatProductAdvisor({
        message: userMsg,
        history: messages
      });

      setMessages(prev => [...prev, { role: 'model', content: result.response }]);
      if (result.isRecommendationFinal) {
        setRecommendations(result.suggestedProducts);
      }
    } catch (error) {
      console.error("Failed to get AI advisor response:", error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I encountered an error. Could you try rephrasing that?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="advisor" className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-accent/10 text-primary border-accent/20">AI Assistant</Badge>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              Not sure where to start? <br />
              <span className="text-accent">Ask our AI Advisor.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our intelligent advisor helps enterprise owners find the perfect set of cloud services based on specific business needs, scaling requirements, and budget constraints.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Sparkles className="h-3 w-3" />
                </div>
                <span>Get tailored recommendations in seconds.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Sparkles className="h-3 w-3" />
                </div>
                <span>Identify the most cost-effective solutions for your scale.</span>
              </li>
            </ul>
          </div>

          <Card className="shadow-2xl border-muted/20 overflow-hidden flex flex-col h-[600px]">
            <CardHeader className="bg-primary text-primary-foreground flex flex-row items-center gap-4 py-4">
              <Avatar className="border-2 border-accent/50">
                <AvatarImage src={avatar?.imageUrl} />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">AuraCloud AI Advisor</CardTitle>
                <p className="text-xs text-primary-foreground/70">Online and ready to assist</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-0">
              <ScrollArea className="h-full px-6 py-4">
                <div className="space-y-4">
                  {messages.map((m, idx) => (
                    <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="h-8 w-8 shrink-0">
                        {m.role === 'model' ? (
                          <AvatarFallback className="bg-accent/10 text-accent"><Cloud className="h-4 w-4" /></AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-muted"><User className="h-4 w-4" /></AvatarFallback>
                        )}
                      </Avatar>
                      <div className={`rounded-2xl px-4 py-2 text-sm max-w-[80%] ${
                        m.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted/50 border'
                      }`}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-accent/10 text-accent animate-pulse">...</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted/50 border rounded-2xl px-4 py-2 text-sm">
                        Analysing your requirements...
                      </div>
                    </div>
                  )}
                  {recommendations.length > 0 && (
                    <div className="pt-4 space-y-3">
                      <p className="text-xs font-bold text-accent uppercase tracking-widest">Recommended for you:</p>
                      <div className="flex flex-wrap gap-2">
                        {recommendations.map(r => (
                          <Badge key={r} variant="outline" className="border-accent text-accent py-1 px-3">
                            {r}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t bg-white">
              <form 
                className="flex w-full gap-2" 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              >
                <Input 
                  placeholder="Tell me about your business needs..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-accent"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-accent text-accent-foreground">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

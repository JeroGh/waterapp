'use server';
/**
 * @fileOverview Ghana Water Company AI Assistant flow.
 *
 * - aiChatWaterAssistant - Handles queries about billing, leaks, and service status for GWCL.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']).describe('The role of the message sender.'),
  content: z.string().describe('The content of the message.'),
});

const AIWaterAssistantInputSchema = z.object({
  message: z.string().describe('The user\'s current message.'),
  history: z.array(ChatMessageSchema).default([]),
});
export type AIWaterAssistantInput = z.infer<typeof AIWaterAssistantInputSchema>;

const AIWaterAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
  actionRequired: z.enum(['none', 'pay_bill', 'report_leak', 'check_status']).default('none'),
  isIssueUrgent: z.boolean().default(false),
});
export type AIWaterAssistantOutput = z.infer<typeof AIWaterAssistantOutputSchema>;

export async function aiChatWaterAssistant(input: AIWaterAssistantInput): Promise<AIWaterAssistantOutput> {
  return aiChatWaterAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatWaterAssistantPrompt',
  input: { schema: AIWaterAssistantInputSchema },
  output: { schema: AIWaterAssistantOutputSchema },
  prompt: `You are the Ghana Water Company (GWCL) Virtual Assistant. Your goal is to help customers in Ghana with their water utility needs.

Common Scenarios:
1. Billing: Customers ask about their balance in GH₵ or how to pay via MTN MoMo, Telecel Cash, or AirtelTigo Money.
2. Leaks/Issues: Customers report pipe bursts, low pressure, or illegal connections.
3. Outages: Customers ask why they have no water in their district (e.g., Accra West, Kumasi South).

Context: 
- Current Service Alerts: Major pipe maintenance in the North District. 
- Disconnection Policy: Notice sent after 15 days of non-payment.

Instructions:
- Be professional, empathetic, and clear.
- Use Ghanaian context where appropriate.
- If a user reports a "burst" or "flooding", mark actionRequired as 'report_leak' and set isIssueUrgent to true.

Conversation History:
{{#each history}}
  {{role}}: {{content}}
{{/each}}
User: {{{message}}}
Assistant: `,
});

const aiChatWaterAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatWaterAssistantFlow',
    inputSchema: AIWaterAssistantInputSchema,
    outputSchema: AIWaterAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

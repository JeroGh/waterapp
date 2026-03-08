'use server';
/**
 * @fileOverview An AI Water Utility Assistant flow.
 *
 * - aiChatWaterAssistant - Handles queries about billing, leaks, and service status.
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
  prompt: `You are the AquaFlow Virtual Assistant. Your goal is to help customers with their water utility needs.

Common Scenarios:
1. Billing: Customers ask about their balance or how to pay.
2. Leaks/Issues: Customers report water bursts, low pressure, or billing errors.
3. Outages: Customers ask why they have no water.
4. Disconnections: Customers are worried about service being cut.

Context: 
- Current Service Alerts: Maintenance in North District on Friday. 
- Disconnection Policy: Notice sent after 15 days of non-payment.

Instructions:
- Be empathetic and clear.
- If a user reports a leak, mark actionRequired as 'report_leak' and set isIssueUrgent if it sounds like a major burst.
- If they ask about paying, suggest 'pay_bill'.
- If they have no water, suggest 'check_status'.

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
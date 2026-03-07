'use server';
/**
 * @fileOverview An AI Cloud Solution Advisor flow.
 *
 * - aiChatProductAdvisor - A function that handles the interaction with the AI Cloud Solution Advisor.
 * - AIChatProductAdvisorInput - The input type for the aiChatProductAdvisor function.
 * - AIChatProductAdvisorOutput - The return type for the aiChatProductAdvisor function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema: User's message and conversation history
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']).describe('The role of the message sender.'),
  content: z.string().describe('The content of the message.'),
});

const AIChatProductAdvisorInputSchema = z.object({
  message: z.string().describe('The user\'s current message or question.'),
  history: z.array(ChatMessageSchema).default([]).describe('The conversation history between the user and the AI advisor.'),
});
export type AIChatProductAdvisorInput = z.infer<typeof AIChatProductAdvisorInputSchema>;

// Output Schema: AI's response, potential product suggestions, and a flag for final recommendation
const AIChatProductAdvisorOutputSchema = z.object({
  response: z.string().describe('The AI advisor\'s conversational response or final recommendation message.'),
  suggestedProducts: z.array(z.string()).describe('An array of cloud product names suggested by the AI. This will be empty if the AI is still gathering information.'),
  isRecommendationFinal: z.boolean().describe('A flag indicating if the AI has made a final product recommendation. True if recommendations are provided, false otherwise.'),
});
export type AIChatProductAdvisorOutput = z.infer<typeof AIChatProductAdvisorOutputSchema>;

export async function aiChatProductAdvisor(input: AIChatProductAdvisorInput): Promise<AIChatProductAdvisorOutput> {
  return aiChatProductAdvisorFlow(input);
}

const productCatalog = [
  "AuraCompute (Scalable VMs and Containers)",
  "AuraStorage (Object, File, and Block Storage)",
  "AuraDB (Managed Databases like PostgreSQL, MySQL, NoSQL)",
  "AuraNetwork (VPN, Load Balancing, CDN)",
  "AuraSecurity (DDoS Protection, IAM, WAF)",
  "AuraAnalytics (Data Warehousing, BI Tools)",
  "AuraAI (ML Platforms, Vision AI, Natural Language Processing)",
  "AuraDevOps (CI/CD, Monitoring, Logging)",
  "AuraConnect (Hybrid Cloud Solutions)",
  "AuraEdge (Edge Computing Services)"
];

const prompt = ai.definePrompt({
  name: 'aiChatProductAdvisorPrompt',
  input: { schema: AIChatProductAdvisorInputSchema },
  output: { schema: AIChatProductAdvisorOutputSchema },
  prompt: `You are an AI Cloud Solution Advisor for AuraCloud, a leading cloud provider for enterprise businesses. Your goal is to help enterprise business owners quickly find the most suitable cloud products for their specific business needs without them having to manually browse through all options.

AuraCloud offers the following key products:
${productCatalog.map(p => `- ${p}`).join('\n')}

You must follow these rules:
1. Start by greeting the user and asking them about their business, industry, and main challenges or goals they hope to solve with cloud services.
2. Ask clarifying questions to understand their needs deeply, such as their current infrastructure, budget, technical expertise, compliance requirements, and expected scale.
3. Once you have enough information, suggest 1-3 most suitable products from the AuraCloud product catalog.
4. When making a recommendation, set 'isRecommendationFinal' to true and list the recommended products in the 'suggestedProducts' array.
5. If you are still gathering information, 'isRecommendationFinal' should be false and 'suggestedProducts' should be an empty array.
6. Do not recommend products that are not explicitly listed in the 'AuraCloud offers the following key products' list.
7. Your responses should be professional, helpful, and concise.

Conversation History:
{{#each history}}
  {{#if (eq role "user")}}
    User: {{content}}
  {{else}}
    Advisor: {{content}}
  {{/if}}
{{/each}}
User: {{{message}}}
Advisor: `,
});

const aiChatProductAdvisorFlow = ai.defineFlow(
  {
    name: 'aiChatProductAdvisorFlow',
    inputSchema: AIChatProductAdvisorInputSchema,
    outputSchema: AIChatProductAdvisorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

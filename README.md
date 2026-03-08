# GWCL AquaFlow - Ghana Water Company Limited Digital Portal

Welcome to the official source code for the GWCL AquaFlow prototype. This application is designed to provide a modern, mobile-first experience for water utility management in Ghana.

## 🚀 Key Features

- **Personalized Dashboard**: Real-time account balance (GH₵), water usage history using Recharts, and district-specific service alerts.
- **Mobile Money Integration**: Secure payment flow simulation for MTN MoMo, Telecel Cash, and AirtelTigo Money.
- **AI-Powered Reporting**: Intelligent issue reporting that uses Genkit (Gemini 2.5 Flash) to identify urgent pipe bursts and suggest immediate actions.
- **Service Status Center**: Live updates on outages and scheduled maintenance across districts.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop using Tailwind CSS and ShadCN UI.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI/LLM**: [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📁 Project Structure

- `src/app/`: Next.js pages and global styles.
- `src/components/sections/`: Core functional components (Dashboard, Billing, Reporting).
- `src/components/ui/`: Reusable ShadCN UI components.
- `src/ai/flows/`: Genkit AI logic for the Water Assistant.
- `src/lib/`: Utility functions and placeholder data.

## 💡 How to Use
1. **Navigate**: Use the top navigation bar to jump between the Dashboard, Billing, and Reporting sections.
2. **Pay Bills**: Click "Pay Now" in the Billing section to experience the Mobile Money payment flow.
3. **Report Issues**: Describe a water issue (e.g., "There is a major burst on the main road in North Ridge") to see the AI analyze the urgency.

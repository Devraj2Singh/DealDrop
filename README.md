🍀 DealDrop

DealDrop — A full-stack price tracking app that shows product price history, lets users track products, and sends email alerts when prices drop — built with Next.js App Router, Supabase, Recharts, and Tailwind CSS.

Live Demo: (Your Vercel URL here)

🚀 Features

🔐 Google & Email Authentication

🛍 Add / remove product URLs to track

📉 View price history with interactive charts

📧 Email Price Drop Alerts

🛠 Modern UI with Tailwind CSS + shadcn/ui

🔒 Secure per-user data with Supabase RLS

⚡ Instant price checks and notifications

🧠 Tech Stack
Layer	Tech
Frontend	Next.js (App Router), React
UI	Tailwind CSS, shadcn/ui, Recharts
Backend	Supabase Auth & Database
Alerts	Supabase Edge Functions / Cron / Email API
⚙️ Local Setup
1. Clone the Repo
git clone https://github.com/Devraj2Singh/DealDrop.git
cd DealDrop

2. Install Dependencies
npm install
# or
yarn
# or
pnpm install

3. Create .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EMAIL_PROVIDER_API_KEY=your_email_service_api_key


Replace:

your_supabase_url

your_supabase_anon_key

your_email_service_api_key (SendGrid / Mailgun / SMTP)

🗃 Supabase Database Setup
Products Table (example)
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  title text,
  url text,
  current_price numeric,
  target_price numeric,
  created_at timestamp with time zone DEFAULT now()
);

Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

Policies
CREATE POLICY "Users can view their own products"
ON public.products
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
ON public.products
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

📧 Email Price Alerts (Overview)

Your app should do these steps:

Store target_price for each product

Regularly check price via Cron / Supabase Edge Function

Compare current_price <= target_price

Trigger email via email provider (SendGrid / Mailgun)

📅 Scheduled Price Checks

You can schedule price updates using:

🕒 Supabase Scheduled Functions

⏰ Vercel Cron Jobs

✨ External Cron Service

Example edge function snippet to check prices:

import { createClient } from "@/utils/supabase/server";
import fetchPrice from "@/utils/fetchPrice";
import sendEmail from "@/utils/sendEmail";

export default async function handler() {
  const supabase = createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*");

  for (let p of products) {
    const latest = await fetchPrice(p.url);

    if (latest <= p.target_price) {
      await sendEmail({
        to: p.user_email,
        subject: `Price Drop: ${p.title}`,
        text: `Price dropped to ${latest}!`
      });
    }

    await supabase
      .from("products")
      .update({ current_price: latest })
      .eq("id", p.id);
  }
}

🏃 Run Locally
npm run dev


Open → http://localhost:3000

🚀 Deployment (Vercel)

Push to GitHub

Import repo in Vercel

Add Environment variables in Vercel:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
EMAIL_PROVIDER_API_KEY


Set Redirect URLs in Supabase Auth:

https://yourapp.vercel.app/auth/callback


Deploy

👁‍🗨 Testing & Alerts

✔ Add products
✔ Set target price
✔ Confirm email alerts on price drops
✔ Check charts update

⚠️ Email Provider Setup (example SendGrid)

Install:

npm install @sendgrid/mail


In utils/sendEmail.js:

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.EMAIL_PROVIDER_API_KEY);

export default async function sendEmail({ to, subject, text }) {
  await sgMail.send({ to, from: "noreply@dealdrop.app", subject, text });
}

💡 Future Ideas

Push notifications

Webhooks

Mobile apps

Multi-store scraping

AI price predictions

🤝 Contributing

Contribute via forks & PRs!
Star ⭐ if you like it

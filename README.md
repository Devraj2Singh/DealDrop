Here’s a polished `README.md` you can drop into your repo and tweak as you like:

```md
# DealDrop

Track product prices from your favorite e‑commerce sites and get notified when they drop.  
DealDrop is a full‑stack price tracking app built with **Next.js App Router**, **Supabase**, **Firecrawl**, and modern React tooling.

---

## 🚀 Features

- 🔗 **Multi‑site tracking** – Paste a product URL (Amazon, Flipkart, etc.) and DealDrop will scrape the latest price.
- 📉 **Automatic price updates** – A cron route periodically re‑scrapes products and stores price history.
- 🔔 **Price‑drop alerts** – When a product’s price falls, users receive an email notification via Resend.
- 📊 **Price history** – Each product keeps a full history of price checks in the `price_history` table.
- 🔐 **Auth & RLS** – Supabase Auth with Google OAuth and row‑level security so users only see their own products.
- 💅 **Modern UI** – Built with shadcn/ui components, lucide‑react icons, and responsive Tailwind CSS.

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router, Server Components, Server Actions)
- **Database & Auth:** Supabase (PostgreSQL, RLS, Auth, Admin API)
- **Scraping:** Firecrawl (`@mendable/firecrawl-js`) for product data extraction
- **Email:** Resend for transactional email alerts
- **UI:** React, shadcn/ui, Tailwind CSS, lucide‑react
- **Cron / Automation:** Route handler secured with a `CRON_SECRET` bearer token

---

## 📦 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Devraj2Singh/DealDrop.git
cd DealDrop
pnpm install   # or npm install / yarn install
```

### 2. Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

FIRECRAWL_API_KEY=your-firecrawl-api-key

RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL="DealDrop Alerts <alerts@yourdomain.com>"

CRON_SECRET=some-strong-random-string
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Make sure you also configure the **Auth redirect URL** in Supabase to point to your Next.js callback route (e.g. `/auth/callback`) and enable **Google** provider.

### 3. Database & policies

In Supabase, create the core tables (simplified shapes):

- `products`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references `auth.users.id`)
  - `url` (text)
  - `name` (text)
  - `current_price` (numeric)
  - `currency` (text)
  - `image_url` (text)
  - `created_at`, `updated_at` (timestamp)

- `price_history`
  - `id` (uuid, primary key)
  - `product_id` (uuid, references `products.id`)
  - `price` (numeric)
  - `currency` (text)
  - `checked_at` (timestamp, default `now()`)

Enable **Row Level Security** and add policies so users can only read/write their own rows, for example:

```sql
-- Products: users can view their own products
alter table products enable row level security;

create policy "Users can view their own products"
  on products for select
  using (auth.uid() = user_id);

create policy "Users can insert their own products"
  on products for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own products"
  on products for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own products"
  on products for delete
  using (auth.uid() = user_id);
```

(Adapt these to match your current schema.)

### 4. Run the dev server

```bash
pnpm dev   # or npm run dev / yarn dev
```

Visit `http://localhost:3000` and:

1. Sign in with Google.
2. Paste a product URL into the form.
3. Start tracking and see it appear under “Your Tracked Products”.

---

## 🔄 Cron price checks

The app exposes a route handler (e.g. `/api/cron/price-check`) that:

1. Validates a `Bearer` token header against `CRON_SECRET`.
2. Uses a Supabase **service role** client (RLS bypass) to fetch all products.
3. Calls `scrapeProduct(url)` from the Firecrawl‑based helper.
4. Updates `products.current_price`, inserts into `price_history`, and triggers `sendPriceDropAlert` when `newPrice < oldPrice`.

You can wire this up to:

- **Vercel Cron Jobs**
- **GitHub Actions**
- Any scheduler that can call a URL with a custom header.

Example header:

```http
Authorization: Bearer YOUR_CRON_SECRET
```

---

## ✉️ Price‑drop email alerts

`sendPriceDropAlert` uses **Resend** to send a rich HTML email showing:

- Old price vs new price
- Percentage drop and total savings
- Product image and link
- CTA to view all tracked products

Make sure `RESEND_FROM_EMAIL` is a verified sender/domain in your Resend dashboard.

---

## 📂 Project Structure (high level)

```txt
app/
  page.tsx               # Home page, server component
  action.ts              # Server actions (add product, etc.)
  api/
    cron/
      price-check/route.ts  # Cron route for periodic checks
components/
  AddProductForm.tsx     # Client form, calls addProduct server action
  AuthButton.tsx         # Auth UI
  AuthModal.tsx          # Login modal with Google OAuth
lib/
  firecrawl.ts           # scrapeProduct helper using Firecrawl
  email.ts               # sendPriceDropAlert function
utils/
  supabase/
    client.ts            # Browser client
    server.ts            # SSR/server actions client
```

(Adjust names/paths if your repo differs.)

---

## 🧪 Future Improvements

- Charted price history per product (e.g. using a sparkline or full chart).
- User‑defined target prices for alerts.
- Support for more regional currencies.
- Better error UI for scraper failures and validation.

---

## 🙌 Acknowledgements

Built by **Devraj Singh** as a learning and portfolio project using Next.js, Supabase, Firecrawl, and Resend.  
Contributions, bug reports, and feature ideas are very welcome—feel free to open an issue or PR!
```


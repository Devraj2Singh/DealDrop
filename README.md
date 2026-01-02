
---

## 📁 Tech Stack

- **Next.js (App Router)** — React framework for frontend + SSR  
- **Supabase Auth & Database** — Backend auth + PostgreSQL  
- **Tailwind CSS** — Utility-first styling  
- **shadcn/ui** — UI component library  
- **Lucide Icons** — SVG icons  
- **Recharts** — Charting library

---

## 🧠 Getting Started (Local)

### 1. Clone the repo
```bash
git clone https://github.com/Devraj2Singh/DealDrop.git
cd DealDrop
2. Install Dependencies
bash
Copy code
npm install
# or
yarn install
# or
pnpm install
3. Create Supabase Project
Go to https://app.supabase.com and create a new project.

Grab the following from Supabase dashboard:
✔ NEXT_PUBLIC_SUPABASE_URL
✔ NEXT_PUBLIC_SUPABASE_ANON_KEY

4. Create .env.local
Copy example and paste keys:

ini
Copy code
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
5. Run Dev Server
bash
Copy code
npm run dev
Open http://localhost:3000 in your browser.

🗂 Supabase Setup
Database
Create a table products with fields including id, user_id, price, url, etc.

Enable Row Level Security
sql
Copy code
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
Policies (example)
sql
Copy code
create policy "Users can view their own products"
on public.products
for select
to authenticated
using (auth.uid() = user_id);
📦 Deployment (Vercel)
Go to https://vercel.com/import

Select your GitHub repo (DealDrop)

Add the same env variables from your Supabase project into Vercel:

nginx
Copy code
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Deploy — wait for build to finish

Add Vercel domain to Supabase → Auth Settings → Redirect URLs

🔑 Environment Variables
Key	Description
NEXT_PUBLIC_SUPABASE_URL	Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY	Supabase public anon key

Make sure these are set in both .env.local and Vercel dashboard before deployment.

🧪 Testing
You can test:
✔ User signup / login
✔ Add product
✔ View price history
✔ Remove product
✔ Auth persistence

📌 Notes
Use Supabase policies to secure products per user. 
GitHub

Redirect URLs must be added in Supabase for production domain.

Recharts must be installed (npm install recharts) before deploying.

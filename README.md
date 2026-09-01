# Way2Paisa Public Website

Next.js public property portal connected to the Way2Paisa Supabase database.

## Features
- Live active project listings
- Search by project/developer/location
- BHK and budget filters
- Location explorer
- WhatsApp and email CTAs
- Website enquiry form writing to `public.leads`

## Deploy
1. Copy `.env.local.example` to `.env.local` for local testing.
2. Set `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to the project's publishable key.
3. `npm install && npm run dev`
4. Create a NEW Vercel project named `way2paisa-public` and deploy this folder.
5. Add production environment variables in Vercel.
6. Connect `way2paisa.in` and `www.way2paisa.in` to the new public project.

Keep `admin.way2paisa.in` on the existing Admin project.

Never put a Supabase service-role key in this app.

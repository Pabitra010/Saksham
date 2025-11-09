This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Deploying to Vercel (recommended checklist)

Follow these steps before you deploy to Vercel to ensure Supabase and other integrations work correctly.

1. Environment variables (set these in Vercel dashboard -> Settings -> Environment Variables):

	- NEXT_PUBLIC_SUPABASE_URL — your Supabase project URL (visible to client)
	- NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon/public key (visible to client)
	- NEXT_PUBLIC_SITE_URL — your site URL (used for auth redirects)
	- NOTIFICATION_PHONE_NUMBER — optional phone used by the notification API
	- SUPABASE_SERVICE_ROLE_KEY — (server-only) service role key for privileged server actions; do NOT prefix with NEXT_PUBLIC_ and do NOT expose this to the client
	- (Optional) NEXT_PUBLIC_CHATBASE_KEY or similar if Chatbase requires a public id

	Note: Add vars for Preview and Production environments as needed.

2. Run database migrations in your Supabase project:

	- Open Supabase dashboard -> SQL editor -> run the SQL files in `migrations/` in order.
	- Confirm `public.profiles` and added columns exist (district, vulnerability, emergency_contacts jsonb, share_location, allow_volunteers).
	- Configure Row Level Security (RLS) policies to allow intended client actions and restrict access appropriately.

3. Server key usage guidance:

	- Use `SUPABASE_SERVICE_ROLE_KEY` for server-only, privileged actions (for example, inserting notifications, backfills, or admin-only operations).
	- Use `NEXT_PUBLIC_SUPABASE_ANON_KEY` for client SDK and for server SSR flows that rely on cookie-based auth via `createServerClient`.
	- Never expose the service role key to the browser or commit it to the repo.

4. External scripts & privacy:

	- The project injects a Chatbase embed script at runtime. If your app requires strict Content Security Policy (CSP) or user consent, add the external domain (`https://www.chatbase.co`) to your allowed script sources or implement a user consent gate.

5. Build & Deploy on Vercel:

	- Vercel will run `npm run build` (Next.js) by default; ensure environment variables are configured before deployment.
	- After successful build, review function logs and runtime errors in Vercel dashboard.

6. Post-deploy checks:

	- Test login flow and ensure `auth.user_metadata` updates are visible in Supabase if you use the profile editor.
	- Submit a community support request and verify notifications are stored in `notifications` table and broadcasts succeed (if enabled).

If you want, I can add a `DEPLOY.md` with exact copy-paste steps for Vercel and sample SQL commands to run in Supabase.

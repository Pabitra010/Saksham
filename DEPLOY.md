# Deploying to Vercel (detailed)

This file contains copy-paste steps to deploy this Next.js app to Vercel and to prepare Supabase.

1) Vercel environment variables

Set these in your Vercel project settings (Environment Variables). Mark `SUPABASE_SERVICE_ROLE_KEY` as a secret (do not expose to the client).

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_URL
- NOTIFICATION_PHONE_NUMBER (optional)
- SUPABASE_SERVICE_ROLE_KEY (server-only)
- NEXT_PUBLIC_CHATBASE_KEY (optional)

Example (Vercel UI):

- Key: SUPABASE_SERVICE_ROLE_KEY
- Value: <paste your service_role key>
- Environment: Production (and Preview if desired)

2) Run database migrations in Supabase

Open your Supabase project -> SQL Editor -> New Query and run the SQL files in `migrations/` in order. Example using psql (if you prefer CLI):

```sql
-- Run the two files in order (example)
-- 1) migrations/001_create_profiles.sql
-- 2) migrations/002_add_profiles_columns.sql
```

Verify table exists:

```sql
select column_name, data_type from information_schema.columns
where table_name = 'profiles';
```

3) RLS policies

If you use Row Level Security (RLS), ensure policies allow authenticated users to upsert their own profile row and allow the server (service role) to perform admin operations.

4) Vercel `vercel.json` (optional)

If you need to customize headers (for CSP or other policies), add a `vercel.json` file. This repo contains an example `vercel.json` that allows `chatbase.co` script loading. Review and tighten it to your security requirements before using in production.

5) Deploy

- Push your branch to GitHub.
- In Vercel, import the repo (or link the existing project) and deploy. Vercel will run `npm run build`.

6) Post-deploy checks

- Visit your site and check the auth flow: sign up/sign in and verify `auth.user_metadata` shows updates when editing the profile.
- Open Supabase Table Editor and confirm `profiles` rows are being upserted.
- If you use the notification flow, submit an immediate request and confirm a `notifications` row is created.

If you want, I can also add GitHub Actions or a small script to run migrations automatically using the Supabase CLI.

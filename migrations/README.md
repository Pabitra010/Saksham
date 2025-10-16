Run this migration to create the `profiles` table used by the server API `POST /api/update-profile`.

How to run

1. Supabase SQL editor (recommended):
   - Open your Supabase project, go to `SQL Editor` -> `New Query`.
   - Paste the contents of `migrations/001_create_profiles.sql` and run it.

2. psql / CLI:
   - Connect to your database using psql or any Postgres client and run the SQL file.

Validation

- After running, confirm the table exists in the `Table editor` named `profiles` under `public` schema.
- Run the client "Save" flow in your app and check the API response for `profileUpsertResult`.
  - If the upsert succeeds, the response will contain data and the table will show the row for the user.

Notes

- The migration creates indexes on phone columns and an update trigger to maintain `updated_at`.
- If you prefer a different schema, adjust the SQL and re-run.

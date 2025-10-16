-- Migration: create profiles table
-- Run this in Supabase SQL editor or with psql connected to your project.

CREATE TABLE IF NOT EXISTS public.profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone_primary text,
  phone_secondary text,
  location text,
  gender text,
  age integer,
  blood_group text,
  aadhaar_masked text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Optional: trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();

-- Index for quick lookups by phone
CREATE INDEX IF NOT EXISTS idx_profiles_phone_primary ON public.profiles (phone_primary);
CREATE INDEX IF NOT EXISTS idx_profiles_phone_secondary ON public.profiles (phone_secondary);

-- Grant select/insert/update/delete to authenticated role (optional)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;

-- Example upsert to test
-- INSERT INTO public.profiles (user_id, full_name, phone_primary, location)
-- VALUES ('f059f7da-f6e0-48b4-be2c-993118dd297c', 'Nilanjan mandal', '2525456985', 'red lght Areaa')
-- ON CONFLICT (user_id) DO UPDATE SET
-- full_name = EXCLUDED.full_name,
-- phone_primary = EXCLUDED.phone_primary,
-- location = EXCLUDED.location,
-- updated_at = now();

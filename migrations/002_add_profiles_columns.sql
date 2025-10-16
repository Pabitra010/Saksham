-- Migration: add extra profile columns
-- Run this in Supabase SQL editor or with psql connected to your project.

-- Add columns if they don't already exist
ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS district text,
  ADD COLUMN IF NOT EXISTS vulnerability text,
  ADD COLUMN IF NOT EXISTS emergency_contacts jsonb,
  ADD COLUMN IF NOT EXISTS share_location boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS allow_volunteers boolean DEFAULT false;

-- Optional: index for district for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_district ON public.profiles (district);

-- Optional: index for share_location boolean
CREATE INDEX IF NOT EXISTS idx_profiles_share_location ON public.profiles (share_location);

-- Note: Manage Row Level Security (RLS) policies from the Supabase dashboard to allow
-- users to update only their own profile rows. This migration only alters the schema.

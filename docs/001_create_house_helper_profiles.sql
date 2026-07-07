-- =============================================================================
-- HomeHelp Connect — house_helper_profiles
-- Supabase / PostgreSQL migration script
-- =============================================================================
-- Creates the core table for registered House Help profiles.
-- Run via Supabase Dashboard → SQL Editor, or place in supabase/migrations/.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table: house_helper_profiles
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.house_helper_profiles (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal information
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Female', 'Male', 'Other')),
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 70),

  -- Work information
  years_of_experience TEXT NOT NULL CHECK (
    years_of_experience IN (
      'fresher',
      '1-year',
      '2-year',
      '3-year',
      '4-year',
      '5-year',
      '6-10-years',
      'more-than-10-years'
    )
  ),
  primary_skill TEXT NOT NULL,
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  charges JSONB NOT NULL DEFAULT '{}'::jsonb,
  availability_slots JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- Location
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  community TEXT NOT NULL,

  -- Status flags
  looking_for_work BOOLEAN NOT NULL DEFAULT TRUE,
  phone_verified BOOLEAN NOT NULL DEFAULT FALSE,

  -- Optional media
  profile_photo_url TEXT,

  -- Audit timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Unique constraint: one profile per phone number
  CONSTRAINT house_helper_profiles_phone_key UNIQUE (phone)
);

-- -----------------------------------------------------------------------------
-- Indexes (resident search and admin filtering)
-- -----------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_house_helper_profiles_community
  ON public.house_helper_profiles (community);

CREATE INDEX IF NOT EXISTS idx_house_helper_profiles_area
  ON public.house_helper_profiles (area);

CREATE INDEX IF NOT EXISTS idx_house_helper_profiles_primary_skill
  ON public.house_helper_profiles (primary_skill);

CREATE INDEX IF NOT EXISTS idx_house_helper_profiles_looking_for_work
  ON public.house_helper_profiles (looking_for_work);

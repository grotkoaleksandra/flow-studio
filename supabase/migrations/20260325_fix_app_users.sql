-- Fix app_users table to match auth.js expectations
-- The initial migration used auth_id instead of auth_user_id

-- Rename column if it exists with wrong name
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'app_users' AND column_name = 'auth_id') THEN
    ALTER TABLE app_users RENAME COLUMN auth_id TO auth_user_id;
  END IF;
END $$;

-- Add missing columns
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS person_id UUID;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS is_current_resident BOOLEAN DEFAULT false;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS invited_by UUID;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

-- Drop old role constraint and add updated one
ALTER TABLE app_users DROP CONSTRAINT IF EXISTS app_users_role_check;
ALTER TABLE app_users ADD CONSTRAINT app_users_role_check CHECK (role IN ('admin', 'instructor', 'member', 'public', 'oracle', 'staff'));

-- Remove full_name column if it exists (replaced by display_name)
ALTER TABLE app_users DROP COLUMN IF EXISTS full_name;

-- Create user_invitations if not exists
CREATE TABLE IF NOT EXISTS user_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'revoked')),
  invited_by UUID,
  invited_at TIMESTAMPTZ DEFAULT now(),
  accepted_at TIMESTAMPTZ
);

ALTER TABLE user_invitations ENABLE ROW LEVEL SECURITY;

-- Create payment_methods if not exists
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES app_users(id),
  stripe_payment_method_id TEXT,
  type TEXT,
  last_four TEXT,
  brand TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Policies for new tables (skip if already exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_invitations' AND policyname = 'Authenticated can read invitations') THEN
    CREATE POLICY "Authenticated can read invitations" ON user_invitations FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_invitations' AND policyname = 'Authenticated can manage invitations') THEN
    CREATE POLICY "Authenticated can manage invitations" ON user_invitations FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_methods' AND policyname = 'Users can read own payment methods') THEN
    CREATE POLICY "Users can read own payment methods" ON payment_methods FOR SELECT TO authenticated USING (user_id IN (SELECT id FROM app_users WHERE auth_user_id = auth.uid()));
  END IF;
END $$;

-- Update RLS policies for app_users to use auth_user_id
DROP POLICY IF EXISTS "Users can update own profile" ON app_users;
CREATE POLICY "Users can update own profile" ON app_users FOR UPDATE TO authenticated USING (auth_user_id = auth.uid()) WITH CHECK (auth_user_id = auth.uid());

DROP POLICY IF EXISTS "Authenticated can insert own user" ON app_users;
CREATE POLICY "Authenticated can insert own user" ON app_users FOR INSERT TO authenticated WITH CHECK (auth_user_id = auth.uid());

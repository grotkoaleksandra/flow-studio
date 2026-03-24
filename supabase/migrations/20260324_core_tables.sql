-- Core tables for Flow Studio yoga platform

-- app_users: user profiles and roles
CREATE TABLE IF NOT EXISTS app_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'instructor', 'member', 'public', 'oracle', 'staff')),
  person_id UUID,
  is_current_resident BOOLEAN DEFAULT false,
  invited_by UUID REFERENCES app_users(id),
  last_login_at TIMESTAMPTZ,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read non-archived users"
  ON app_users FOR SELECT USING (NOT is_archived);

CREATE POLICY "Users can update own profile"
  ON app_users FOR UPDATE
  TO authenticated
  USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "Authenticated can insert own user"
  ON app_users FOR INSERT
  TO authenticated
  WITH CHECK (auth_user_id = auth.uid());

-- user_invitations: pre-authorize users by email
CREATE TABLE IF NOT EXISTS user_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'revoked')),
  invited_by UUID REFERENCES app_users(id),
  invited_at TIMESTAMPTZ DEFAULT now(),
  accepted_at TIMESTAMPTZ
);

ALTER TABLE user_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read invitations"
  ON user_invitations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can manage invitations"
  ON user_invitations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- brand_config: site branding and settings
CREATE TABLE IF NOT EXISTS brand_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE brand_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read brand_config"
  ON brand_config FOR SELECT USING (true);

CREATE POLICY "Authenticated can manage brand_config"
  ON brand_config FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- property_config: general app configuration
CREATE TABLE IF NOT EXISTS property_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE property_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read property_config"
  ON property_config FOR SELECT USING (true);

CREATE POLICY "Authenticated can manage property_config"
  ON property_config FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- email_templates: for Resend email notifications
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT,
  body_text TEXT,
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read email_templates"
  ON email_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can manage email_templates"
  ON email_templates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- inbound_emails: received email log
CREATE TABLE IF NOT EXISTS inbound_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_email TEXT,
  to_email TEXT,
  subject TEXT,
  body_text TEXT,
  body_html TEXT,
  raw_payload JSONB,
  processed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE inbound_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read inbound_emails"
  ON inbound_emails FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service can insert inbound_emails"
  ON inbound_emails FOR INSERT
  WITH CHECK (true);

-- stripe_payments: payment records
CREATE TABLE IF NOT EXISTS stripe_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES app_users(id),
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE stripe_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payments"
  ON stripe_payments FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM app_users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Service can manage payments"
  ON stripe_payments FOR ALL
  USING (true)
  WITH CHECK (true);

-- stripe_config: Stripe settings (non-secret)
CREATE TABLE IF NOT EXISTS stripe_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE stripe_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read stripe_config"
  ON stripe_config FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can manage stripe_config"
  ON stripe_config FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ledger: financial transaction log
CREATE TABLE IF NOT EXISTS ledger (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id UUID REFERENCES stripe_payments(id),
  type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read ledger"
  ON ledger FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service can manage ledger"
  ON ledger FOR ALL
  USING (true)
  WITH CHECK (true);

-- payment_methods: saved payment methods
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

CREATE POLICY "Users can read own payment methods"
  ON payment_methods FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM app_users WHERE auth_user_id = auth.uid()));

-- media: uploaded files and images
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  uploaded_by UUID REFERENCES app_users(id),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  bucket TEXT NOT NULL DEFAULT 'media',
  public_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read media"
  ON media FOR SELECT USING (true);

CREATE POLICY "Authenticated can upload media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Auto-update updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_app_users_updated_at BEFORE UPDATE ON app_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brand_config_updated_at BEFORE UPDATE ON brand_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_property_config_updated_at BEFORE UPDATE ON property_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stripe_payments_updated_at BEFORE UPDATE ON stripe_payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT DO NOTHING;

-- Storage policy: public read
CREATE POLICY "Public read media bucket" ON storage.objects FOR SELECT USING (bucket_id = 'media');

-- Storage policy: authenticated upload
CREATE POLICY "Authenticated upload to media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

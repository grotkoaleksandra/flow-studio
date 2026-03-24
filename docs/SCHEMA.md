# Database Schema Reference

> This file is loaded on-demand. Referenced from CLAUDE.md.

## Core Tables

### app_users
User profiles linked to Supabase Auth.
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| auth_user_id | UUID | FK → auth.users, unique |
| email | TEXT | |
| display_name | TEXT | |
| first_name / last_name | TEXT | |
| avatar_url | TEXT | |
| role | TEXT | admin, instructor, member, public, oracle, staff |
| person_id | UUID | |
| is_current_resident | BOOLEAN | |
| invited_by | UUID | FK → app_users |
| last_login_at | TIMESTAMPTZ | |
| is_archived | BOOLEAN | default false |

### user_invitations
Pre-authorize users by email before they sign up.
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| email | TEXT | |
| role | TEXT | default 'member' |
| status | TEXT | pending, accepted, revoked |
| invited_by | UUID | |

### brand_config / property_config
Key-value configuration stores (key TEXT unique, value JSONB).

### page_display_config
Controls tab visibility per section (section, tab_key, tab_label, is_visible, sort_order).

## Email Tables

### email_templates
Notification templates: name (unique), subject, body_html, body_text, variables (JSONB), is_active.

### inbound_emails
Received email log: from_email, to_email, subject, body, raw_payload (JSONB), processed.

## Payment Tables

### stripe_payments
Payment records: user_id (FK), stripe IDs, amount (cents), currency, status, metadata (JSONB).

### stripe_config
Key-value Stripe settings (non-secret).

### ledger
Financial transaction log tied to payments.

### payment_methods
Saved payment methods per user: stripe_payment_method_id, type, last_four, brand, is_default.

## Media

### media
Uploaded files: uploaded_by (FK), file_name, file_path, file_type, file_size, bucket, public_url.

## Storage Buckets
- **media** — public read, authenticated upload

## Common Patterns

- All tables use UUID primary keys
- All tables have `created_at` and `updated_at` timestamps
- RLS is enabled on all tables
- `is_archived` flag for soft deletes (filter client-side)

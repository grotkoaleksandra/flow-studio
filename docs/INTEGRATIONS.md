# External Services & Integrations

> This file is loaded on-demand. Referenced from CLAUDE.md.

## API Cost Accounting (REQUIRED)

**Every feature that makes external API calls MUST log usage for cost tracking.**

When building or modifying any feature that calls a paid API, instrument it to log each API call with its cost data.

## Configured Services

### Email (Resend) — Active
- API key stored as Supabase secret: `RESEND_API_KEY`
- Verified domain: `spankysandwiches.com`
- Default from: `Flow Studio <noreply@spankysandwiches.com>`
- Edge functions: `send-email` (authenticated), `resend-inbound-webhook` (no JWT)
- Free tier: 3,000 emails/month

### Payments + ACH (Stripe) — Pending Setup
- Config in `stripe_config` table
- Edge function: `stripe-webhook` (deploy with `--no-verify-jwt`)
- ACH: 0.8% capped at $5; Cards: 2.9% + 30c

### Google Sign-In — Pending Setup
- Redirect URI: `https://wznrlttbpcfkrtierfjf.supabase.co/auth/v1/callback`
- Google Cloud project: flowstudio-491312

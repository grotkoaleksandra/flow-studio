import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY")!;
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Minimal Stripe signature verification
async function verifyStripeSignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const parts = signature.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2);
  const sig = parts.find((p) => p.startsWith("v1="))?.slice(3);
  if (!timestamp || !sig) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expected = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const expectedHex = Array.from(new Uint8Array(expected))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expectedHex === sig;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200 });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing stripe-signature header" }), { status: 400 });
    }

    if (STRIPE_WEBHOOK_SECRET) {
      const valid = await verifyStripeSignature(body, signature, STRIPE_WEBHOOK_SECRET);
      if (!valid) {
        return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
      }
    }

    const event = JSON.parse(body);
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        await supabase.from("stripe_payments").upsert({
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent,
          amount: session.amount_total,
          currency: session.currency,
          status: "completed",
          metadata: { customer_email: session.customer_details?.email },
        }, { onConflict: "stripe_checkout_session_id" });
        break;
      }

      case "payment_intent.succeeded": {
        const intent = event.data.object;
        await supabase.from("stripe_payments").upsert({
          stripe_payment_intent_id: intent.id,
          amount: intent.amount,
          currency: intent.currency,
          status: "succeeded",
          metadata: intent.metadata || {},
        }, { onConflict: "stripe_payment_intent_id" });
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object;
        await supabase.from("stripe_payments").upsert({
          stripe_payment_intent_id: intent.id,
          amount: intent.amount,
          currency: intent.currency,
          status: "failed",
          description: intent.last_payment_error?.message,
          metadata: intent.metadata || {},
        }, { onConflict: "stripe_payment_intent_id" });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});

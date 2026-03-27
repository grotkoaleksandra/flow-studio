import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Verify authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { line_items, success_url, cancel_url, mode } = await req.json();

    if (!line_items || !success_url) {
      return new Response(JSON.stringify({ error: "Missing required fields: line_items, success_url" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Stripe Checkout session
    const params = new URLSearchParams();
    params.append("mode", mode || "payment");
    params.append("success_url", success_url);
    params.append("cancel_url", cancel_url || success_url);
    params.append("customer_email", user.email || "");

    line_items.forEach((item: { price_data?: { currency: string; product_data: { name: string }; unit_amount: number }; price?: string; quantity: number }, i: number) => {
      if (item.price_data) {
        params.append(`line_items[${i}][price_data][currency]`, item.price_data.currency || "pln");
        params.append(`line_items[${i}][price_data][product_data][name]`, item.price_data.product_data.name);
        params.append(`line_items[${i}][price_data][unit_amount]`, String(item.price_data.unit_amount));
      } else if (item.price) {
        params.append(`line_items[${i}][price]`, item.price);
      }
      params.append(`line_items[${i}][quantity]`, String(item.quantity || 1));
    });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(STRIPE_SECRET_KEY + ":")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: session.error?.message || "Stripe error" }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Record payment in DB
    await supabase.from("stripe_payments").insert({
      stripe_checkout_session_id: session.id,
      amount: session.amount_total || 0,
      currency: session.currency || "pln",
      status: "pending",
      metadata: { checkout_url: session.url },
    });

    return new Response(JSON.stringify({ url: session.url, session_id: session.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

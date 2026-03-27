import { createClient } from "@supabase/supabase-js";

// These values are set during infrastructure setup (/setup-alpacapps-infra)
const SUPABASE_URL = "https://wznrlttbpcfkrtierfjf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bnJsdHRicGNma3J0aWVyZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNzYwMzAsImV4cCI6MjA4OTk1MjAzMH0.AOYCUVVfmgrMSksILOYGrEAB4U4apyUhCq_KsUhSMp8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

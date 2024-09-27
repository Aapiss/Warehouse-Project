import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://arhqdstuioabzeolisnj.supabase.co";
const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaHFkc3R1aW9hYnplb2xpc25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTEyMTksImV4cCI6MjA0MDM4NzIxOX0.PP4tFZRqmiXOiYlN5CFmIzi5TNWeSLQsQPDPIAK1-h4";

export const supabase = createClient(supabase_url, supabase_key);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://auuefpvbwcnltljskcyu.supabase.co"; // Supabase URL
const supabaseAnonKey = "sb_publishable_V0m51V4fMj1RrQzj1EvSXw_KmPDE52y"; // Publishable key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pquidpnwohzbjcwhaqnr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdWlkcG53b2h6Ympjd2hhcW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDM5NjUsImV4cCI6MjA1MDE3OTk2NX0.LFi1X9Z0Cbr-sqU2fgSSEplwwysY3aqo6osh_M_SVrQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
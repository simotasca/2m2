import { createClient } from "@supabase/supabase-js";
import { Database } from "../shared/supabase";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error(
    "Error creating service role supabase client: env variable NEXT_PUBLIC_SUPABASE_URL not defined"
  );
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Error creating service role supabase client: env variable SUPABASE_SERVICE_ROLE_KEY not defined"
  );
}

const serviceRoleSupabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default serviceRoleSupabase;

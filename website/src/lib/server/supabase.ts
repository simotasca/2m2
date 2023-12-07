import { createClient } from "@supabase/supabase-js";
import { Database } from "../shared/supabase";
import { chechEnvVariable } from "../shared/env";

chechEnvVariable(
  "NEXT_PUBLIC_SUPABASE_URL",
  "Error creating service role supabase client"
);
chechEnvVariable(
  "SUPABASE_SERVICE_ROLE_KEY",
  "Error creating service role supabase client"
);

const serviceRoleSupabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default serviceRoleSupabase;

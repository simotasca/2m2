import { createClient } from "@supabase/supabase-js";
import { cookies as nextCookies } from "next/headers";
import { checkEnvVariable } from "../shared/env";
import { Database, StorageAdapter } from "../shared/supabase";

checkEnvVariable(
  [
    "INTERNAL_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_HOST_FIX",
  ],
  "Error creating server side supabase client"
);

export const serviceRoleSupabase = createClient<Database>(
  process.env.INTERNAL_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type ServerStorageContext = { cookies: () => ReturnType<typeof nextCookies> };

class ServerStorageAdapter implements StorageAdapter {
  constructor(private readonly context: ServerStorageContext) {}

  // TODO: THIS IS BAD!!!
  getItem(key: string) {
    key = key.replace("kong", process.env.SUPABASE_HOST_FIX!);
    let val = this.context.cookies().get(key)?.value;
    return val ? JSON.parse(val) : null;
  }

  setItem(key: string, value: string) {
    this.context.cookies().set(key, JSON.stringify(value), {
      httpOnly: false,
    });
  }

  removeItem(key: string) {
    this.context.cookies().delete(key);
  }
}

export function createServerSideClient({ cookies }: ServerStorageContext) {
  return createClient<Database>(process.env.INTERNAL_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      storage: new ServerStorageAdapter({ cookies }),
    },
  });
}

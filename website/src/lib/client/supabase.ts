import { parse, serialize } from "cookie";
import { Database, StorageAdapter } from "../shared/supabase";
import { createClient } from "@supabase/supabase-js";

function isBrowser() {
  return (
    typeof window !== "undefined" && typeof window.document !== "undefined"
  );
}

class ClientStorageAdapter implements StorageAdapter {
  getItem(key: string) {
    if (!isBrowser()) return null;

    const cookies = parse(document.cookie);
    let val = cookies[key];
    return val ? JSON.parse(cookies[key]) : null;
  }

  setItem(key: string, value: string) {
    if (!isBrowser()) return;

    document.cookie = serialize(key, JSON.stringify(value), {
      httpOnly: false,
    });
  }

  removeItem(key: string) {
    if (!isBrowser()) return;

    document.cookie = serialize(key, "", {
      maxAge: 0,
      httpOnly: false,
    });
  }
}

const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  {
    auth: {
      storage: new ClientStorageAdapter(),
    },
  }
);

/** always singleton */
export function createClientSideClient() {
  return supabaseClient;
}

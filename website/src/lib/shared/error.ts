import { AuthError, PostgrestError } from "@supabase/supabase-js";

export function handleSupaError(
  error: PostgrestError | AuthError | null,
  ...msg: string[]
) {
  if (error) {
    throw new Error(msg.join(" ") + ": " + error.message);
  }
}

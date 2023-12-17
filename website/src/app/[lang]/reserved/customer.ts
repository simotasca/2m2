import type { Tables } from "@/lib/shared/supabase";

export type Customer =
  | null
  | Tables<"customer_private">
  | Tables<"customer_business">;

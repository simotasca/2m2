export * from "@/database.types";
import type { Database } from "@/database.types";
import { GoTrueClientOptions } from "@supabase/supabase-js";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type StorageAdapter = Exclude<GoTrueClientOptions["storage"], undefined>;

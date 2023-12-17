import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../shared/supabase";

export async function getFavourites(supabase: SupabaseClient<Database>) {
  return supabase
    .from("favourites")
    .select("*")
    .then(({ data }) => {
      return data?.map((f) => f.id_product) || [];
    });
}

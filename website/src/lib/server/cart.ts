import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Database } from "../shared/supabase";

export async function getCart(supabase: SupabaseClient<Database>) {
  const isLogged = !!(await supabase.auth.getSession()).data.session?.user;

  const result: { id?: number; products: string[] } = {
    products: [],
  };

  let ecodatArticleIds: string[] = [];

  // cookies cart
  const c = cookies().get("cart");
  if (c) {
    ecodatArticleIds = c.value.split("_");
  }

  if (isLogged) {
    // database cart
    const { data: cart, error } = await supabase
      .from("cart")
      .select("*, cart_products(*)")
      .single();
    if (error) {
      console.error(
        error,
        "Error fetching cart with cart_products for logged user"
      );
    } else {
      result.id = cart?.id;
      ecodatArticleIds = cart?.cart_products.map((p) => p.id_product) || [];
    }
  }
  result.products = ecodatArticleIds;
  return result;
}

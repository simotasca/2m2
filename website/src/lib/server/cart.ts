import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../shared/supabase";
import { EcodatArticle } from "../shared/ecodat";
import { handleSupaError } from "../shared/error";
import { cookies } from "next/headers";
import { fetchEcodatArticle } from "./ecodat";

export async function getCart(supabase: SupabaseClient<Database>) {
  const isLogged = !!(await supabase.auth.getUser()).data.user;

  const result: { id?: number; products: EcodatArticle[] } = {
    products: [],
  };

  let ecodatArticleIds: string[] = [];
  if (isLogged) {
    // database cart
    const { data: cart, error } = await supabase
      .from("cart")
      .select("*, cart_products(*)")
      .single();
    if (error) {
      handleSupaError(
        error,
        "Error fetching cart with cart_products for logged user"
      );
    }
    result.id = cart?.id;
    ecodatArticleIds = cart?.cart_products.map((p) => p.id_product) || [];
  } else {
    // cookies cart
    const c = cookies().get("cart");
    if (c) {
      ecodatArticleIds = c.value.split("_");
    }
  }

  for (const id of ecodatArticleIds) {
    // TODO: ask ecodat for one call api
    const article = await fetchEcodatArticle(id);
    // TODO: if not found remove from cart
    article && result.products.push(article);
  }

  return result;
}

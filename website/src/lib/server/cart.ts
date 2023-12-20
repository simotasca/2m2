import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { EcodatArticle } from "../shared/ecodat";
import { handleSupaError } from "../shared/error";
import { Database } from "../shared/supabase";
import { fetchEcodatArticle } from "./ecodat";

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

export async function _getCart(supabase: SupabaseClient<Database>) {
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

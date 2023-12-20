import { Database } from "@/database.types";
import { getCart } from "@/lib/server/cart";
import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { EcodatArticle } from "@/lib/shared/ecodat";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const cart = await getCart(supabase);

  let products: EcodatArticle[] = [];
  for (const id of cart.products) {
    const p = await fetchEcodatArticle(id).catch((e) => {
      console.error(
        "ERROR: getting cart, could not fetch article " + id + ":",
        e.message
      );
      return null;
    });
    p && products.push(p);
  }

  return new Response(JSON.stringify({ id: cart.id, products }), {
    status: 200,
  });
}

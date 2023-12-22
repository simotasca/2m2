import { Database } from "@/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const customer = (await supabase.auth.getUser()).data.user;

  if (!!customer?.id) {
    console.log("DELETE LOGGEDE CART", customer.id);
    const { cart, cartError } = await supabase
      .from("cart")
      .select()
      .eq("customer_id", customer.id)
      .then(({ data, error }) => ({ cart: data?.at(0), cartError: error }));

    if (cartError) {
      console.error(
        "ERROR: could not retrieve customer cart:",
        cartError.message
      );
      return new Response(cartError.message, { status: 500 });
    }

    if (!cart) {
      return new Response("cart not found", { status: 400 });
    }

    const { error } = await supabase
      .from("cart_products")
      .delete()
      .eq("id_cart", cart?.id);

    if (error) {
      console.error("ERROR: could not delete customer cart:", error.message);
      return new Response(error.message, { status: 500 });
    }
  } else {
    console.log("DELETE COOKIE CART", cookies().get("cart"));
    cookies().delete("cart");
  }

  console.log("DELEtEDDDD");

  return new Response("ok", { status: 200 });
}

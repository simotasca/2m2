import { Database } from "@/database.types";
import { getCart } from "@/lib/server/cart";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  console.log("CARTT");
  const supabase = createServerComponentClient<Database>({ cookies });
  const cart = await getCart(supabase);
  console.log("cart reload?", cart);
  return new Response(JSON.stringify(cart), { status: 200 });
}

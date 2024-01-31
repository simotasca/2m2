"use server";

import { getCart } from "@/lib/server/cart";
import { getFavourites } from "@/lib/server/favourites";
import { createServerSideClient } from "@/lib/server/supabase";
import { cookies } from "next/headers";

export async function getServerData() {
  const supabase = createServerSideClient({ cookies: cookies });
  const cart = await getCart(supabase);
  const favs = await getFavourites(supabase);
  return { cart, favs };
}

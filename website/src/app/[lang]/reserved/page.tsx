"use server";

import TopBar from "@/components/header/TopBar";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { getCart } from "@/lib/server/cart";
import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { getFavourites } from "@/lib/server/favourites";
import { generateTranslations } from "@/lib/server/lang";
import { createServerSideClient } from "@/lib/server/supabase";
import { EcodatArticle } from "@/lib/shared/ecodat";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "./Header";
import ReservedClientPage from "./ReservedClientPage";
import "./box.css";
import { Customer } from "./customer";
import FavouritesProvider from "@/context/favourites/FavouritesContext";
import AuthProvider from "@/context/auth/AuthContext";
import CartProvider from "@/context/cart/CartProvider";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reserved Area | 2M2",
    robots: { index: false },
  };
}

export default async function ReservedPage() {
  const supabase = createServerSideClient({ cookies });

  const user = await supabase.auth.getUser().then(({ data }) => data.user);

  if (!user) redirect("/login");

  // const { data: customer } = await supabase.from("customers").select().single();
  let customer: Customer = null;
  if (user.user_metadata.type === "business") {
    // TODO: handle error
    customer = await supabase
      .from("customer_business")
      .select()
      .single()
      .then(({ data }) => data);
  } else {
    customer = await supabase
      // TODO: handle error
      .from("customer_private")
      .select()
      .single()
      .then(({ data }) => data);
  }

  const cart = await getCart(supabase);
  const favs = await getFavourites(supabase);
  const favouriteProducts: EcodatArticle[] = [];
  for (const id of favs) {
    let prod = await fetchEcodatArticle(id).catch(() => null);
    prod && prod.available && favouriteProducts.push(prod);
  }

  const [translations] = await generateTranslations({
    product: "misc/product",
  });

  return (
    <TranslationClientComponent value={translations}>
      <AuthProvider>
        <CartProvider cartId={cart.id} cartProductIds={cart.products}>
          <FavouritesProvider initialFavourites={favs}>
            <TopBar />
            <Header user={user} />
            <ReservedClientPage
              cart={cart}
              favourites={favouriteProducts}
              user={user}
              type={user.user_metadata.type}
              customer={customer}
            />
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </TranslationClientComponent>
  );
}

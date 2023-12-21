import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { getCart } from "@/lib/server/cart";
import { getFavourites } from "@/lib/server/favourites";
import { createServerSideClient } from "@/lib/server/supabase";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import ClientLayout from "./ClientLayout";

type Props = PropsWithChildren<{
  translations?: any;
}>;

export default async function ServerLayout({ children, translations }: Props) {
  const supabase = createServerSideClient({ cookies: cookies });
  const cart = await getCart(supabase);
  const favs = await getFavourites(supabase);

  return (
    <>
      <TranslationClientComponent value={translations}>
        <ClientLayout cart={cart} favourites={favs}>
          {children}
        </ClientLayout>
      </TranslationClientComponent>
    </>
  );
}

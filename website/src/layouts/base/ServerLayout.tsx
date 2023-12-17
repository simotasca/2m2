import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { Database } from "@/database.types";
import { getCart } from "@/lib/server/cart";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import ClientLayout from "./ClientLayout";
import { getFavourites } from "@/lib/server/favourites";

type Props = PropsWithChildren<{
  translations?: any;
}>;

export default async function ServerLayout({ children, translations }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies: cookies });
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

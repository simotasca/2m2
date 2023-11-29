import TranslationClientProvider from "@/context/lang/TranslationClientProvider";
import { Database } from "@/database.types";
import { getCart } from "@/lib/server/cart";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import ClientLayout from "./ClientLayout";

type Props = PropsWithChildren<{
  translations?: {
    [key: string]: string;
  };
}>;

export default async function ServerLayout({ children, translations }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies: cookies });
  const cart = await getCart(supabase);

  translations = translations ?? {};

  return (
    <>
      <TranslationClientProvider
        id={{ ...translations, header: "misc/header" }}>
        <ClientLayout cart={cart}>{children}</ClientLayout>
      </TranslationClientProvider>
    </>
  );
}

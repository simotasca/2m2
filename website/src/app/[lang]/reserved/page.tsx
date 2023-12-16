"use server";

import TopBar from "@/components/header/TopBar";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { Database } from "@/database.types";
import { getCart } from "@/lib/server/cart";
import { generateTranslations } from "@/lib/server/lang";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "./Header";
import ReservedClientPage from "./ReservedClientPage";
import "./box.css";

export default async function ReservedPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const user = await supabase.auth.getUser().then(({ data }) => data.user);

  if (!user) redirect("/login");

  const { data: customer } = await supabase.from("customers").select().single();

  const cart = await getCart(supabase);

  const [translations] = await generateTranslations({
    product: "misc/product",
  });

  return (
    <TranslationClientComponent value={translations}>
      <TopBar />
      <Header user={user} />
      <ReservedClientPage cart={cart} />
    </TranslationClientComponent>
  );
}

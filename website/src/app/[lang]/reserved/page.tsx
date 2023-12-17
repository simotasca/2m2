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
import { Customer } from "./customer";

export default async function ReservedPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

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

  const [translations] = await generateTranslations({
    product: "misc/product",
  });

  return (
    <TranslationClientComponent value={translations}>
      <TopBar />
      <Header user={user} />
      <ReservedClientPage
        cart={cart}
        user={user}
        type={user.user_metadata.type}
        customer={customer}
      />
    </TranslationClientComponent>
  );
}

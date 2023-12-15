"use server";

import TopBar from "@/components/header/TopBar";
import { Database } from "@/database.types";
import { getCart } from "@/lib/server/cart";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "./Header";
import ReservedClientPage from "./ReservedClientPage";
import "./box.css";
import TranslationClientProvider from "@/context/lang/TranslationClientProvider";

const translations = {};

export default async function ReservedPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const user = await supabase.auth.getUser().then(({ data }) => data.user);

  if (!user) redirect("/login");

  const { data: customer } = await supabase.from("customers").select().single();

  const cart = await getCart(supabase);

  return (
    <TranslationClientProvider id={translations}>
      <TopBar />
      <Header user={user} />
      <ReservedClientPage cart={cart} />
    </TranslationClientProvider>
  );
}

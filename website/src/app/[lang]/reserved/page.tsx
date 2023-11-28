"use server";

import DemoWrapper from "@/components/DemoWrapper";
import { Database } from "@/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutForm from "./LogoutForm";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

export default async function ReservedPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase.from("customers").select().single();

  return (
    <MaxWidthContainer className="text-white p-8 flex flex-col items-center">
      <h3 className="text-2xl font-bold">reserved area</h3>
      <b>({user?.email})</b>
      <LogoutForm />
      <div className="h-4"></div>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </MaxWidthContainer>
  );
}

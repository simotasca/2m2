import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LoginForm from "./LoginForm";
import { Database } from "@/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/reserved");

  return <LoginForm />;
}

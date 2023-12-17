import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { Database } from "@/database.types";
import { generateTranslations } from "@/lib/server/lang";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/reserved");

  const [translations] = await generateTranslations({
    auth: "auth",
  });

  return (
    <TranslationClientComponent value={translations}>
      <LoginForm />
    </TranslationClientComponent>
  );
}

import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import { createServerSideClient } from "@/lib/server/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login | 2M2",
    robots: { index: false },
  };
}

export default async function LoginPage() {
  const supabase = createServerSideClient({ cookies });

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

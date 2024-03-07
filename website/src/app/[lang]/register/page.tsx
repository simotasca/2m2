import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import RegisterForm from "./RegisterForm";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Registration | 2M2",
    robots: { index: false },
  };
}

export default async function RegisterPage() {
  const [translations] = await generateTranslations({
    auth: "auth",
    errors: "misc/errors",
  });

  return (
    <TranslationClientComponent value={translations}>
      <RegisterForm />
    </TranslationClientComponent>
  );
}

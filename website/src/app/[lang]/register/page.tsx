import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import RegisterForm from "./RegisterForm";

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

import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import ErrorClientPage from "./ErrorClientPage";

export default async function ServerErrorPage() {
  const [translations] = await generateTranslations({});

  return (
    <TranslationClientComponent value={translations}>
      <ErrorClientPage />
    </TranslationClientComponent>
  );
}

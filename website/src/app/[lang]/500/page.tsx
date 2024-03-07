import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import ErrorClientPage from "./ErrorClientPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Internal Server Error | 2M2",
    robots: { index: false },
  };
}

export default async function ServerErrorPage() {
  const [translations] = await generateTranslations({});

  return (
    <TranslationClientComponent value={translations}>
      <ErrorClientPage />
    </TranslationClientComponent>
  );
}

import { TranslationClientProvider } from "@/context/lang/server";
import ErrorClientPage from "./ErrorClientPage";

export default async function ServerErrorPage() {
  const translations = {};

  return (
    <TranslationClientProvider id={translations}>
      <ErrorClientPage />
    </TranslationClientProvider>
  );
}

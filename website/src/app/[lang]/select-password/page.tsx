import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import { SelectNewPassword } from "./SelectNewPassword";

interface Props {
  searchParams: any;
}

export default async function SelectPasswordPage({ searchParams }: Props) {
  const [translations] = await generateTranslations({
    auth: "auth",
  });

  return (
    <TranslationClientComponent value={translations}>
      <SelectNewPassword />
    </TranslationClientComponent>
  );
}

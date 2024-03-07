import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import { SelectNewPassword } from "./SelectNewPassword";
import { Metadata } from "next";

interface Props {
  searchParams: any;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Change Password | 2M2",
    robots: { index: false },
  };
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

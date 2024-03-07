import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import { SendResetPassword } from "./SendResetPassword";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reset Password | 2M2",
    robots: { index: false },
  };
}

export default async function ResetPassword({ searchParams }) {
  const [translations] = await generateTranslations({
    auth: "auth",
  });

  return (
    <TranslationClientComponent value={translations}>
      <SendResetPassword />
    </TranslationClientComponent>
  );
}

import { getCurrentLang, getServerTranslation } from "@/lib/server/lang";
import { PropsWithChildren } from "react";
import TranslationClientComponent from "./TranslationClientComponent";

type Props = PropsWithChildren<{ id: { [key: string]: string } | string }>;

export default async function TranslationClientProvider({
  id,
  children,
}: Props) {
  let value: any = {};

  if (typeof id === "string") {
    value = await getServerTranslation(id);
  } else {
    for (const key of Object.keys(id)) {
      value[key] = await getServerTranslation(id[key]);
    }
  }

  value.currentLang = getCurrentLang();

  return (
    <TranslationClientComponent value={value}>
      {children}
    </TranslationClientComponent>
  );
}

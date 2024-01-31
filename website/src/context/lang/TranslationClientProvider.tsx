import { PropsWithChildren } from "react";
import TranslationClientComponent from "./TranslationClientComponent";

type Props = PropsWithChildren<{
  /** Obtained with generateTranslations */
  translations: any;
}>;

export default async function TranslationClientProvider({
  translations,
  children,
}: Props) {
  return (
    <TranslationClientComponent value={translations}>
      {children}
    </TranslationClientComponent>
  );
}

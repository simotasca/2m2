import Header from "@/components/header/Header";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  headerExtension?: React.ReactNode;
  headerSmall?: boolean;
}>;

/**
 * This layout is made to be used inside the base server layout!
 * Otherwise it must be inside a TranslationProvider with header and footer translations
 */
export default function ({
  children,
  headerExtension,
  headerSmall = false,
}: Props) {
  return (
    <>
      <Header small={headerSmall} extension={headerExtension} />

      {children}

      <footer>
        <div className="text-white p-10 text-center">FOOTER</div>
      </footer>
    </>
  );
}

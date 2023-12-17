import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";
import { SelectNewPassword } from "./SelectNewPassword";
import { SendResetPassword } from "./SendResetPassword";

export default async function ResetPassword({ searchParams }) {
  // if(searchParams.error) {
  //   // error=unauthorized_client
  //   // error_code=401
  //   // error_description=Email+link+is+invalid+or+has+expired
  //   return <ErrorSoRetry />
  // }

  const [translations] = await generateTranslations({
    auth: "auth",
  });

  return (
    <TranslationClientComponent value={translations}>
      {searchParams.code ? <SelectNewPassword /> : <SendResetPassword />}
    </TranslationClientComponent>
  );
}

import TranslationClientProvider from "@/context/lang/TranslationClientProvider";
import { SelectNewPassword } from "./SelectNewPassword";
import { SendResetPassword } from "./SendResetPassword";

const translations = {};

export default async function ResetPassword({ searchParams }) {
  // if(searchParams.error) {
  //   // error=unauthorized_client
  //   // error_code=401
  //   // error_description=Email+link+is+invalid+or+has+expired
  //   return <ErrorSoRetry />
  // }

  return (
    <TranslationClientProvider id={translations}>
      {searchParams.code ? <SelectNewPassword /> : <SendResetPassword />}
    </TranslationClientProvider>
  );
}

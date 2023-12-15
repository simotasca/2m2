import { SelectNewPassword } from "./SelectNewPassword";
import { SendResetPassword } from "./SendResetPassword";

export default async function ResetPassword({ searchParams }) {
  // if(searchParams.error) {
  //   // error=unauthorized_client
  //   // error_code=401
  //   // error_description=Email+link+is+invalid+or+has+expired
  //   return <ErrorSoRetry />
  // }

  return searchParams.code ? <SelectNewPassword /> : <SendResetPassword />;
}

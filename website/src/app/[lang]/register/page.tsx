import TranslationClientProvider from "@/context/lang/TranslationClientProvider";
import RegisterForm from "./RegisterForm";

const translations = {};

export default function RegisterPage() {
  return (
    <TranslationClientProvider id={translations}>
      <RegisterForm />
    </TranslationClientProvider>
  );
}

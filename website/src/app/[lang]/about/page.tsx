import ServerLayout from "@/layouts/base/ServerLayout";
import AboutClientPage from "./AboutClientPage";

const translations = {};

export default async function AboutPage() {
  return (
    <ServerLayout translations={translations}>
      <AboutClientPage />
    </ServerLayout>
  );
}

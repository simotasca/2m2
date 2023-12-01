import ServerLayout from "@/layouts/base/ServerLayout";
import ClientPage from "./ClientPage";

export default async function AboutPage() {
  return (
    <ServerLayout>
      <ClientPage />
    </ServerLayout>
  );
}

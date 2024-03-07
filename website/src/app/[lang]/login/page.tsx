import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations, getCurrentLang } from "@/lib/server/lang";
import { createServerSideClient } from "@/lib/server/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { Metadata } from "next";
import i18n from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Login | 2M2 Autoricambi";
  
  const description = "Login 2m2 autoricambi";
  const lang = getCurrentLang();
  const ogImage = "/opengraph.jpg";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_HOST!),
    title: title,
    description: description,
    applicationName: "2M2 autoricambi",
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title: title,
      description: description,
      url: "/",
      siteName: "Next.js",
      images: [ogImage],
      locale: i18n.values.get(lang),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage], // Must be an absolute URL
    },
  };
}

export default async function LoginPage() {
  const supabase = createServerSideClient({ cookies });

  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/reserved");

  const [translations] = await generateTranslations({
    auth: "auth",
  });

  return (
    <TranslationClientComponent value={translations}>
      <LoginForm />
    </TranslationClientComponent>
  );
}

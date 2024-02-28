import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import { generateTranslations } from "@/lib/server/lang";

async function NotFoundPage() {
  const [translations] = await generateTranslations({
    header: "misc/header",
    "mobile-panel": "misc/mobile-panel",
    search: "misc/search",
    footer: "misc/footer",
    contacts: "misc/contacts",
    auth: "auth",
  });

  return (
    <TranslationClientComponent value={translations}>
      <Header small />

      <div className="grid place-items-center bg-white h-[60vh]">
        <div className="pb-10">
          <h1 className="text-4xl font-bold text-neutral-800">
            Page not found!
          </h1>
          <a className="text-red-600 underline" href="/">
            back to home
          </a>
        </div>
      </div>

      <Footer />
    </TranslationClientComponent>
  );
}

export default NotFoundPage;

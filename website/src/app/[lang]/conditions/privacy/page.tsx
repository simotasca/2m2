import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import { generateTranslations } from "@/lib/server/lang";

export default async function CookiePolicy() {
  const [translations] = await generateTranslations(
    {
      page: "pages/conditions/cookie-policy",
      header: "misc/header",
      search: "misc/search",
      footer: "misc/footer",
      contacts: "misc/contacts",

      auth: "auth",
    },
    true
  );

  return (
    <ServerLayout translations={translations}>
      <PageLayout headerSmall={true}>
        <section className="bg-[#363636]">
          <MaxWidthContainer>
            <div className="px-24 py-14 bg-neutral-100 h-full">
              <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

              <p className="mb-3">Ultimo Aggiornamento: 18/12/2023</p>

              <p className="mb-6">
                Benvenuto su 2M2 Ricambi. Questa Privacy Policy fornisce
                informazioni dettagliate su come raccogliamo, utilizziamo e
                proteggiamo le informazioni personali che ci fornisci.
              </p>

              <h2 className="text-2xl mb-3">1. Informazioni Raccolte</h2>
              <p className="">Raccogliamo le seguenti informazioni:</p>

              <ul className="list-disc ml-6 mb-6">
                <li>
                  Informazioni personali fornite volontariamente dagli utenti
                  durante la registrazione o il completamento di un ordine.
                </li>
                <li>
                  Dati di navigazione e utilizzo del sito tramite cookie e
                  tecnologie simili.
                </li>
              </ul>

              <h2 className="text-2xl mb-3">2. Utilizzo delle Informazioni</h2>
              <p className="">
                Le informazioni raccolte vengono utilizzate per:
              </p>

              <ul className="list-disc ml-6 mb-6">
                <li>Elaborare gli ordini e fornire i servizi richiesti.</li>
                <li>
                  Personalizzare l'esperienza dell'utente e migliorare i nostri
                  servizi.
                </li>
                <li>
                  Comunicare informazioni sulle promozioni, offerte speciali o
                  modifiche ai nostri servizi.
                </li>
                <li>Rispettare obblighi legali.</li>
              </ul>

              <h2 className="text-2xl mb-3">
                3. Condivisione delle Informazioni
              </h2>
              <p className="mb-6">
                Le informazioni personali non verranno vendute, scambiate o
                trasferite a terzi senza il consenso dell'utente, ad eccezione
                di quanto necessario per fornire i servizi richiesti (ad
                esempio, il processamento degli ordini).
              </p>

              <h2 className="text-2xl mb-3">4. Sicurezza delle Informazioni</h2>
              <p className="mb-6">
                Implementiamo misure di sicurezza per proteggere le informazioni
                personali degli utenti. Tuttavia, nessun sistema di trasmissione
                o archiviazione dati è completamente sicuro.
              </p>

              <h2 className="text-2xl mb-3">5. Cookie e Tecnologie Simili</h2>
              <p className="mb-6">
                Utilizziamo cookie e tecnologie simili per migliorare
                l'esperienza dell'utente. L'utente può gestire le preferenze sui
                cookie attraverso le impostazioni del browser.
              </p>

              <h2 className="text-2xl mb-3">6. Link a Terze Parti</h2>
              <p className="mb-6">
                Il nostro sito può contenere link a siti di terze parti. Non
                siamo responsabili per le pratiche sulla privacy di tali siti e
                consigliamo agli utenti di leggere le loro politiche sulla
                privacy.
              </p>

              <h2 className="text-2xl mb-3">
                7. Modifiche alla Privacy Policy
              </h2>
              <p className="mb-6">
                Ci riserviamo il diritto di apportare modifiche a questa Privacy
                Policy. Le modifiche saranno pubblicate sul sito e diventeranno
                effettive dalla data di pubblicazione.
              </p>

              <h2 className="text-2xl mb-3">8. Consenso</h2>
              <p className="mb-6">
                Utilizzando il nostro sito, l'utente acconsente a questa Privacy
                Policy.
              </p>

              <p className="mb-3">Grazie per aver scelto 2M2 Ricambi!</p>
            </div>
          </MaxWidthContainer>
        </section>
      </PageLayout>
    </ServerLayout>
  );
}

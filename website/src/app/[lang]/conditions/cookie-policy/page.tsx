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
              <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

              <p className="mb-3">Ultimo Aggiornamento: 18/12/2023</p>

              <p className="mb-6">
                Benvenuto su 2M2 Ricambi. Questo sito utilizza i cookie e
                tecnologie simili per garantire un'esperienza utente ottimale.
                Questa Cookie Policy fornisce informazioni dettagliate su come
                utilizziamo i cookie e come è possibile gestire le proprie
                preferenze.
              </p>

              <h2 className="text-2xl mb-3">1. Cosa sono i Cookie?</h2>
              <p className="mb-6">
                I cookie sono piccoli file di testo che vengono memorizzati sul
                tuo dispositivo quando visiti un sito web. Sono ampiamente
                utilizzati per rendere più efficiente l'esperienza di
                navigazione e per fornire informazioni ai proprietari del sito.
              </p>

              <h2 className="text-2xl mb-3">2. Tipi di Cookie Utilizzati</h2>
              <ul className="list-disc ml-6 mb-6">
                <li>
                  Cookie Necessari: Essenziali per il funzionamento del sito e
                  consentono di navigare e utilizzare le sue funzioni
                  principali.
                </li>
                <li>
                  Cookie di Funzionalità: Migliorano la funzionalità del sito
                  memorizzando le tue preferenze, ad esempio la lingua
                  preferita.
                </li>
                <li>
                  Cookie di Analisi: Ci aiutano a comprendere come gli utenti
                  interagiscono con il sito, fornendo informazioni anonime
                  sull'utilizzo e aiutandoci a migliorare.
                </li>
              </ul>

              <h2 className="text-2xl mb-3">3. Gestione dei Cookie</h2>
              <p className="mb-6">
                Puoi gestire le tue preferenze sui cookie attraverso le
                impostazioni del tuo browser. Tuttavia, la disabilitazione dei
                cookie potrebbe influire sulla tua esperienza di navigazione.
              </p>

              <h2 className="text-2xl mb-3">4. Cookie di Terze Parti</h2>
              <p className="mb-6">
                Alcuni servizi e contenuti incorporati nel nostro sito, come i
                social media e i servizi di analisi, possono utilizzare i loro
                cookie di terze parti. Non abbiamo controllo su questi cookie e
                consigliamo di consultare le politiche sulla privacy dei servizi
                terzi.
              </p>

              <h2 className="text-2xl mb-3">5. Durata dei Cookie</h2>
              <ul className="list-disc ml-6 mb-6">
                <li>
                  Cookie di Sessione: Vengono eliminati automaticamente quando
                  chiudi il browser.
                </li>
                <li>
                  Cookie Persistenti: Rimangono sul tuo dispositivo per un
                  periodo definito.
                </li>
              </ul>

              <h2 className="text-2xl mb-3">6. Consenso</h2>
              <p className="mb-6">
                Continuando a utilizzare il nostro sito, acconsenti all'uso dei
                cookie in conformità con questa Cookie Policy.
              </p>

              <h2 className="text-2xl mb-3">7. Modifiche alla Cookie Policy</h2>
              <p className="mb-6">
                Ci riserviamo il diritto di apportare modifiche a questa Cookie
                Policy. Le modifiche saranno pubblicate sul sito e diventeranno
                effettive dalla data di pubblicazione.
              </p>

              <p className="mb-3">Grazie per aver scelto 2M2 Ricambi!</p>
            </div>
          </MaxWidthContainer>
        </section>
      </PageLayout>
    </ServerLayout>
  );
}

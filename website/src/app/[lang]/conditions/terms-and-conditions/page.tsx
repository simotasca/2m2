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
              <h1 className="text-4xl font-bold mb-8">Termini e Condizioni</h1>

              <p className="mb-3">Ultimo Aggiornamento: 18/12/2023</p>

              <p className="mb-6">
                Benvenuto su 2M2 Ricambi. Prima di utilizzare il nostro sito, ti
                invitiamo a leggere attentamente questi Termini e Condizioni.
              </p>

              <h2 className="text-2xl mb-3">1. Accettazione dei Termini</h2>
              <p className="mb-6">
                Utilizzando il nostro sito, accetti di essere vincolato da
                questi Termini e Condizioni. Se non accetti completamente questi
                Termini, ti invitiamo a non utilizzare il sito.
              </p>

              <h2 className="text-2xl mb-3">2. Utilizzo del Sito</h2>
              <p className="mb-6">
                L'utente accetta di utilizzare il sito solo per scopi leciti e
                conforme a questi Termini. È vietato l'uso del sito per attività
                illegali o che violano i diritti di terzi.
              </p>

              <h2 className="text-2xl mb-3">3. Contenuto del Sito</h2>
              <p className="mb-6">
                Tutti i contenuti presenti sul sito sono di proprietà di 2M2
                Ricambi. È vietato l'utilizzo non autorizzato di qualsiasi
                contenuto senza il consenso scritto di 2M2 Ricambi.
              </p>

              <h2 className="text-2xl mb-3">4. Proprietà Intellettuale</h2>
              <p className="mb-6">
                I marchi, i loghi e i contenuti presenti sul sito sono di
                proprietà esclusiva di 2M2 Ricambi. È vietato l'utilizzo non
                autorizzato di tali proprietà intellettuali.
              </p>

              <h2 className="text-2xl mb-3">
                5. Limitazioni di Responsabilità
              </h2>
              <p className="mb-6">
                2M2 Ricambi non sarà responsabile per eventuali danni derivanti
                dall'uso o dall'incapacità di utilizzare il sito.
              </p>

              <h2 className="text-2xl mb-3">
                6. Modifiche ai Termini e Condizioni
              </h2>
              <p className="mb-6">
                Ci riserviamo il diritto di apportare modifiche a questi Termini
                e Condizioni. Le modifiche saranno pubblicate sul sito e
                diventeranno effettive dalla data di pubblicazione.
              </p>

              <h2 className="text-2xl mb-3">7. Contatti</h2>
              <p className="mb-6">
                Per domande o chiarimenti riguardo a questi Termini e
                Condizioni, ti invitiamo a contattarci all'indirizzo
                [tuoindirizzo@email.com].
              </p>

              <p className=" mb-3">Grazie per aver scelto 2M2 Ricambi!</p>
            </div>
          </MaxWidthContainer>
        </section>
      </PageLayout>
    </ServerLayout>
  );
}

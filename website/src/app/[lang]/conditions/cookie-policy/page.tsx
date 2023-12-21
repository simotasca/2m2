import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import { generateTranslations } from "@/lib/server/lang";

export default async function CookiePolicy() {
  const [translations] = await generateTranslations(
    {
      page: "pages/conditions/cookie-policy",
      header: "misc/header",
      "mobile-panel": "misc/mobile-panel",
      search: "misc/search",
      footer: "misc/footer",
      errors: "misc/errors",
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

              <p className="mb-3">Last Updated: 18/12/2023</p>

              <p className="mb-6">
                Welcome to 2M2 Ricambi. This site uses cookies and similar
                technologies to ensure an optimal user experience. This Cookie
                Policy provides detailed information on how we use cookies and
                how you can manage your preferences.
              </p>

              <h2 className="font-bold text-2xl mb-3">What are Cookies?</h2>
              <p className="mb-6">
                Cookies are small text files that are stored on your device when
                you visit a website. They are widely used to make the browsing
                experience more efficient and to provide information to the site
                owners.
              </p>

              <h2 className="font-bold text-2xl mb-3">Types of Cookies Used</h2>
              <ul className="list-disc ml-6 mb-6">
                <li className="mt-2">
                  Necessary Cookies: Essential for the operation of the site and
                  allow you to navigate and use its core functions.
                </li>
                <li className="mt-2">
                  Functionality Cookies: Enhance the functionality of the site
                  by storing your preferences, such as the preferred language.
                </li>
                <li className="mt-2">
                  Analytics Cookies: Help us understand how users interact with
                  the site, providing anonymous usage information and helping us
                  improve.
                </li>
              </ul>

              <h2 className="font-bold text-2xl mb-3">Cookie Management</h2>
              <p className="mb-6">
                You can manage your cookie preferences through your browser
                settings. However, disabling cookies may impact your browsing
                experience.
              </p>

              <h2 className="font-bold text-2xl mb-3">Third-Party Cookies</h2>
              <p className="mb-6">
                Some services and content embedded on our site, such as social
                media and analytics services, may use their third-party cookies.
                We have no control over these cookies and recommend checking the
                privacy policies of third-party services.
              </p>

              <h2 className="font-bold text-2xl mb-3">Cookie Duration</h2>
              <ul className="list-disc ml-6 mb-6">
                <li className="mt-2">
                  Session Cookies: Automatically deleted when you close the
                  browser.
                </li>
                <li className="mt-2">
                  Persistent Cookies: Remain on your device for a defined
                  period.
                </li>
              </ul>

              <h2 className="font-bold text-2xl mb-3">Consent</h2>
              <p className="mb-6">
                By continuing to use our site, you consent to the use of cookies
                in accordance with this Cookie Policy.
              </p>

              <h2 className="font-bold text-2xl mb-3">
                Changes to the Cookie Policy
              </h2>
              <p className="mb-6">
                We reserve the right to make changes to this Cookie Policy.
                Changes will be posted on the site and will become effective
                from the date of publication.
              </p>

              <p className="mb-3">Thank you for choosing 2M2 Ricambi!</p>
            </div>
          </MaxWidthContainer>
        </section>
      </PageLayout>
    </ServerLayout>
  );
}

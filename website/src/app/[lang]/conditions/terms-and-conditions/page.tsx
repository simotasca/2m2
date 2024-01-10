import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import PageLayout from "@/layouts/PageLayout";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";

import { generateTranslations } from "@/lib/server/lang";

export default async function CookiePolicy() {
  const [translations] = await generateTranslations(
    {
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

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
        <PageLayout headerSmall={true}>
          <section className="bg-[#363636]">
            <MaxWidthContainer>
              <div className="px-24 py-14 bg-neutral-100 h-full">
                <h1 className="text-4xl font-bold mb-8">
                  Terms and Conditions
                </h1>

                <p className="mb-3">Last Update: 12/18/2023</p>

                <p className="mb-6">
                  Welcome to 2M2 Ricambi. Before using our site, we invite you
                  to carefully read these Terms and Conditions.
                </p>

                <h2 className="text-2xl font-bold mb-3">Overview</h2>
                <p className="mb-6">
                  This website is operated by 2M2 Ricambi. The terms "we" and
                  "our" on the site refer to 2M2 Ricambi. 2M2 Ricambi provides
                  you with this website, including all information, tools, and
                  services available on it, conditioned upon your acceptance of
                  all terms, conditions, policies, and notices stated here. By
                  visiting our site and/or purchasing something from us, you
                  engage in our "Service" and agree to be bound by the following
                  terms and conditions ("Terms of Service," "Terms"), including
                  those additional terms, conditions, and policies referenced
                  herein and/or available by hyperlink. These Terms of Service
                  apply to all users of the site, including, without limitation,
                  users who are browsers, vendors, customers, merchants, and/or
                  contributors of content. Please read these Terms of Service
                  carefully before accessing or using our website. By accessing
                  or using any part of the site, you agree to be bound by these
                  Terms of Service. If you do not agree to all the terms and
                  conditions of this agreement, then you may not access the
                  website or use any services. If these Terms of Service are
                  considered an offer, acceptance is expressly limited to these
                  Terms of Service. Any new features or tools added to the
                  current store shall also be subject to the Terms of Service.
                  You can review the most current version of the Terms of
                  Service at any time on this page. We reserve the right to
                  update, change, or replace any part of these Terms of Service
                  by posting updates and/or changes to our website. It is your
                  responsibility to check this page periodically for changes.
                  Your continued use of or access to the website following the
                  posting of any changes constitutes acceptance of those
                  changes.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  Online Store Terms and Conditions
                </h2>
                <p className="mb-6">
                  You may not use our products for any illegal or unauthorized
                  purpose nor may you, in the use of the Service, violate any
                  laws in your jurisdiction (including but not limited to
                  copyright laws). You must not transmit any worms or viruses or
                  any code of a destructive nature. A breach or violation of any
                  of the Terms will result in an immediate termination of your
                  Services.
                </p>

                <h2 className="text-2xl font-bold mb-3">General Conditions</h2>
                <p className="mb-6">
                  We reserve the right to refuse service to anyone for any
                  reason at any time. You understand that your content (not
                  including credit card information) may be transferred
                  unencrypted and involve (a) transmissions over various
                  networks; and (b) changes to conform and adapt to technical
                  requirements of connecting networks or devices. Credit card
                  information is always encrypted during transfer over networks.
                  You agree not to reproduce, duplicate, copy, sell, resell or
                  exploit any portion of the Service, use of the Service, or
                  access to the Service or any contact on the website through
                  which the service is provided, without express written
                  permission by us. The headings used in this agreement are
                  included for convenience only and will not limit or otherwise
                  affect these Terms.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  Accuracy, Completeness, and Timeliness of Information
                </h2>
                <p className="mb-6">
                  We are not responsible if information made available on this
                  site is not accurate, complete or current. The material on
                  this site is provided for general information only and should
                  not be relied upon or used as the sole basis for making
                  decisions without consulting more accurate, complete or timely
                  sources of information. Any reliance on the material on this
                  site is at your own risk. This site may contain certain
                  historical information. Historical information, necessarily,
                  is not current and is provided for your reference only. We
                  reserve the right to modify the contents of this site at any
                  time, but we have no obligation to update any information on
                  our site. You agree that it is your responsibility to monitor
                  changes to our site.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  Changes to the Service and Prices
                </h2>
                <p className="mb-6">
                  Prices for our products are subject to change without notice.
                  We reserve the right to modify or discontinue the Service (or
                  any part or content thereof) without notice at any time. We
                  shall not be liable to you or to any third-party for any
                  modification, price change, suspension or discontinuance of
                  the Service.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  Products or Services
                </h2>
                <p className="mb-6">
                  Certain products or services may be available exclusively
                  online through the website. These products or services may
                  have limited quantities. We have made every effort to display
                  as accurately as possible the colors and images of our
                  products that appear at the store. We cannot guarantee that
                  your computer monitor's display of any color will be accurate.
                  We reserve the right, but are not obligated, to limit the
                  sales of our products or Services to any person, geographic
                  region or jurisdiction. We may exercise this right on a
                  case-by-case basis. We reserve the right to limit the
                  quantities of any products or services that we offer. All
                  descriptions of products or product pricing are subject to
                  change at any time without notice, at the sole discretion of
                  us. We reserve the right to discontinue any product at any
                  time. Any offer for any product or service made on this site
                  is void where prohibited. We do not warrant that the quality
                  of any products, services, information, or other material
                  purchased or obtained by you will meet your expectations, or
                  that any errors in the Service will be corrected.
                </p>

                <h2 className="text-2xl font-bold mb-3">Optional Tools</h2>
                <p className="mb-6">
                  We may provide you with access to third-party tools over which
                  we neither monitor nor have any control nor input. You
                  acknowledge and agree that we provide access to such tools "as
                  is" and "as available" without any warranties, representations
                  or conditions of any kind and without any endorsement. We
                  shall have no liability whatsoever arising from or relating to
                  your use of optional third-party tools. Any use by you of
                  optional tools offered through the site is entirely at your
                  own risk and discretion and you should ensure that you are
                  familiar with and approve of the terms on which tools are
                  provided by the relevant third-party provider(s). We may also,
                  in the future, offer new services and/or features through the
                  website (including, the release of new tools and resources).
                  Such new features and/or services shall also be subject to
                  these Terms of Service.
                </p>

                <h2 className="text-2xl font-bold mb-3">Third-Party Links</h2>
                <p className="mb-6">
                  Certain content, products and services available via our
                  Service may include materials from third-parties. Third-party
                  links on this site may direct you to third-party websites that
                  are not affiliated with us. We are not responsible for
                  examining or evaluating the content or accuracy and we do not
                  warrant and will not have any liability or responsibility for
                  any third-party materials or websites, or for any other
                  materials, products, or services of third-parties. We are not
                  liable for any harm or damages related to the purchase or use
                  of goods, services, resources, content, or any other
                  transactions made in connection with any third-party websites.
                  Please review carefully the third-party's policies and
                  practices and make sure you understand them before you engage
                  in any transaction. Complaints, claims, concerns, or questions
                  regarding third-party products should be directed to the
                  third-party.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  User Comments, Feedback, and Other Submissions
                </h2>
                <p className="mb-6">
                  If, at our request, you send certain specific submissions (for
                  example contest entries) or without a request from us you send
                  creative ideas, suggestions, proposals, plans, or other
                  materials, whether online, by email, by postal mail, or
                  otherwise (collectively, 'comments'), you agree that we may,
                  at any time, without restriction, edit, copy, publish,
                  distribute, translate and otherwise use in any medium any
                  comments that you forward to us. We are and shall be under no
                  obligation (1) to maintain any comments in confidence; (2) to
                  pay compensation for any comments; or (3) to respond to any
                  comments. We may, but have no obligation to, monitor, edit or
                  remove content that we determine in our sole discretion are
                  unlawful, offensive, threatening, libelous, defamatory,
                  pornographic, obscene or otherwise objectionable or violates
                  any party’s intellectual property or these Terms of Service.
                  You agree that your comments will not violate any right of any
                  third-party, including copyright, trademark, privacy,
                  personality or other personal or proprietary right. You
                  further agree that your comments will not contain libelous or
                  otherwise unlawful, abusive or obscene material, or contain
                  any computer virus or other malware that could in any way
                  affect the operation of the Service or any related website.
                  You may not use a false e-mail address, pretend to be someone
                  other than yourself, or otherwise mislead us or third-parties
                  as to the origin of any comments. You are solely responsible
                  for any comments you make and their accuracy. We take no
                  responsibility and assume no liability for any comments posted
                  by you or any third-party.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  Personal Information
                </h2>
                <p className="mb-6">
                  Your submission of personal information through the store is
                  governed by our Privacy Policy. To view our Privacy Policy.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  Errors, Inaccuracies, and Omissions
                </h2>
                <p className="mb-6">
                  Occasionally there may be information on our site or in the
                  Service that contains typographical errors, inaccuracies or
                  omissions that may relate to product descriptions, pricing,
                  promotions, offers, product shipping charges, transit times
                  and availability. We reserve the right to correct any errors,
                  inaccuracies or omissions, and to change or update information
                  or cancel orders if any information in the Service or on any
                  related website is inaccurate at any time without prior notice
                  (including after you have submitted your order). We undertake
                  no obligation to update, amend or clarify information in the
                  Service or on any related website, including without
                  limitation, pricing information, except as required by law. No
                  specified update or refresh date applied in the Service or on
                  any related website should be taken to indicate that all
                  information in the Service or on any related website has been
                  modified or updated.
                </p>

                <h2 className="text-2xl font-bold mb-3">Prohibited Uses</h2>
                <p className="mb-6">
                  In addition to other prohibitions as set forth in the Terms of
                  Service, you are prohibited from using the site or its
                  content: (a) for any unlawful purpose; (b) to solicit others
                  to perform or participate in any unlawful acts; (c) to violate
                  international, federal, provincial or state regulations,
                  rules, laws, or local ordinances; (d) to infringe upon or
                  violate our intellectual property rights or the intellectual
                  property rights of others; (e) to harass, abuse, insult, harm,
                  defame, slander, disparage, intimidate, or discriminate based
                  on gender, sexual orientation, religion, ethnicity, age,
                  national origin, or disability; (f) to submit false or
                  misleading information; (g) to upload or transmit viruses or
                  any other type of malicious code that will or may be used in
                  any way that will affect the functionality or operation of the
                  Service, other websites, or the Internet; (h) to collect or
                  track the personal information of others; (i) to spam, phish,
                  pharm, pretext, spider, crawl, or scrape; (j) for any obscene
                  or immoral purpose; or (k) to interfere with or circumvent the
                  security features of the Service or any related website, other
                  websites, or the Internet. We reserve the right to terminate
                  your use of the Service or any related website for violating
                  any of the prohibited uses.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  Disclaimer of Warranties; Limitation of Liability
                </h2>
                <p className="mb-6">
                  We do not guarantee, represent, or warrant that your use of
                  our service will be uninterrupted, timely, secure, or
                  error-free. We do not warrant that the results that may be
                  obtained from the use of the service will be accurate or
                  reliable. You agree that we may remove the service for
                  indefinite periods of time or cancel the service at any time,
                  without notice to you. You expressly agree that your use of,
                  or inability to use, the service is at your sole risk. The
                  service and all products and services delivered to you through
                  the service are (except as expressly stated by us) provided
                  "as is" and "as available" for your use, without any
                  representation, warranties, or conditions of any kind, either
                  express or implied, including all implied warranties or
                  conditions of merchantability, merchantable quality, fitness
                  for a particular purpose, durability, title, and
                  non-infringement. In no case shall 2M2 Ricambi and its
                  directors, officers, employees, affiliates, agents,
                  contractors, interns, suppliers, service providers, or
                  licensors be liable for any injury, loss, claim, or any
                  direct, indirect, incidental, punitive, special, or
                  consequential damages of any kind, including, without
                  limitation, lost profits, lost revenue, lost savings, loss of
                  data, replacement costs, or any similar damages, whether based
                  in contract, tort (including negligence), strict liability, or
                  otherwise, arising from your use of any of the services or any
                  products procured using the service, or for any other claim
                  related in any way to your use of the service or any product,
                  including, but not limited to, any errors or omissions in any
                  content, or any loss or damage of any kind incurred as a
                  result of the use of the service or any content (or product)
                  posted, transmitted, or otherwise made available via the
                  service, even if advised of their possibility. Because some
                  states or jurisdictions do not allow the exclusion or the
                  limitation of liability for consequential or incidental
                  damages, in such states or jurisdictions, our liability shall
                  be limited to the maximum extent permitted by law.
                </p>

                <h2 className="text-2xl font-bold mb-3">Indemnification</h2>
                <p className="mb-6">
                  You agree to indemnify, defend, and hold harmless 2M2 Ricambi
                  and its parent, subsidiaries, affiliates, partners, officers,
                  directors, agents, contractors, licensors, service providers,
                  subcontractors, suppliers, interns, and employees, from any
                  claim or demand, including reasonable attorneys' fees, made by
                  any third-party due to or arising out of your breach of these
                  Terms of Service or the documents they incorporate by
                  reference, or your violation of any law or the rights of a
                  third-party.
                </p>

                <h2 className="text-2xl font-bold mb-3">Severability</h2>
                <p className="mb-6">
                  In the event that any provision of these Terms of Service is
                  determined to be unlawful, void, or unenforceable, such
                  provision shall nonetheless be enforceable to the fullest
                  extent permitted by applicable law, and the unenforceable
                  portion shall be deemed to be severed from these Terms of
                  Service, such determination shall not affect the validity and
                  enforceability of any other remaining provisions.
                </p>

                <h2 className="text-2xl font-bold mb-3">Survivability</h2>
                <p className="mb-6">
                  The obligations and liabilities of the parties incurred before
                  the termination date shall survive the termination of this
                  agreement for all purposes. These Terms of Service are
                  effective unless and until terminated by either you or us. You
                  may terminate these Terms of Service at any time by notifying
                  us that you no longer wish to use our Services, or when you
                  cease using our site. Additionally, if, in our sole judgment,
                  you fail, or we suspect that you have failed, to comply with
                  any term or provision of these Terms of Service, we also may
                  terminate this agreement at any time without notice, and you
                  will remain liable for all amounts due up to and including the
                  date of termination; and/or accordingly may deny you access to
                  our Services (or any part thereof).
                </p>

                <h2 className="text-2xl font-bold mb-3">Entire Agreement</h2>
                <p className="mb-6">
                  The failure of us to exercise or enforce any right or
                  provision of these Terms of Service shall not constitute a
                  waiver of such right or provision. These Terms of Service and
                  any policies or operating rules posted by us on this site or
                  in respect to The Service constitutes the entire agreement and
                  understanding between you and us and govern your use of the
                  Service, superseding any prior or contemporaneous agreements,
                  communications, and proposals, whether oral or written,
                  between you and us (including, but not limited to, any prior
                  versions of the Terms of Service). Any ambiguities in the
                  interpretation of these Terms of Service shall not be
                  construed against the drafting party.
                </p>

                <h2 className="text-2xl font-bold mb-3">Governing Law</h2>
                <p className="mb-6">
                  These Terms of Service and any separate agreements whereby we
                  provide you Services shall be governed by and construed in
                  accordance with the laws of Via delle Basse 2, Collecchio PR
                  43044 Parma PR, Italy.
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  Changes to Terms of Service
                </h2>
                <p className="mb-6">
                  You can review the most current version of the Terms of
                  Service at any time at this page.
                </p>

                <p className=" mb-3">Thank you for choosing 2M2 Ricambi!</p>
              </div>
            </MaxWidthContainer>
          </section>
        </PageLayout>
      </ClientLayout>
    </TranslationClientComponent>
  );
}

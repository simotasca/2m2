import Breadcrumbs from "@/components/search/Breadcrumbs";
import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import i18n from "@/i18n";
import PageLayout from "@/layouts/PageLayout";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";

import { fetchEcodatBrands, fetchEcodatModels } from "@/lib/server/ecodat";
import { generateTranslations, getCurrentLang } from "@/lib/server/lang";
import { GenericSearchParams } from "@/lib/server/search";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    brand: string;
  };
  searchParams: GenericSearchParams;
}

async function getBrand(qsBrand: string) {
  const brands = await fetchEcodatBrands();
  const brand = brands.find(
    (b) => b.name.toLowerCase() === decodeQueryParam(qsBrand).toLowerCase()
  );
  return { brand, brands };
}

export async function generateMetadata({
  params: { brand: qsBrand },
}: Props): Promise<Metadata> {
  const title = "Marchi | 2M2 Autoricambi";
  const { brand } = await getBrand(qsBrand);
  const description = "Marchio:" + brand?.name;
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

export default async function ModelPage({
  params: { brand: qsBrand },
  searchParams,
}: Props) {
  const { brand, brands } = await getBrand(qsBrand);
  if (!brand) return notFound();

  const models = await fetchEcodatModels(brand.id);

  const bread = [
    {
      text: brand.name,
      href: routes.brand(brand.name),
      dropdown: brands.map((b) => ({
        text: b.name,
        href: routes.brand(b.name),
      })),
    },
    {
      dropdown: models.map((m) => ({
        text: m.name,
        href: routes.model(brand.name, m.name),
      })),
    },
  ];

  const [translations, { t }] = await generateTranslations(
    {
      page: "pages/brand",
      product: "misc/product",
      header: "misc/header",
      "mobile-panel": "misc/mobile-panel",
      search: "misc/search",
      footer: "misc/footer",
      "engine-assistance": "misc/engine-assistance",
      errors: "misc/errors",
    },
    true
  );

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
        <PageLayout headerSmall>
          <div className="bg-white pb-4 xs:px-2">
            <MaxWidthContainer>
              <Breadcrumbs className="py-4" items={bread} />

              <Title as="h1">
                <Title.Gray>{t("page.title")}</Title.Gray>
                <Title.Red>{` ${brand.name}`}</Title.Red>
              </Title>

              <div className="h-4"></div>

              {/* @ts-expect-error Server Component */}
              <PaginatedProductsGrid
                className="py-2"
                searchParams={searchParams}
                query={{ brandId: brand.id }}
              />

              <div className="h-10"></div>

              <div className="max-sm:px-3">
                <ContactsSection />
              </div>

              <div className="h-4"></div>
            </MaxWidthContainer>
          </div>
        </PageLayout>
      </ClientLayout>
    </TranslationClientComponent>
  );
}

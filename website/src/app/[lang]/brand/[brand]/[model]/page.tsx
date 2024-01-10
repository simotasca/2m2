import Breadcrumbs from "@/components/search/Breadcrumbs";
import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModal from "@/components/search/SearchModal";
import StyledSearchModalToggle from "@/components/search/StyledSearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import PageLayout from "@/layouts/PageLayout";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";

import { fetchEcodatBrands, fetchEcodatModels } from "@/lib/server/ecodat";
import { generateTranslations } from "@/lib/server/lang";
import { GenericSearchParams } from "@/lib/server/search";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    brand: string;
    model: string;
  };
  searchParams: GenericSearchParams;
}

export default async function ModelPage({
  params: { brand: qsBrand, model: qsModel },
  searchParams,
}: Props) {
  const brands = await fetchEcodatBrands();
  const brand = brands.find(
    (b) => b.name.toLowerCase() === decodeQueryParam(qsBrand).toLowerCase()
  );
  if (!brand) return notFound();

  const models = await fetchEcodatModels(brand.id);
  const model = models.find(
    (m) => m.name.toLowerCase() === decodeQueryParam(qsModel).toLowerCase()
  );
  if (!model) return notFound();

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
      text: model.name,
      href: routes.model(brand.name, model.name),
      dropdown: models.map((m) => ({
        text: m.name,
        href: routes.model(brand.name, m.name),
      })),
    },
  ];

  const [translations, { t }] = await generateTranslations(
    {
      product: "misc/product",
      header: "misc/header",
      "mobile-panel": "misc/mobile-panel",
      search: "misc/search",
      footer: "misc/footer",
      errors: "misc/errors",
      contacts: "misc/contacts",
      auth: "auth",
      page: "pages/brand/model",
    },
    true
  );

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
        <PageLayout headerSmall>
          <SearchModal />

          <div className="bg-white pb-4 xs:px-2">
            <MaxWidthContainer>
              <div className="pt-4 max-sm:pt-3 pb-2">
                <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
                  <Breadcrumbs items={bread} />
                  <StyledSearchModalToggle />
                </div>
              </div>

              <Title as="h1">
                <Title.Gray>{t("page.title")}</Title.Gray>
                <Title.Red>{` ${brand.name} ${model.name}`}</Title.Red>
              </Title>

              <div className="h-4"></div>

              {/* @ts-expect-error Server Component */}
              <PaginatedProductsGrid
                className="py-2"
                searchParams={searchParams}
                query={{
                  brandId: brand.id,
                  modelId: model.id,
                }}
              />
              <div className="h-10"></div>
              <div className="max-sm:px-3">
                <ContactsSection></ContactsSection>
              </div>
              <div className="h-4"></div>
            </MaxWidthContainer>
          </div>
        </PageLayout>
      </ClientLayout>
    </TranslationClientComponent>
  );
}

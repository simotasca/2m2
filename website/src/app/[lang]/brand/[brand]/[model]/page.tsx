import Breadcrumbs from "@/components/search/Breadcrumbs";
import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import SearchServerLayout from "@/layouts/search/SearchServerLayout";
import { fetchEcodatBrands, fetchEcodatModels } from "@/lib/server/ecodat";
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

  return (
    <ServerLayout>
      <PageLayout headerSmall>
        <div className="bg-white pb-4 xs:px-2">
          <MaxWidthContainer>
            <Breadcrumbs className="py-4" items={bread} />

            <Title as="h1">
              <Title.Gray>Model</Title.Gray>
              <Title.Red>{` ${brand.name} ${model.name}`}</Title.Red>
            </Title>

            <div className="h-4"></div>

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
    </ServerLayout>
  );
}

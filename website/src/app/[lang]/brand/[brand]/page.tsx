import Breadcrumbs from "@/components/search/Breadcrumbs";
import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import { fetchEcodatBrands, fetchEcodatModels } from "@/lib/server/ecodat";
import { SearchParams } from "@/lib/server/search";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    brand: string;
  };
  searchParams: SearchParams;
}

export default async function ModelPage({
  params: { brand: qsBrand },
  searchParams,
}: Props) {
  const brands = await fetchEcodatBrands();
  const brand = brands.find(
    (b) => b.name.toLowerCase() === decodeQueryParam(qsBrand).toLowerCase()
  );
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

  return (
    <ServerLayout>
      <PageLayout headerSmall>
        <div className="bg-white pb-4">
          <MaxWidthContainer>
            <Breadcrumbs className="py-4" items={bread} />
            <Title as="h1">
              <Title.Gray>Brand</Title.Gray>
              <Title.Red>{` ${brand.name}`}</Title.Red>
            </Title>
            <div className="h-4"></div>
            <PaginatedProductsGrid
              className="py-2"
              searchParams={searchParams}
              query={{ brandId: brand.id }}
            />
            <div className="h-10"></div>
            <ContactsSection></ContactsSection>
            <div className="h-4"></div>
          </MaxWidthContainer>
        </div>
      </PageLayout>
    </ServerLayout>
  );
}

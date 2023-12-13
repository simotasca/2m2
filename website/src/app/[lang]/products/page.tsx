// import SearchServerLayout from "@/layouts/search/SearchServerLayout";
// import { fetchEcodatArticles } from "@/lib/server/ecodat";
// import { allowedParams } from "@/lib/shared/search";

// interface Props {
//   searchParams: { [key: string]: string };
// }

// export default async function ProductsPage({ searchParams }: Props) {
//   const filters = parseSearchParams(searchParams);

//   const products = await fetchEcodatArticles({
//     fetchRow: { nRows: 10, lastRow: 0 },
//     ...filters,
//   });

//   return <SearchServerLayout products={products} />;
// }

// function parseSearchParams(params: { [key: string]: string }) {
//   let filters: any = {};
//   for (const allowed of allowedParams) {
//     if (allowed in params) {
//       const toInt = parseInt(params[allowed]);
//       if (!Number.isNaN(toInt)) {
//         filters[allowed] = toInt;
//       }
//     }
//   }
//   return filters;
// }

import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModalToggle from "@/components/search/SearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import { GenericSearchParams } from "@/lib/server/search";
import { parseSearchParams } from "@/lib/shared/search";

interface Props {
  searchParams: GenericSearchParams;
}

export default async function ProductsPage({ searchParams }: Props) {
  const filters = parseSearchParams(searchParams);

  return (
    <ServerLayout>
      <PageLayout headerSmall>
        <div className="bg-white pb-4 xs:px-2">
          <MaxWidthContainer className="pt-4">
            <div className="pt-4 max-sm:pt-3 pb-2">
              <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
                <div />
                <SearchModalToggle />
              </div>
            </div>

            <Title as="h1">
              <Title.Gray>OUR</Title.Gray>
              <Title.Red> PRODUCTS</Title.Red>
            </Title>

            <div className="h-4"></div>

            <PaginatedProductsGrid
              className="py-2"
              searchParams={searchParams}
              query={filters}
            />

            <div className="h-10"></div>

            <div className="max-sm:px-3">
              <ContactsSection />
            </div>

            <div className="h-4"></div>
          </MaxWidthContainer>
        </div>
      </PageLayout>
    </ServerLayout>
  );
}

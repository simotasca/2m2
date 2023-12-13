import Breadcrumbs from "@/components/search/Breadcrumbs";
import PaginatedProductsGrid from "@/components/search/PaginatedProductsGrid";
import SearchModal from "@/components/search/SearchModal";
import SearchModalToggle from "@/components/search/SearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Title from "@/components/ui/Title";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import {
  fetchEcodatCategories,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { GenericSearchParams } from "@/lib/server/search";
import routes from "@/lib/shared/routes";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
  };
  searchParams: GenericSearchParams;
}

export default async function CategoryPage({
  params: { category: qsCategory },
  searchParams,
}: Props) {
  const categories = await fetchEcodatCategories();
  const category = categories.find(
    (c) => c.name.toLowerCase() === decodeQueryParam(qsCategory).toLowerCase()
  );
  if (!category) return notFound();

  const types = await fetchEcodatTypologies(category.id);

  const bread = [
    {
      text: category.name,
      href: routes.category(category.name),
      dropdown: categories.map((c) => ({
        text: c.name,
        href: routes.category(c.name),
      })),
    },
    {
      dropdown: types.map((t) => ({
        text: t.name,
        href: routes.type(category.name, t.name),
      })),
    },
  ];

  return (
    <ServerLayout>
      <PageLayout headerSmall>
        <SearchModal category={category} />

        <div className="bg-white pb-4">
          <MaxWidthContainer>
            <div className="pt-4 max-sm:pt-3 pb-2">
              <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
                <Breadcrumbs items={bread} />
                <SearchModalToggle />
              </div>
            </div>

            <Title as="h1">
              <Title.Gray>Products Category</Title.Gray>
              <Title.Red> {category.name}</Title.Red>
            </Title>

            <div className="h-4"></div>

            <PaginatedProductsGrid
              className="py-2"
              searchParams={searchParams}
              query={{
                categoryId: category.id,
              }}
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

// function TitleSection({ category, types }) {
//   return (
//     <MaxWidthContainer>
//       <div className="flex gap-6 pt-2 pb-1">
//         <h2 className="font-oswald text-3xl font-semibold uppercase">
//           <span className="text-red-700">category</span>
//           <span className="text-gray-400"> {category.name}</span>
//         </h2>
//         <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50">
//           Filters
//           <Image
//             className="-translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
//             alt=""
//             src={iconRight}></Image>
//         </Button>
//         <ul className="flex gap-8  items-center font-poppins font-medium mt-auto mb-[2px] ml-auto mr-0">
//           {types.map((t) => (
//             <li>{t.name}</li>
//           ))}
//         </ul>
//       </div>
//     </MaxWidthContainer>
//   );
// }

// function ProductsLine() {
//   return (
//     <section>
//       <h2>Titolo a caso</h2>
//     </section>
//   );
// }

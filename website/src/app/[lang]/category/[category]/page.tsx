import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import SearchServerLayout from "@/layouts/search/SearchServerLayout";
import Image from "next/image";
import iconRight from "@/images/icons/right.svg";
import {
  fetchEcodatArticles,
  fetchEcodatCategories,
} from "@/lib/server/ecodat";
import { decodeQueryParam } from "@/lib/shared/search";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
  };
}

export default async function CategoryPage({
  params: { category: qsCategory },
}: Props) {
  const categories = await fetchEcodatCategories();
  const category = categories.find(
    (c) => c.name.toLowerCase() === decodeQueryParam(qsCategory).toLowerCase()
  );
  if (!category) return notFound();

  const products = await fetchEcodatArticles({
    fetchRow: { nRows: 10, lastRow: 0 },
    categoryId: category.id,
  });

  return (
    <SearchServerLayout
      products={products}
      headerExtension={<HeaderExtension category={category} />}
    >
      {/* ELENCHI TIPOLOGIE */}
      <div className="h-[9999999px] bg-red-500"></div>
    </SearchServerLayout>
  );
}

function HeaderExtension({ category }) {
  return (
    <div className="bg-neutral-100 [box-shadow:0px_2px_2px_#36363636] ">
      <MaxWidthContainer>
        <div className="flex gap-6 pt-5 pb-3">
          <h2 className="font-oswald text-3xl font-semibold uppercase">
            <span className="text-red-700">category</span>
            <span className="text-gray-400"> {category.name}</span>
          </h2>
          <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50">
            Filters
            <Image
              className="-translate-y-px group-hover:translate-x-0.5 transition-transform duration-100"
              alt=""
              src={iconRight}
            ></Image>
          </Button>
          <ul className="flex gap-8  items-center font-poppins font-medium mt-auto mb-[2px] ml-auto mr-0">
            <li>Motori</li>
            <li>Motori</li>
            <li>Motori</li>
            <li>Motori</li>
            <li>Motori</li>
          </ul>
        </div>
      </MaxWidthContainer>
    </div>
  );
}

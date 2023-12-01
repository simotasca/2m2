"use client";

import ProductsGrid from "@/components/product/ProductsGrid";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import useTranslation from "@/context/lang/useTranslation";
import PageLayout from "../PageLayout";
import { SearchLayoutProps } from "./props";
import Button from "@/components/ui/Button";
import iconRight from "@/images/icons/right.svg";
import Image from "next/image";

export default function SearchClientLayout({
  products,
  headerExtension,
  children,
}: SearchLayoutProps) {
  const t = useTranslation("");

  return (
    <PageLayout headerSmall headerExtension={headerExtension}>
      <MaxWidthContainer className="bg-neutral-100">
        <Pagination currentPage={0} />
        <ProductsGrid products={products} className="py-6" />
        <Pagination currentPage={0} />
        {children}
      </MaxWidthContainer>
    </PageLayout>
  );
}

function Pagination({ currentPage }: { currentPage: number }) {
  return (
    <div className="flex gap-2 items-center pb-4 justify-center pr-4">
      <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50 px-1 py-1">
        <Image
          className="w-5 -translate-y-px group-hover:-translate-x-0.5 transition-transform duration-100 -scale-x-100 my-auto "
          alt=""
          src={iconRight}
        ></Image>
      </Button>
      <span className="oswald text-lg">{currentPage}</span>
      <Button className="group text-sm bg-transparent border border-slate-500 bg-neutral-50 px-1 py-1">
        <Image
          className="w-5 -translate-y-px group-hover:translate-x-0.5 transition-transform duration-100 my-auto "
          alt=""
          src={iconRight}
        ></Image>
      </Button>
    </div>
  );
}

// function SearchPageHeader({ title }: any) {
//   const searchParams = useSearchParams();
//   const filters = () => {
//     const params: Map<string, string> = new Map();
//     const add = (name: string) => {
//       searchParams.has(name) && params.set(name, searchParams.get(name)!);
//     };
//     allowedParams.forEach(add);
//     return Array.from(params);
//   };

//   return (
//     <div className="bg-white shadow shadow-neutral-300">
//       <MaxWidthContainer className="pt-2 pb-2 flex items-start gap-4">
//         <div className="flex items-end gap-6">
//           <h1 className="uppercase font-oswald text-4xl flex gap-2">
//             <span className="font-semibold text-red-700">{title[0]}</span>
//             <span className="text-neutral-500">{title[1]}</span>
//           </h1>
//           <Button className="bg-neutral-200 border border-slate-400 font-medium gap-1 mb-0.5">
//             <span className="text-sm">Edit Filters</span>
//             <Image src={iconFilters} alt="icon filters" className="w-4" />
//           </Button>
//         </div>
//         <div className="flex-1 flex flex-wrap items-start gap-x-2 gap-y-1 justify-end pt-2">
//           {filters().map(([key, val], idx) => (
//             <div
//               key={idx}
//               className="rounded border border-neutral-300 px-2.5 py-px font-semibold whitespace-nowrap"
//             >
//               <span className="text-sm text-neutral-500">{key}: </span>
//               <span className="">{val}</span>
//             </div>
//           ))}
//         </div>
//       </MaxWidthContainer>
//     </div>
//   );
// }

import ProductImage from "@/components/product/ProductImage";
import Breadcrumbs from "@/components/search/Breadcrumbs";
import SearchModal from "@/components/search/SearchModal";
import SearchModalToggle from "@/components/search/SearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import GuaranteedUsed from "@/components/ui/GuaranteedUsed";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import {
  fetchEcodatArticle,
  fetchEcodatArticlePhotoList,
  fetchEcodatCategories,
  fetchEcodatItems,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { EcodatArticle, itemName } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import SimilarProducts from "./SimilarProducts";
import BuySection from "./BuySection";
import TitleSection from "./TitleSection";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params: { slug } }: Props) {
  const id = slug.split("-").at(-1);
  if (!id) return notFound();

  const product = await fetchEcodatArticle(id).catch((err) => {
    console.log(err);
    return null;
  });

  // TODO: se c'è un errore mostrare pagina di errore con status 500 anzichè not found */
  if (!product) return notFound();

  const categories = await fetchEcodatCategories()
    .then((cats) => cats.map((c) => c.name))
    .catch((err) => {
      console.error("Error fetching categories:", err.message);
      return undefined;
    });

  const types = await fetchEcodatTypologies(product.categoryId)
    .then((types) => types.map((c) => c.name))
    .catch((err) => {
      console.error("Error fetching types:", err.message);
      return undefined;
    });

  const items = await fetchEcodatItems(product.categoryId, product.typeId)
    .then((items) => items)
    .catch((err) => {
      console.error("Error fetching items:", err.message);
      return undefined;
    });

  const bread = [
    {
      text: product.category,
      href: routes.category(product.category),
      dropdown: categories
        ?.filter((c) => c !== product.category)
        .map((c) => ({ text: c, href: routes.category(c) })),
    },
    {
      text: product.type,
      href: routes.type(product.category, product.type),
      dropdown: types
        ?.filter((t) => t !== product.type)
        .map((t) => ({
          text: t,
          href: routes.type(product.category, t),
        })),
    },
    {
      text: product.item,
      href: routes.item(product.category, product.type, product.item),
      dropdown: items
        ?.filter((i) => i.id != product.itemId)
        .map((i) => ({
          text: itemName(i),
          href: routes.item(product.category, product.type, itemName(i)),
        })),
    },
  ];

  return (
    <ServerLayout translations={{}}>
      <PageLayout headerSmall>
        <SearchModal />

        <div className="bg-white min-h-full">
          <MaxWidthContainer>
            <div className="pt-4 max-sm:pt-3 pb-2">
              <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
                <Breadcrumbs items={bread} />
                <SearchModalToggle />
              </div>
            </div>

            <TitleSection product={product} />

            <hr className="my-3" />

            <div className="flex flex-col sm:grid sm:grid-cols-[2fr_1fr] md:grid-cols-[3fr_auto] lg:grid-cols-[17fr_10fr_auto] gap-4 md:max-lg:gap-x-8">
              <PhotoSection product={product} />

              <ProductDetails product={product} />

              <BuySection product={product} />

              <div className="order-last"></div>
            </div>

            <div className="lg:hidden h-4"></div>
          </MaxWidthContainer>

          <div className="h-4"></div>

          <GuaranteedUsed />

          <div className="h-10"></div>

          <MaxWidthContainer>
            <SimilarProducts product={product} />

            <MaxWidthContainer className="max-w-6xl py-20">
              <ContactsSection />
            </MaxWidthContainer>
          </MaxWidthContainer>
        </div>
      </PageLayout>
    </ServerLayout>
  );
}

async function PhotoSection({ product }: { product: EcodatArticle }) {
  const photoIdsList: number[] = await fetchEcodatArticlePhotoList({
    articleId: product.id,
  }).catch((e) => {
    console.error("Error fetching photo list, for product", product.id, ":", e);
    return [];
  });

  if (photoIdsList.length === 0)
    return (
      <div className="aspect-[3/2] bg-slate-200">
        <img
          src="/assets/placeholder-image.png"
          className="w-full h-full object-cover"
        />
      </div>
    );

  return (
    <div>
      <div className="grid xs:grid-cols-[4rem_1fr] sm:max-md:grid-cols-1 md:grid-cols-[5rem_1fr] gap-1">
        <div className="relative h-full max-xs:order-2 sm:max-md:order-2 max-xs:mb-14 sm:max-md:mb-14">
          <div className="absolute w-full xs:h-full sm:max-md:h-auto top-0 left-0 max-xs:bottom-0 overflow-x-auto overflow-y-hidden xs:overflow-y-auto xs:overflow-x-hidden">
            <div className="flex flex-col gap-1 max-xs:flex-row sm:max-md:flex-row max-xs:order-2 sm:max-md:order-2">
              {photoIdsList.slice(1).map((imageId) => (
                <div className="p-0.5 border border-slate-300 rounded-sm ">
                  <ProductImage
                    className="max-xs:h-12 sm:max-md:h-12 xs:w-full sm:max-md:w-auto"
                    photo={{ imageId }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full p-0.5 border border-slate-300 rounded-sm">
          <ProductImage big photo={{ imageId: photoIdsList[0] }} />
        </div>
      </div>
    </div>
  );
}

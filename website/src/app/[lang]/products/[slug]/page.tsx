import ProductImage from "@/components/product/ProductImage";
import Breadcrumbs from "@/components/search/Breadcrumbs";
import SearchModal from "@/components/search/SearchModal";
import StyledSearchModalToggle from "@/components/search/StyledSearchModalToggle";
import Button from "@/components/ui/Button";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { PaymentsBar } from "@/components/ui/PaymentsBar";
import iconAvailable from "@/images/icons/available.svg";
import iconFavorite from "@/images/icons/favorite.svg";
import iconShare from "@/images/icons/share.svg";
import iconCart from "@/images/icons/white/cart.svg";
import imgLogo from "@/images/logo-dark.svg";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import {
  fetchEcodatArticle,
  fetchEcodatArticlePhotoList,
  fetchEcodatCategories,
  fetchEcodatItems,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { TranslationFactories, generateTranslations } from "@/lib/server/lang";
import { EcodatArticle, itemName } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import SimilarProducts from "./SimilarProducts";

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

  const [translations, { t, r }] = await generateTranslations(
    {
      product: "misc/product",
      header: "misc/header",
      "mobile-panel": "misc/mobile-panel",
      search: "misc/search",
      footer: "misc/footer",
      contacts: "misc/contacts",
      auth: "auth",
      page: "pages/products/product",
      categories: "misc/categories",
      typologies: "misc/typologies",
    },
    true
  );

  const bread = [
    {
      text: t(["categories", product.category], product.category),
      href: routes.category(product.category),
      dropdown: categories?.map((c) => ({
        text: t(["categories", c], c),
        href: routes.category(c),
      })),
    },
    {
      text: t(["typologies", product.type], product.type),
      href: routes.type(product.category, product.type),
      dropdown: types?.map((ty) => ({
        text: t(["typologies", ty], ty),
        href: routes.type(product.category, ty),
      })),
    },
    {
      text: product.item,
      href: routes.item(product.category, product.type, product.item),
      dropdown: items?.map((i) => ({
        text: itemName(i),
        href: routes.item(product.category, product.type, itemName(i)),
      })),
    },
  ];

  return (
    <ServerLayout translations={translations}>
      <PageLayout headerSmall>
        <SearchModal />

        <div className="bg-white min-h-full">
          <MaxWidthContainer>
            <div className="pt-4 max-sm:pt-3 pb-2">
              <div className="flex items-center justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start max-sm:justify-start">
                <Breadcrumbs items={bread} />
                <StyledSearchModalToggle />
              </div>
            </div>

            <div>
              <h1 className="font-bold text-2xl leading-[1.1] max-w-screen-md">
                <span className="text-red-500">{product.item} </span>
                <span>{product.brand + " " + product.model}</span>
              </h1>
              <p className="mb-1 mt-0.5 text-sm max-w-screen-md">
                <span className="font-medium">{t("page.title")}:</span>
                <span className="text-neutral-600"> {product.description}</span>
              </p>
            </div>

            <hr className="my-3" />

            <div className="flex flex-col sm:grid sm:grid-cols-[2fr_1fr] md:grid-cols-[3fr_auto] lg:grid-cols-[17fr_10fr_auto] gap-4 md:max-lg:gap-x-8">
              <PhotoSection product={product} />

              <ProductDetails product={product} />

              <BuySection t={t} r={r} product={product} />

              <div className="order-last"></div>
            </div>

            <div className="lg:hidden h-4"></div>
          </MaxWidthContainer>

          <div className="h-4"></div>

          <div className="bg-neutral-100 border-y border-neutral-200 py-6 px-4 md:px-2 lg:px-0 ">
            <div className="mx-auto w-fit flex [@media(max-width:383px)]:flex-col gap-y-3 items-start md:items-center gap-x-4 lg:gap-x-8">
              <Image
                src={imgLogo}
                alt=""
                className="w-12 md:w-16 [@media(max-width:383px)]:mx-auto"
              />
              <h4 className="font-semibold leading-tight text-base sm:text-lg md:text-xl max-md:text-center">
                {t("page.guaranteed-used")}
              </h4>
              <Image
                src={imgLogo}
                alt=""
                className="w-12 md:w-16 [@media(max-width:383px)]:hidden"
              />
            </div>
          </div>

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

function BuySection({
  product,
  t,
  r,
}: { product: EcodatArticle } & TranslationFactories) {
  return (
    <aside className="font-sans order-2 row-span-2">
      <div className="flex gap-1 items-center -mb-1">
        <span className="text-[#5F5C5C] text-sm sm:text-xs md:text-sm mb-[2px]">
          {t("page.buy-section.available")}
        </span>
        <Image
          className="w-4 sm:w-3 md:w-4"
          src={iconAvailable}
          alt="available icon"
        />
      </div>
      <span className="font-semibold text-4xl sm:text-3xl md:text-4xl">
        {product.price.toFixed(2)}€
      </span>
      <p className="text-[#5F5C5C] text-sm sm:text-xs md:text-sm">
        {t("page.buy-section.iva")}
      </p>
      <p className="font-bold text-lg sm:text-base md:text-lg uppercase -mt-[6px] whitespace-nowrap">
        {r("page.buy-section.delivery-time")}
      </p>
      <div className="h-3"></div>
      <div className="grid grid-cols-[auto_auto] leading-3">
        <div className="flex items-center gap-2 sm:gap-1 md:gap-2 max-w-[80%]">
          <Image
            className="w-9 sm:w-5 md:w-7"
            src={iconFavorite}
            alt="favorite icon"
          />
          <span className=" text-xs leading-[1.1]">
            {t("page.buy-section.favourites")}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-1 md:gap-2 max-w-[80%]">
          <Image
            className="w-6 sm:w-5 md:w-6"
            src={iconShare}
            alt="share icon"
          />
          <span className="text-xs leading-[1.1]">
            {t("page.buy-section.share")}
          </span>
        </div>
      </div>
      <div className="h-[10px]"></div>
      <Button className="w-full text-sm bg-gradient-to-br from-red-700 to-red-500 text-white py-2 pb-1.5">
        <div className="child:-translate-x-2 contents">
          <Image
            className="w-6 translate-y-px"
            src={iconCart}
            alt="icon-cart"
          />
          <span>{t("page.buy-section.add-to-cart")}</span>
        </div>
      </Button>
      <div className="pt-2 flex justify-end pr-2 gap-2">
        <span className="text-sm sm:text-xs md:text-sm">
          {t("page.buy-section.payments")}:
        </span>
        <PaymentsBar className="w-fit" />
      </div>
      {/* <p className="text-[#2e2d2d] underline text-xs">
        puoi pagarlo alla consegna*
      </p> */}
    </aside>
  );
}

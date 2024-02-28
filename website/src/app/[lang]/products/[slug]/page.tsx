import Breadcrumbs from "@/components/search/Breadcrumbs";
import SearchModal from "@/components/search/SearchModal";
import StyledSearchModalToggle from "@/components/search/StyledSearchModalToggle";
import ContactsSection from "@/components/ui/ContactsSection";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { PaymentsBar } from "@/components/ui/PaymentsBar";
import TranslationClientComponent from "@/context/lang/TranslationClientComponent";
import iconAvailable from "@/images/icons/available.svg";
import iconFavorite from "@/images/icons/favorite.svg";
import imgLogo from "@/images/logo-dark.svg";
import PageLayout from "@/layouts/PageLayout";
import ClientLayout from "@/layouts/base/ClientLayout";
import { getServerData } from "@/layouts/base/ServerLayout";
import {
  fetchEcodatArticle,
  fetchEcodatCategories,
  fetchEcodatItems,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { TranslationFactories, generateTranslations } from "@/lib/server/lang";
import { EcodatArticle, itemName } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import { notFound } from "next/navigation";
import CartButton from "./CartButton";
import PhotoSection from "./PhotoSection";
import ProductDetails from "./ProductDetails";
import SimilarProducts from "./SimilarProducts";
import { twJoin } from "tailwind-merge";

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
      "engine-assistance": "misc/engine-assistance",
      errors: "misc/errors",
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

  const { cart, favs } = await getServerData();

  return (
    <TranslationClientComponent value={translations}>
      <ClientLayout cart={cart} favourites={favs}>
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

              <div className="max-sm:h-3"></div>

              <div>
                <h1 className="font-bold text-2xl leading-[1.1] max-w-screen-md">
                  <span className="text-red-500">{product.item} </span>
                  <span>{product.brand + " " + product.model}</span>
                </h1>
                <p className="mb-1 mt-0.5 text-sm max-w-screen-md">
                  <span className="font-medium">{t("page.title")}:</span>
                  <span className="text-neutral-600">
                    {" "}
                    {product.description}
                  </span>
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
              <div className="mx-auto w-fit flex [@media(max-width:383px)]:flex-col gap-y-3 items-start md:items-center gap-x-8 md:gap-x-4 lg:gap-x-8">
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
      </ClientLayout>
    </TranslationClientComponent>
  );
}

function BuySection({
  product,
  t,
  r,
}: { product: EcodatArticle } & TranslationFactories) {
  const hasPrice = product.price > 0;
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
      <p
        className={twJoin(
          "font-semibold",
          hasPrice ? "text-4xl sm:text-3xl md:text-4xl" : "text-2xl py-1 leading-[1]"
        )}>
        {hasPrice
          ? String(product.price.toFixed(2)) + "€"
          : "Richiedi un preventivo"}
      </p>
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
            className="w-7 sm:w-5 md:w-7"
            src={iconFavorite}
            alt="favorite icon"
          />
          <span className=" text-xs leading-[1.1]">
            {t("page.buy-section.favourites")}
          </span>
        </div>
      </div>

      <div className="h-[10px]"></div>

      {hasPrice ? <CartButton product={product} /> : <></>}

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

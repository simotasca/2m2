import ProductImage from "@/components/product/ProductImage";
import Breadcrumbs from "@/components/search/Breadcrumbs";
import Button from "@/components/ui/Button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import iconAvailable from "@/images/icons/available.svg";
import iconFavorite from "@/images/icons/favorite.svg";
import iconShare from "@/images/icons/share.svg";
import iconCart from "@/images/icons/white/cart.svg";
import PageLayout from "@/layouts/PageLayout";
import ServerLayout from "@/layouts/base/ServerLayout";
import {
  fetchEcodatArticle,
  fetchEcodatArticlePhotoList,
  fetchEcodatCategories,
  fetchEcodatItems,
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { EcodatArticle } from "@/lib/shared/ecodat";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import SimilarProducts from "./SimilarProducts";
import routes from "@/lib/shared/routes";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params: { slug } }: Props) {
  const id = slug.split("-").at(-1);
  if (!id) return notFound();

  const product = await fetchEcodatArticle(id).catch(() => null);
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
    .then((items) => items.map((c) => c.name))
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
        ?.filter((i) => i !== product.item)
        .map((i) => ({
          text: i,
          href: routes.item(product.category, product.type, i),
        })),
    },
  ];

  return (
    <ServerLayout translations={{}}>
      <PageLayout headerSmall>
        <div className="bg-white min-h-full">
          <MaxWidthContainer className="max-w-6xl">
            <div className="py-4">
              <Breadcrumbs items={bread} />
            </div>

            <div className="grid grid-cols-[13fr_10fr_7fr] gap-4">
              <PhotoSection product={product} />
              <ProductDetails product={product} />
              <BuySection product={product} />
            </div>

            <div className="text-center max-w-xl mx-auto py-8">
              <h3 className="font-semibold leading-tight text-xl">
                Tutto il nostro usato è selezionato, testato e garantito
              </h3>
              <div className="grid"></div>
            </div>

            <PageContent product={product} />
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
      <ProductImage big photo={{ imageId: photoIdsList[0] }} />
      <div className="flex gap-1 pt-1">
        {photoIdsList.slice(1).map((imageId) => (
          <div className="p-0.5 border border-slate-300 rounded">
            <ProductImage className="w-20" photo={{ imageId }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BuySection({ product }: { product: EcodatArticle }) {
  return (
    <aside className="font-sans">
      <div className="flex gap-1 items-center -mb-1">
        <span className="text-[#5F5C5C] text-sm mb-[2px]">Disponibile</span>
        <Image className="w-4" src={iconAvailable} alt="available icon" />
      </div>
      <span className="font-semibold text-4xl">
        {product.price.toFixed(2)}€
      </span>

      <p className="text-[#5F5C5C] text-sm">Tutti i prezzi includono l'IVA</p>
      <p className="font-bold text-lg uppercase -mt-[6px]">
        <span>SPEDIZIONE IN </span>
        <span className="text-[#F03B3B]">
          24<span className="text-sm">/</span>48 ORE
        </span>
      </p>

      <div className="h-3"></div>

      <div className="grid grid-cols-2 leading-3">
        <div className="flex items-center gap-2 max-w-[80%]">
          <Image className="w-9" src={iconFavorite} alt="favorite icon"></Image>
          <span className=" text-xs leading-[1.1]">Aggiungi ai preferiti</span>
        </div>
        <div className="flex items-center gap-2 max-w-[80%]">
          <Image className="w-6" src={iconShare} alt="share icon"></Image>
          <span className="text-xs leading-[1.1]">Condividi</span>
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
          <span>AGGIUNGI</span>
        </div>
      </Button>
      {/* <p className="text-[#2e2d2d] underline text-xs">
        puoi pagarlo alla consegna*
      </p> */}
    </aside>
  );
}

function PageContent({ product }: { product: EcodatArticle }) {
  return (
    <div>
      <SimilarProducts product={product} />
    </div>
  );
}

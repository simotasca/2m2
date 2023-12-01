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
  fetchEcodatTypologies,
} from "@/lib/server/ecodat";
import { EcodatArticle } from "@/lib/shared/ecodat";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params: { slug } }: Props) {
  const id = slug.split("-").at(-1);
  if (!id) return notFound();

  const product = await fetchEcodatArticle(id).catch(() => null);
  if (!product) return notFound();

  const categories = await fetchEcodatCategories()
    .then((cats) => cats.map((c) => c.name))
    .catch((err) => {
      console.error("Error fetching categories:", err.message);
      return undefined;
    });

  const types = await fetchEcodatTypologies(product.categoryId)
    .then((cats) => (cats.length <= 1 ? undefined : cats.map((c) => c.name)))
    .catch((err) => {
      console.error("Error fetching categories:", err.message);
      return undefined;
    });

  const bread = {
    category: product.category,
    categories,
    type: product.type,
    types,
    item: product.item,
  };

  return (
    <ServerLayout translations={{}}>
      <PageLayout headerSmall>
        <div className="bg-white min-h-full">
          <MaxWidthContainer className="max-w-6xl">
            <Breadcrumbs {...bread} />

            <div className="grid grid-cols-[13fr_10fr_7fr] gap-4">
              <PhotoSection product={product} />
              <MainSection product={product} />
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
    console.error(e);
    return [];
  });

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

function MainSection({ product }: { product: EcodatArticle }) {
  return (
    <main>
      <h1 className="font-bold text-xl leading-[1.1]">{product.description}</h1>
      <p className="text-sm mb-1 mt-0.5">
        <span className="font-semibold">Codice OEM:</span>
        <span> {product.oeCode}</span>
      </p>
      <div className="grid grid-cols-[auto_1fr] text-sm">
        <PropertyRow name="marca" value={product.brand} />
        <PropertyRow name="modello" value={product.model} />
        <PropertyRow name="tipo motore" value={product.engine} />
        <PropertyRow
          name="anno"
          value={product.yearFrom + " - " + product.yearTo}
        />
        <PropertyRow name="versione" value={product.version} />
        <div className="p-1 col-span-full text-red-700">
          <span className="underline">more</span> +
        </div>
      </div>
    </main>
  );
}

function PropertyRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="contents child:even:bg-neutral-200 child:px-1 child:py-1">
      <span>{name}:</span>
      <span className="text-right font-medium">{value}</span>
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
      <span className="font-semibold text-4xl">280,00€</span>

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
      <p className="text-[#2e2d2d] underline text-xs">
        puoi pagarlo alla consegna*
      </p>
    </aside>
  );
}

function PageContent({ product }: { product: EcodatArticle }) {
  return (
    <div className="p-4">
      <pre>{JSON.stringify(product, undefined, 2)}</pre>
    </div>
  );
}

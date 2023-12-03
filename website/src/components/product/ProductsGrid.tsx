import { CartProduct } from "@/lib/shared/cart";
import Product from "./Product";
import { twMerge } from "tailwind-merge";

interface Props {
  products: CartProduct[];
  hidePartialRows?: boolean;
  className?: string;
}

export default function ProductsGrid({
  products,
  className,
  hidePartialRows = false,
}: Props) {
  const mediaClass = [
    "xl:grid-cols-5",
    "lg:grid-cols-4",
    "sm:grid-cols-3",
    "max-sm:xs:grid-cols-2",
  ];

  const hidePartialRowsClass = hidePartialRows
    ? [
        /* xl */
        "xl:[&>*:nth-last-child(1):not(:nth-child(5n))]:hidden",
        "xl:[&>*:nth-last-child(2):not(:nth-child(5n)):not(:nth-child(5n-1))]:hidden",
        "xl:[&>*:nth-last-child(3):not(:nth-child(5n)):not(:nth-child(5n-1)):not(:nth-child(5n-2))]:hidden",
        "xl:[&>*:nth-last-child(4):not(:nth-child(5n)):not(:nth-child(5n-1)):not(:nth-child(5n-2)):not(:nth-child(5n-3))]:hidden",
        /* lg */
        "max-xl:lg:[&>*:nth-last-child(1):not(:nth-child(4n))]:hidden",
        "max-xl:lg:[&>*:nth-last-child(2):not(:nth-child(4n)):not(:nth-child(4n-1))]:hidden",
        "max-xl:lg:[&>*:nth-last-child(3):not(:nth-child(4n)):not(:nth-child(4n-1)):not(:nth-child(4n-2))]:hidden",
        /* sm */
        "max-lg:sm:[&>*:nth-last-child(1):not(:nth-child(3n))]:hidden",
        "max-lg:sm:[&>*:nth-last-child(2):not(:nth-child(3n)):not(:nth-child(3n-1))]:hidden",
        /* xs */
        "max-sm:xs:[&>*:nth-last-child(1):not(:nth-child(2n))]:hidden",
      ]
    : [];

  if (products.length === 0)
    return (
      <div className={twMerge("text-sm text-neutral-500", className)}>
        Nessun prodotto trovato . . .
      </div>
    );

  return (
    <div
      className={twMerge(
        "grid gap-4 lg:gap-y-8",
        ...mediaClass,
        ...hidePartialRowsClass,
        className
      )}>
      {products.map((p) => (
        <Product key={p.id} product={p} />
      ))}
    </div>
  );
}

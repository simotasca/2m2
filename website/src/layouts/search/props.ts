import { EcodatArticle } from "@/lib/shared/ecodat";
import { PropsWithChildren } from "react";

export type SearchLayoutProps = PropsWithChildren<{
  title: [string, string];
  products: EcodatArticle[];
}>;

import { EcodatArticle } from "@/lib/shared/ecodat";
import { PropsWithChildren, ReactNode } from "react";

export type SearchLayoutProps = PropsWithChildren<{
  products: EcodatArticle[];
  headerExtension: ReactNode;
}>;

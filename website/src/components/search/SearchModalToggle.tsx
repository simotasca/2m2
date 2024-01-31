"use client";

import useSearchModal from "@/context/search/useSearchModal";
import { ElementType, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  as: ElementType;
  [key: string]: any;
}>;

export default function ({
  children,
  className = "",
  as: Component = "div",
  ...props
}: Props) {
  const { open: openSearchModal } = useSearchModal();

  return (
    <Component
      className={className}
      onClick={() => openSearchModal()}
      {...props}
    >
      {children}
    </Component>
  );
}

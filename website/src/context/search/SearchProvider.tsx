"use client";

import { PropsWithChildren, useState } from "react";
import { SearchContext } from ".";

export default function SearchProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SearchContext.Provider value={{ isOpen, setIsOpen, toggle, open, close }}>
      {children}
    </SearchContext.Provider>
  );
}

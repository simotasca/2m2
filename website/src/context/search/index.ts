import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

interface FiltersContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const SearchContext = createContext<FiltersContext>({
  isOpen: false,
  setIsOpen: () => {},
  toggle: () => {},
  open: () => {},
  close: () => {},
});

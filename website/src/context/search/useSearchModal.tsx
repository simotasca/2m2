import { useContext } from "react";
import { SearchContext } from ".";

export default function useSearchModal() {
  return useContext(SearchContext);
}

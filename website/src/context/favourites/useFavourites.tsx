import { useContext } from "react";
import { FavouritesContext } from "./FavouritesContext";

export default function useFavourites() {
  return useContext(FavouritesContext);
}

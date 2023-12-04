import {
  EcodatBrand,
  EcodatCategory,
  EcodatModel,
  EcodatTypology,
} from "../shared/ecodat";

export interface Filters {
  categories?: (EcodatCategory & {
    typologies?: EcodatTypology[] | undefined;
  })[];
  brands?: (EcodatBrand & {
    models?: EcodatModel[] | undefined;
  })[];
}

let cache: Filters | undefined = undefined;

export async function getFilters(): Promise<Filters | undefined> {
  if (cache) return cache;
  return await fetch("/api/ecodat/filters")
    .then((res) => res.json())
    .then((data) => {
      cache = data;
      return data;
    })
    .catch((e) => {
      console.error("Error fetching search filters:", e.message);
      return undefined;
    });
}

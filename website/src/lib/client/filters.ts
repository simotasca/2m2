import {
  EcodatBrand,
  EcodatCategory,
  EcodatModel,
  EcodatTypology,
} from "../shared/ecodat";

export interface EcodatData {
  categories?: (EcodatCategory & {
    typologies?: EcodatTypology[] | undefined;
  })[];
  brands?: (EcodatBrand & {
    models?: EcodatModel[] | undefined;
  })[];
}

let data: Promise<EcodatData | undefined>;
let fetched = false;

export function getEcodatData(): Promise<EcodatData | undefined> {
  if (!fetched) {
    fetched = true;
    data = fetch("/api/ecodat/filters")
      .then((res) => res.json())
      .catch((e) => {
        console.error("ERROR: fetching search filters:", e.message);
        return undefined;
      });
  }
  return data;
}

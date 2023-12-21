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

async function getEcodatData(): Promise<EcodatData | undefined> {
  return await fetch("/api/ecodat/filters")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.error("ERROR: fetching search filters:", e.message);
      return undefined;
    });
}

export const ecodatData = getEcodatData();

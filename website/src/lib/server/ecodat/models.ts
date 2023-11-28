import { EcodatModel } from "@/lib/shared/ecodat";
import { EcodatAction, fetchEcodat } from ".";
import { XMLParser } from "./utils";

export async function fetchEcodatModels(
  brandId: number
): Promise<EcodatModel[]> {
  const xml = `<IDMarca>${brandId}</IDMarca>`;
  return fetchEcodat(EcodatAction.MODELS, xml).then((res) => {
    if (!res) return [];
    const models = res.querySelectorAll("arrmodelli > wmagazzino_modello");
    return Array.from(models).map(parseModel);
  });
}

function parseModel(t: Element): EcodatModel {
  return {
    id: Number(XMLParser.getVal(t, "IDModello")),
    name: XMLParser.getVal(t, "Modello")!,
  };
}

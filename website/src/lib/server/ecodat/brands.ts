import { EcodatBrand } from "@/lib/shared/ecodat";
import { EcodatAction, fetchEcodat } from ".";
import { XMLParser } from "./utils";

export async function fetchEcodatBrands(): Promise<EcodatBrand[]> {
  return fetchEcodat(EcodatAction.BRANDS).then((res) => {
    if (!res) return [];
    const brands = res.querySelectorAll("ArrMarche > WMAGAZZINO_Marca");
    return Array.from(brands)?.map(parseBrand);
  });
}

function parseBrand(b: Element): EcodatBrand {
  return {
    id: parseInt(XMLParser.getVal(b, "IDMarca")!),
    name: XMLParser.getVal(b, "Marca")!,
  };
}

// Example response

// <ArrMarche>
// <WMAGAZZINO_Marca>
// <IDMarca>5</IDMarca>
// <Marca>CHRYSLER</Marca>
// </WMAGAZZINO_Marca>
// <WMAGAZZINO_Marca>
// <IDMarca>11</IDMarca>
// <Marca>FIAT</Marca>
// </WMAGAZZINO_Marca>
// </ArrMarche>

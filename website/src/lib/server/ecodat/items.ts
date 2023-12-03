import { EcodatItem } from "@/lib/shared/ecodat";
import { EcodatAction, fetchEcodat } from ".";
import { XMLParser } from "./utils";

export async function fetchEcodatItems(
  categoryId: string | number,
  typologyId: string | number
): Promise<EcodatItem[]> {
  const xml = `<IDTipologia>${typologyId}</IDTipologia><IDCategoria>${categoryId}</IDCategoria>`;
  return fetchEcodat(EcodatAction.ITEMS, xml).then((res) => {
    if (!res) return [];
    const items = res.querySelectorAll(
      "ArrArticoliAttivi > WMAGAZZINO_ArticoloAttivo"
    );
    return Array.from(items)?.map(parseItem);
  });
}

function parseItem(b: Element): EcodatItem {
  return {
    id: XMLParser.getNumber(b, "IDItem"),
    name: XMLParser.getVal(b, "Descrizione")!,
    position: XMLParser.getVal(b, "Ap"),
    side: XMLParser.getVal(b, "Sd"),
  };
}

/**
<IDItem>9628</IDItem>
<Descrizione>GUARNIZIONE RASCHIAVETRO PORTA EST. (PARTE ANT.)</Descrizione>
<Ap>ANT.</Ap>
<Sd>DX.</Sd>
 */

import { EcodatTypology } from "@/lib/shared/ecodat";
import { EcodatAction, fetchEcodat } from ".";
import { XMLParser } from "./utils";

export async function fetchEcodatTypologies(
  categoryId: number
): Promise<EcodatTypology[]> {
  const xml = `<IDCategoria>${categoryId}</IDCategoria>`;
  return fetchEcodat(EcodatAction.TYPOLOGIES, xml).then((res) => {
    if (!res) return [];
    const typologies = res.querySelectorAll(
      "ArrTipologie > WMAGAZZINO_Tipologie"
    );
    return Array.from(typologies).map(parseTypology);
  });
}

function parseTypology(t: Element): EcodatTypology {
  return {
    id: Number(XMLParser.getVal(t, "IDTipologia")),
    name: XMLParser.getVal(t, "Descrizione")!,
  };
}

// Example request

// <?xml version="1.0" encoding="utf-8"?>
// <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-
//   instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soa
//   p/envelope/">
//   <soap:Body>
//     <M_GetTipologie xmlns="http://ws.ecodat.it/">
//       <Token>Insert Here Your Token</Token>
//       <IDCategoria>20</IDCategoria>
//     </M_GetTipologie>
//   </soap:Body>
// </soap:Envelope>

// Example response:

// <ArrTipologie>
//   <WMAGAZZINO_Tipologie>
//     <IDTipologia>83</IDTipologia>
//     <Descrizione>CRISTALLI FIANCATE</Descrizione>
//   </WMAGAZZINO_Tipologie>
// </ArrTipologie>

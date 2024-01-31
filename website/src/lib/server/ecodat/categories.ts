import { EcodatCategory, knownCategories } from "@/lib/shared/ecodat";
import { EcodatAction, fetchEcodat } from ".";
import { XMLParser } from "./utils";

export async function fetchEcodatCategories(): Promise<EcodatCategory[]> {
  return fetchEcodat(EcodatAction.CATEGORIES).then((res) => {
    if (!res) return [];
    const categories = res.querySelectorAll(
      "ArrCategorie > WMAGAZZINO_Categorie"
    );
    const categorie = Array.from(categories).map(parseCategory);
    return categorie.filter((c) => c.name in knownCategories);
  });
}

function parseCategory(c: Element): EcodatCategory {
  return {
    id: Number(XMLParser.getVal(c, "IDCategoria")),
    name: XMLParser.getVal(c, "Descrizione")!,
  };
}

// Example request:

// <?xml version="1.0" encoding="utf-8"?>
// <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-
// instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.
// org/soap/envelope/">
// <soap:Body>
// <M_GetCategorie xmlns="http://ws.ecodat.it/">
// <Token>Insert Here Your Token</Token>
// </M_GetCategorie>
// </soap:Body>
// </soap:Envelope>

// Example response:

// <ArrCategorie>
//   <WMAGAZZINO_Categorie>
//     <IDCategoria>20</IDCategoria>
//     <Descrizione>CRISTALLI</Descrizione>
//   </WMAGAZZINO_Categorie>
//   <WMAGAZZINO_Categorie>
//     <IDCategoria>24</IDCategoria>
//     <Descrizione>LAMIERATI ESTERNI</Descrizione>
//   </WMAGAZZINO_Categorie>
// </ArrCategorie>

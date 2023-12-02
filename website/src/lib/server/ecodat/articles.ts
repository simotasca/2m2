import { EcodatArticle } from "@/lib/shared/ecodat";
import { EcodatAction, fetchEcodat } from ".";
import { XMLParser } from "./utils";

export interface APIArticles {
  fetchRow?: {
    nRows: number;
    lastRow: number;
  };
  /** filtra per la descrizione completa dell’articolo attraverso l’operatore LIKE */
  description?: string;
  /** se > 0 filtra per IDMarca */
  brandId?: number;
  /** se > 0 filtra per IDModello */
  modelId?: number;
  /** se > 0 filtra per IDCategoria */
  categoryId?: number;
  /** se > 0 filtra per IDTipologi */
  typeId?: number;
  /** se numerico filtra per il campo “DaAnno” con operatore “=” */
  fromYear?: number;
  /** se numerico filtra per il campo “AAnno” con operatore “=” */
  toYear?: number;
}

export async function fetchEcodatArticles(
  props: APIArticles
): Promise<EcodatArticle[]> {
  const xml = `
    <FlgFetchRiga>${!!props.fetchRow}</FlgFetchRiga>
    <NRows>${props.fetchRow?.nRows || "0"}</NRows>
    <NLastRow>${props.fetchRow?.lastRow || "0"}</NLastRow>
    <DescrizioneCompleta>${props.description || ""}</DescrizioneCompleta>
    <IDMarca>${props.brandId || "0"}</IDMarca>
    <IDModello>${props.modelId || "0"}</IDModello>
    <IDCategoria>${props.categoryId || "0"}</IDCategoria>
    <IDTipologia>${props.typeId || "0"}</IDTipologia>
    <DaAnno>${props.fromYear || ""}</DaAnno>
    <AAnno>${props.toYear || ""}</AAnno>
    <FlgNuovo></FlgNuovo>
    <StrNote></StrNote>
    <StrLoc1></StrLoc1>
    <StrLoc2></StrLoc2>
    <StrLoc3></StrLoc3>
    <StrLoc4></StrLoc4>
    <StrDisponibile></StrDisponibile>
    <StrCodOE></StrCodOE>
    <IDItem>0</IDItem>
    <NumeroPS></NumeroPS>
    <AnnoPs></AnnoPs>
    <StrNomeModello></StrNomeModello>
    <StrVersione></StrVersione>
    <IDVersione>0</IDVersione>
    <StrErrore></StrErrore>
  `;

  return fetchEcodat(EcodatAction.ARTICLES, xml).then((res) => {
    if (!res) return [];

    const articles = Array.from(
      res.querySelectorAll("arrdatimag > wmagazzino_dati_articolo")
    );

    return articles.map(parseArticle);
  });
}

export async function fetchEcodatArticle(
  id: number | string
): Promise<EcodatArticle | null> {
  const xml = `<IDArticolo>${id}</IDArticolo>`;
  return fetchEcodat(EcodatAction.ARTICLE, xml).then((res) => {
    const article = res?.querySelector("datimag");
    return article ? parseArticle(article) : null;
  });
}

function parseArticle(a: Element): EcodatArticle {
  return {
    id: parseInt(XMLParser.getVal(a, "IDArticolo")!),
    price: XMLParser.getNumber(a, "Prezzo")!,
    notes: XMLParser.getVal(a, "Note")!,
    category: XMLParser.getVal(a, "Categoria")!,
    categoryId: XMLParser.getNumber(a, "IDCategoria")!,
    type: XMLParser.getVal(a, "Tipologia")!,
    typeId: XMLParser.getNumber(a, "IDTipologia")!,
    item: XMLParser.getVal(a, "NomeItem")!,
    itemId: XMLParser.getNumber(a, "IDItem")!,
    brand: XMLParser.getVal(a, "Marca")!,
    brandId: XMLParser.getNumber(a, "IDMarca")!,
    model: XMLParser.getVal(a, "Modello")!,
    modelId: XMLParser.getNumber(a, "IDModello")!,
    version: XMLParser.getVal(a, "Versione")!,
    new: Boolean(XMLParser.getVal(a, "FlgNuovo")),
    available: Boolean(XMLParser.getVal(a, "FlgDisponibile")),
    description: XMLParser.getVal(a, "Descrizione")!,
    altDescription: XMLParser.getVal(a, "DescrizioneAlternativa")!,
    oeCode: XMLParser.getVal(a, "CodOE")!,
    engine: XMLParser.getVal(a, "TipoMotore")!,
    displacement: XMLParser.getVal(a, "Cilindrata"),
    power: XMLParser.getVal(a, "Alimentazione"),
    Km: XMLParser.getNumber(a, "Km"),
    nDoors: XMLParser.getNumber(a, "NPorte"),
    yearFrom: XMLParser.getNumber(a, "DaAnno")!,
    yearTo: XMLParser.getNumber(a, "AAnno")!,
    psYear: XMLParser.getVal(a, "AnnoPS")!,
  };
}

/**
 * <?xml version="1.0" encoding="utf-8"?>

<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-
instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.

org/soap/envelope/">
<soap:Body>
<M_GetArticolo xmlns="http://ws.ecodat.it/">
<Token>Insert Here Your Token</Token>
<IDArticolo>1</IDArticolo>
</M_GetArticolo>
</soap:Body>
</soap:Envelope>
 */
